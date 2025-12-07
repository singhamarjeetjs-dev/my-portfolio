// src/components/Learn/AsyncDemo.tsx
import { useState, type JSX } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Slider from '@mui/material/Slider'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'

type Result = {
  id: number
  status: 'pending' | 'fulfilled' | 'rejected'
  value?: string
  error?: string
  time: number
}

export default function AsyncDemo(): JSX.Element {
  const [count, setCount] = useState<number>(3)
  const [minDelay, setMinDelay] = useState<number>(300)
  const [maxDelay, setMaxDelay] = useState<number>(1200)
  const [failProbability, setFailProbability] = useState<number>(0)
  const [results, setResults] = useState<Result[]>([])
  const [log, setLog] = useState<string[]>([])
  const [running, setRunning] = useState(false)

  const randDelay = () => Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay

  const simulatedRequest = (id: number) =>
    new Promise<string>((resolve, reject) => {
      const delay = randDelay()
      const willFail = Math.random() * 100 < failProbability
      setTimeout(() => {
        if (willFail) {
          reject(new Error(`Request ${id} failed after ${delay}ms`))
        } else {
          resolve(`Result ${id} (after ${delay}ms)`)
        }
      }, delay)
    })

  const reset = () => {
    setResults([])
    setLog([])
  }

  const stamp = () => new Date().toLocaleTimeString()

  const runAll = async () => {
    reset()
    setRunning(true)
    setLog(prev => [...prev, `${stamp()} - Starting Promise.all with ${count} requests`])
    const promises = Array.from({ length: count }, (_, i) =>
      simulatedRequest(i + 1).then(
        (v) => ({ id: i + 1, ok: true, value: v, error: undefined }),
        (err: Error) => ({ id: i + 1, ok: false, error: err.message, value: undefined })
      )
    )
    try {
      const resolved = await Promise.all(promises)
      const now = Date.now()
      setResults(resolved.map(r => ({
        id: r.id,
        status: r.ok ? 'fulfilled' : 'rejected',
        value: r.ok ? r.value : undefined,
        error: r.ok ? undefined : r.error,
        time: now
      })))
      setLog(prev => [...prev, `${stamp()} - Promise.all completed (wrapped) — results recorded`])
    } catch (err) {
      setLog(prev => [...prev, `${stamp()} - Promise.all failed: ${(err as Error).message}`])
    } finally {
      setRunning(false)
    }
  }

  const runRace = async () => {
    reset()
    setRunning(true)
    setLog(prev => [...prev, `${stamp()} - Starting Promise.race with ${count} requests`])

    const raw = Array.from({ length: count }, (_, i) => simulatedRequest(i + 1))
    try {
      const winner = await Promise.race(raw)
      setResults([{ id: 0, status: 'fulfilled', value: String(winner), time: Date.now() }])
      setLog(prev => [...prev, `${stamp()} - Promise.race resolved first value: ${String(winner)}`])
    } catch (err) {
      setResults([{ id: 0, status: 'rejected', error: (err as Error).message, time: Date.now() }])
      setLog(prev => [...prev, `${stamp()} - Promise.race rejected first: ${(err as Error).message}`])
    } finally {
      setRunning(false)
    }
  }

  const runSequential = async () => {
    reset()
    setRunning(true)
    setLog(prev => [...prev, `${stamp()} - Starting sequential async/await (${count} requests)`])
    const out: Result[] = []
    for (let i = 0; i < count; i++) {
      const id = i + 1
      try {
        const v = await simulatedRequest(id)
        out.push({ id, status: 'fulfilled', value: v, time: Date.now() })
        setLog(prev => [...prev, `${stamp()} - Request ${id} fulfilled`])
      } catch (err) {
        out.push({ id, status: 'rejected', error: (err as Error).message, time: Date.now() })
        setLog(prev => [...prev, `${stamp()} - Request ${id} failed: ${(err as Error).message}`])
      }
      setResults([...out])
    }
    setRunning(false)
    setLog(prev => [...prev, `${stamp()} - Sequential run finished`])
  }

  return (
    <Stack spacing={2}>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
          <TextField
            label="Requests"
            type="number"
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(10, Number(e.target.value))))}
            size="small"
            sx={{ width: 120 }}
            inputProps={{ min: 1, max: 10 }}
          />

          <TextField
            label="Min delay (ms)"
            type="number"
            value={minDelay}
            onChange={(e) => setMinDelay(Number(e.target.value))}
            size="small"
            sx={{ width: 160 }}
          />

          <TextField
            label="Max delay (ms)"
            type="number"
            value={maxDelay}
            onChange={(e) => setMaxDelay(Number(e.target.value))}
            size="small"
            sx={{ width: 160 }}
          />

          <Box sx={{ width: { xs: '100%', md: 220 } }}>
            <Typography variant="caption" color="text.secondary">Fail probability</Typography>
            <Slider
              value={failProbability}
              onChange={(_, v) => setFailProbability(Array.isArray(v) ? v[0] : v)}
              valueLabelDisplay="auto"
              min={0}
              max={100}
            />
          </Box>

          <Box sx={{ flex: 1 }} />

          <Stack direction="row" spacing={1}>
            <Button variant="contained" color="primary" onClick={runAll} disabled={running}>Promise.all (wrapped)</Button>
            <Button variant="outlined" onClick={runRace} disabled={running}>Promise.race</Button>
            <Button onClick={runSequential} disabled={running}>Sequential</Button>
          </Stack>
        </Stack>

        {running && <LinearProgress sx={{ mt: 2 }} />}
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle1" fontWeight={700}>Explanation</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          <strong>Promise.all</strong> runs promises in parallel and resolves when all fulfill — if one rejects, the raw Promise.all rejects.
          In this demo we wrap promises to capture per-request success/failure and show all outcomes.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          <strong>Promise.race</strong> resolves or rejects as soon as the first promise settles (fulfill or reject).
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          <strong>Sequential async/await</strong> waits for each request before starting the next — useful when order matters.
        </Typography>
      </Paper>

      <Stack spacing={1}>
        <Typography variant="subtitle1" fontWeight={700}>Results</Typography>
        <Stack spacing={1}>
          {results.length === 0 ? (
            <Typography color="text.secondary">No results — run an operation to see outputs here.</Typography>
          ) : (
            results.map(r => (
              <Paper key={`${r.id}-${r.time}`} variant="outlined" sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography sx={{ fontWeight: 700 }}>{r.status === 'fulfilled' ? `#${r.id} ✅` : `#${r.id} ✖`}</Typography>
                  <Typography variant="body2" color="text.secondary">{r.value ?? r.error}</Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">{new Date(r.time).toLocaleTimeString()}</Typography>
              </Paper>
            ))
          )}
        </Stack>
      </Stack>

      <Paper variant="outlined" sx={{ p: 1 }}>
        <Typography variant="subtitle1" fontWeight={700}>Timeline / Log</Typography>
        <Box sx={{ maxHeight: 160, overflow: 'auto', mt: 1 }}>
          {log.length === 0 ? (
            <Typography color="text.secondary">No logs yet</Typography>
          ) : (
            log.map((l, i) => <Typography key={i} variant="body2" sx={{ fontSize: 13 }}>{l}</Typography>)
          )}
        </Box>
      </Paper>
    </Stack>
  )
}
