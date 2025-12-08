// src/components/Learn/EventLoopDemo.tsx
import { useEffect, useRef, useState, type JSX } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'

/**
 * EventLoopDemo
 * - Demonstrates macrotasks vs microtasks ordering.
 * - Allows adding simulated macrotask (setTimeout), microtask (Promise.then), and "render tick" (raf-like).
 * - Shows queues + call stack and timeline.
 */

type QueueItem = {
  id: number
  label: string
  type: 'micro' | 'macro' | 'raf'
  delay?: number
  createdAt: number
}

export default function EventLoopDemo(): JSX.Element {
  const idRef = useRef(1)
  const [macroDelay, setMacroDelay] = useState<number>(50) // ms for setTimeout simulation (visual only)
  const [callStack, setCallStack] = useState<string[]>([])
  const [microQueue, setMicroQueue] = useState<QueueItem[]>([])
  const [macroQueue, setMacroQueue] = useState<QueueItem[]>([])
  const [logs, setLogs] = useState<string[]>([])
  const runningRef = useRef(true)

  // helper to push logs
  const pushLog = (s: string) => setLogs(l => [new Date().toLocaleTimeString() + ' · ' + s, ...l].slice(0, 200))

  // add an item to simulate
  const addItem = (type: QueueItem['type']) => {
    const id = idRef.current++
    const label = `${type.toUpperCase()} #${id}`
    const item: QueueItem = { id, label, type, delay: type === 'macro' ? macroDelay : 0, createdAt: Date.now() }

    if (type === 'micro') {
      setMicroQueue(prev => [...prev, item])
      pushLog(`Scheduled microtask ${label}`)
    } else if (type === 'macro') {
      setMacroQueue(prev => [...prev, item])
      pushLog(`Scheduled macrotask ${label} (delay ${item.delay}ms)`)
    } else if (type === 'raf') {
      // treat raf as a short-timed macrotask in this simplified model
      setMacroQueue(prev => [...prev, item])
      pushLog(`Scheduled RAF ${label}`)
    }
  }

  // clear everything
  const resetAll = () => {
    idRef.current = 1
    setCallStack([])
    setMicroQueue([])
    setMacroQueue([])
    setLogs([])
    pushLog('Reset demo')
  }

  // Simulate event loop ticks - simplified model:
  // 1) process one macrotask (if its delay elapsed)
  // 2) then drain microtask queue completely
  // 3) schedule next tick
  useEffect(() => {
    runningRef.current = true
    let mounted = true

    const tick = async () => {
      if (!mounted) return
      const now = Date.now()

      // find first macro whose delay has elapsed (FIFO)
      const nextMacroIndex = macroQueue.findIndex(m => (m.delay ?? 0) <= (now - m.createdAt))

      if (nextMacroIndex >= 0) {
        // execute that macrotask
        const macro = macroQueue[nextMacroIndex]
        // remove executed from queue
        setMacroQueue(prev => prev.filter((_, i) => i !== nextMacroIndex))

        setCallStack(cs => [macro.label, ...cs])
        pushLog(`Begin macrotask ${macro.label}`)
        // simulate execution time
        await new Promise(res => setTimeout(res, 60))
        pushLog(`End macrotask ${macro.label}`)
        setCallStack(cs => cs.slice(1))
      }

      // now drain microtasks fully (FIFO)
      if (microQueue.length > 0) {
        pushLog(`Draining ${microQueue.length} microtask(s)`)
        // drain snapshot to avoid racing with state updates
        const toProcess = [...microQueue]
        setMicroQueue([]) // clear queue immediately (visual)
        for (const next of toProcess) {
          if (!mounted) break
          setCallStack(cs => [next.label, ...cs])
          pushLog(`Begin microtask ${next.label}`)
          // simulate very short execution
          await new Promise(res => setTimeout(res, 12))
          pushLog(`End microtask ${next.label}`)
          setCallStack(cs => cs.slice(1))
        }
      }

      // schedule next tick
      if (mounted) {
        setTimeout(() => {
          if (runningRef.current) tick()
        }, 40)
      }
    }

    const starter = setTimeout(() => { if (runningRef.current) tick() }, 80)

    return () => {
      mounted = false
      runningRef.current = false
      clearTimeout(starter)
    }
    // intentionally depend on queue lengths so effect re-evaluates when items change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [macroQueue.length, microQueue.length])

  // small UI helpers
  const enqueueMacroProgrammatically = () => addItem('macro')
  const enqueueMicroProgrammatically = () => addItem('micro')
  const enqueueRaf = () => addItem('raf')

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Event loop — macrotasks vs microtasks (interactive)</Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          <Button variant="contained" onClick={enqueueMacroProgrammatically}>Add macrotask (setTimeout)</Button>
          <Button variant="contained" onClick={enqueueMicroProgrammatically}>Add microtask (Promise.then)</Button>
          <Button variant="contained" onClick={enqueueRaf}>Add RAF-like task</Button>

          <Box sx={{ width: 220, mx: 1 }}>
            <Typography variant="caption">Macrotask ready delay: {macroDelay} ms</Typography>
            <Slider value={macroDelay} onChange={(_, v) => setMacroDelay(Array.isArray(v) ? v[0] : v)} min={0} max={1000} />
          </Box>

          <Button color="inherit" onClick={resetAll}>Reset</Button>
        </Stack>
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 2 }}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Queues & Call Stack (live)</Typography>

          <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
            <Chip label={`Microqueue: ${microQueue.length}`} size="small" />
            <Chip label={`Macroqueue: ${macroQueue.length}`} size="small" />
            <Chip label={`Call stack depth: ${callStack.length}`} size="small" />
          </Box>

          <Divider sx={{ mb: 1 }} />

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <Box sx={{ minWidth: 160 }}>
              <Typography variant="subtitle2">Call stack</Typography>
              <Paper variant="outlined" sx={{ p: 1, minHeight: 120 }}>
                {callStack.length === 0 ? <Typography color="text.secondary">idle</Typography> :
                  callStack.map((c, i) => <Typography key={i}>{c}</Typography>)}
              </Paper>
            </Box>

            <Box sx={{ minWidth: 220 }}>
              <Typography variant="subtitle2">Microtask queue (FIFO)</Typography>
              <Paper variant="outlined" sx={{ p: 1, minHeight: 120 }}>
                {microQueue.length === 0 ? <Typography color="text.secondary">empty</Typography> :
                  microQueue.map(m => <Typography key={m.id}>{m.label}</Typography>)}
              </Paper>
            </Box>

            <Box sx={{ minWidth: 220 }}>
              <Typography variant="subtitle2">Macrotask queue (FIFO)</Typography>
              <Paper variant="outlined" sx={{ p: 1, minHeight: 120 }}>
                {macroQueue.length === 0 ? <Typography color="text.secondary">empty</Typography> :
                  macroQueue.map(m => <Typography key={m.id}>{m.label} (delay {m.delay}ms)</Typography>)}
              </Paper>
            </Box>
          </Box>
        </Paper>

        {/* Right column: timeline/log and controls */}
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Timeline / Log</Typography>

          <Box sx={{ maxHeight: 420, overflow: 'auto', p: 1, bgcolor: 'background.paper' }}>
            {logs.length === 0 ? <Typography color="text.secondary">No activity yet — add tasks.</Typography> :
              logs.map((l, i) => <Typography key={i} sx={{ fontSize: 13 }}>{l}</Typography>)}
          </Box>

          <Divider sx={{ my: 1 }} />

          <Typography variant="subtitle2">Quick examples</Typography>
          <Stack spacing={1} sx={{ mt: 1 }}>
            <Button
              size="small"
              onClick={() => {
                addItem('macro')
                addItem('micro')
                pushLog('Example: scheduled macro then micro; micro will drain before next tick')
              }}
            >
              Example: macro then micro
            </Button>

            <Button
              size="small"
              onClick={() => {
                addItem('micro')
                addItem('macro')
                pushLog('Example: scheduled micro then macro')
              }}
            >
              Example: micro then macro
            </Button>

            <Button
              size="small"
              onClick={() => {
                addItem('micro'); addItem('micro'); addItem('micro')
                pushLog('Example: 3 microtasks scheduled')
              }}
            >
              Example: 3 microtasks
            </Button>
          </Stack>
        </Paper>
      </Box>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary">
          How to explain: The browser (or Node) runs one macrotask from the macrotask queue (e.g. a timer callback),
          then it drains the microtask queue completely before rendering and moving to the next macrotask. Microtasks are often created via Promise handlers.
        </Typography>
      </Paper>
    </Stack>
  )
}
