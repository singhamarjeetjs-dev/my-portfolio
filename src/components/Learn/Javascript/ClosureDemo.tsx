// src/components/Learn/ClosureDemo.tsx
import { useState, type JSX } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

export default function ClosureDemo(): JSX.Element {
  const [start, setStart] = useState<number>(0)
  const [step, setStep] = useState<number>(1)
  const [counters, setCounters] = useState<Array<{ id: number; callCount: number; value: number }>>([])

  const createCounter = () => {
    const id = Date.now()
    setCounters(prev => [...prev, { id, callCount: 0, value: start }])
  }

  const incrementCounter = (id: number) => {
    setCounters(prev => prev.map(c => (c.id === id ? { ...c, callCount: c.callCount + 1, value: c.value + step } : c)))
  }

  const resetCounters = () => setCounters([])

  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
        <TextField
          label="Start"
          type="number"
          value={start}
          onChange={(e) => setStart(Number(e.target.value))}
          size="small"
          sx={{ width: { xs: '100%', sm: 120 } }}
        />
        <TextField
          label="Step"
          type="number"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
          size="small"
          sx={{ width: { xs: '100%', sm: 120 } }}
        />

        <Box sx={{ flex: 1 }} />

        <Stack direction="row" spacing={1}>
          <Button variant="contained" color="primary" onClick={createCounter}>
            Create counter
          </Button>
          <Button variant="outlined" onClick={resetCounters}>
            Reset
          </Button>
        </Stack>
      </Stack>

      <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.paper' }}>
        <Typography variant="subtitle1" fontWeight={700}>
          Explanation
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          A closure allows a function to "remember" variables from the scope in which it was created.
          Each counter created keeps its own internal value even after the function that created it has finished running.
        </Typography>

        <Box component="pre" sx={{ mt: 1, p: 1, bgcolor: 'action.hover', borderRadius: 1, overflowX: 'auto', fontSize: 13 }}>
{`function counterFactory(start, step) {
  let value = start;
  return function increment() {
    value += step;
    return value;
  }
}
const c = counterFactory(0, 1);
c(); // 1
c(); // 2`}
        </Box>
      </Paper>

      <Stack spacing={1}>
        {counters.length === 0 ? (
          <Typography color="text.secondary">No counters yet — create one to try it out.</Typography>
        ) : (
          counters.map((c) => (
            <Paper key={c.id} variant="outlined" sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography sx={{ fontWeight: 700 }}>Counter #{String(c.id).slice(-4)}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Calls: {c.callCount} • Value: {c.value}
                </Typography>
              </Box>

              <Stack direction="row" spacing={1}>
                <Button size="small" variant="contained" onClick={() => incrementCounter(c.id)}>Increment</Button>
              </Stack>
            </Paper>
          ))
        )}
      </Stack>
    </Stack>
  )
}
