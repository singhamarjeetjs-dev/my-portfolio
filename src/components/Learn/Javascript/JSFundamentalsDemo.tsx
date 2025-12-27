/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/unsupported-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Learn/JSFundamentalsDemo.tsx
import { useState, type JSX } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import CopyAllIcon from '@mui/icons-material/CopyAll'
import TextField from '@mui/material/TextField'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

type TopicKey =
  | 'hoisting'
  | 'scope'
  | 'closures'
  | 'this'
  | 'prototypes'
  | 'coercion'
  | 'equality'
  | 'eventloop'
  | 'promises'
  | 'asyncawait'
  | 'modules'

const TOPICS: { key: TopicKey; title: string; short: string }[] = [
  { key: 'hoisting', title: 'Hoisting & TDZ', short: 'Declarations vs initializations, var vs let/const' },
  { key: 'scope', title: 'Scope & Lexical Environment', short: 'Block, function and lexical scope' },
  { key: 'closures', title: 'Closures', short: 'Functions remembering outer scope' },
  { key: 'this', title: 'this Binding', short: 'Implicit, explicit, new, arrow functions' },
  { key: 'prototypes', title: 'Prototypes', short: 'Prototype chain & property lookup' },
  { key: 'coercion', title: 'Type Coercion', short: 'Implicit conversions and gotchas' },
  { key: 'equality', title: 'Equality (== vs ===)', short: 'Loose vs strict equality rules' },
  { key: 'eventloop', title: 'Event Loop', short: 'Call stack, microtasks, macrotasks' },
  { key: 'promises', title: 'Promises', short: 'States, all/race/any/allSettled' },
  { key: 'asyncawait', title: 'async/await', short: 'Sugar over Promises, error handling' },
  { key: 'modules', title: 'Modules', short: 'ESM vs CommonJS, default vs named exports' },
]

export default function JSFundamentalsDemo(): JSX.Element {
  const [selected, setSelected] = useState<TopicKey>('hoisting')
  const [log, setLog] = useState<string[]>([])
  const [openSnippet, setOpenSnippet] = useState<Record<TopicKey, boolean>>({} as Record<TopicKey, boolean>)
  const [snippetFilter, setSnippetFilter] = useState<string>('')

  const pushLog = (s: string) =>
    setLog((l) => [new Date().toLocaleTimeString() + ' · ' + s, ...l].slice(0, 300))

  const clearLog = () => setLog([])

  // ---------- Safe demo implementations ----------
  // Each demo returns synchronous lines (string[]).
  // Some demos schedule asynchronous logs via pushLog.
  const demos: Record<TopicKey, () => string[]> = {
    hoisting: () => {
      const out: string[] = []
      out.push('Hoisting summary:')
      out.push('- var declarations are hoisted: declaration hoisted, initialization stays in place (value is undefined until assignment).')
      out.push('- let/const are in TDZ: accessing before declaration throws ReferenceError.')
      out.push('- Function declarations are hoisted fully (definition is available before use).')
      out.push('Safe demo: use typeof to inspect variables without throwing.')
      return out
    },

    scope: () => {
      const out: string[] = []
      out.push('Scope demonstration:')
      function functionScopeDemo() {
        // var is function-scoped in legacy JS; safe demonstration keeps naming unambiguous
        // eslint-disable-next-line no-var
        var a = 1
        // eslint-disable-next-line no-constant-condition
        if (true) {
          // eslint-disable-next-line no-var, @typescript-eslint/no-unused-vars
        }
        return a
      }
      function blockScopeDemo() {
        const b = 1
        {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }
        return b
      }
      out.push(`functionScopeDemo() => ${functionScopeDemo()} (var is function-scoped)`)
      out.push(`blockScopeDemo() => ${blockScopeDemo()} (let is block-scoped)`)
      return out
    },

    closures: () => {
      const out: string[] = []
      out.push('Closures: functions retain access to their lexical environment.')
      function makeCounter(start = 0, step = 1) {
        let value = start
        return function increment() {
          value += step
          return value
        }
      }
      const c1 = makeCounter(0, 1)
      const c2 = makeCounter(10, 5)
      out.push(`c1() => ${c1()}`)
      out.push(`c1() => ${c1()}`)
      out.push(`c2() => ${c2()}`)
      out.push(`c2() => ${c2()}`)
      out.push('Each counter keeps its own private state via closure.')
      return out
    },

    this: () => {
      const out: string[] = []
      out.push('this binding summary:')
      const obj = {
        name: 'obj',
        getName() {
          return this.name
        },
      }
      out.push(`obj.getName() => ${obj.getName()}`)
      out.push('Extracted method loses implicit binding when invoked without object (binding depends on call site).')
      out.push('Arrow functions capture lexical this and do not create their own this-binding.')
      return out
    },

    prototypes: () => {
      const out: string[] = []
      out.push('Prototype chain & lookup:')
      const proto = {
        greet(this: { name: string }): string {
          return `hi ${this.name}`
        },
      }
      const person: any = Object.create(proto)
      person.name = 'Sam'
      out.push(`person.greet() => ${person.greet()}`)
      // eslint-disable-next-line no-prototype-builtins
      out.push(`person.hasOwnProperty('greet') => ${person.hasOwnProperty('greet')}`)
      out.push('Property lookup checks own props first, then walks the prototype chain.')
      return out
    },

    coercion: () => {
      const out: string[] = []
      out.push('Type coercion examples:')
      out.push(`'5' + 1 => ${'5' + 1}`)
      out.push(`'5' - 1 => ${('5' as any) - 1}`)
      out.push("Be careful: + operator may cause string concatenation when a string is involved.")
      return out
    },

    equality: () => {
      const out: string[] = []
      out.push('Equality rules (safe examples):')
      out.push(`0 == false -> ${0 == (false as any)}`)
      out.push(`0 === false -> ${0 === (false as any)}`)
      out.push(`null == undefined -> ${null == (undefined as any)}`)
      out.push(`null === undefined -> ${null === (undefined as any)}`)
      out.push('Recommendation: prefer === to avoid unexpected coercion.')
      return out
    },

    eventloop: () => {
      const out: string[] = []
      out.push('Event Loop microtask vs macrotask demo (check timeline):')
      out.push('Scheduling macrotask (setTimeout 0) and microtask (Promise.then).')
      // schedule logs asynchronously to illustrate ordering
      setTimeout(() => pushLog('macrotask: setTimeout fired'), 0)
      Promise.resolve().then(() => pushLog('microtask: Promise.then fired'))
      out.push('Synchronous logs: A')
      out.push('Synchronous logs: B')
      out.push('Observe that microtask executes before macrotask.')
      return out
    },

    promises: () => {
      const out: string[] = []
      out.push('Promises demo (Promise.all & Promise.race). See timeline for async outputs.')
      const make = (delay: number, value: string) =>
        new Promise<string>((res) => setTimeout(() => res(value), delay))
      const p1 = make(200, 'p1')
      const p2 = make(100, 'p2')
      Promise.all([p1, p2]).then((vals) => pushLog(`Promise.all resolved: ${JSON.stringify(vals)}`))
      Promise.race([p1, p2]).then((val) => pushLog(`Promise.race winner: ${val}`))
      out.push('Started p1 (200ms) and p2 (100ms). Promise.race resolves first; Promise.all after both.')
      return out
    },

    asyncawait: () => {
      const out: string[] = []
      out.push('async/await demo — sequence of awaits logged to timeline.')
      async function seq() {
        const r1 = await new Promise<string>((res) => setTimeout(() => res('one'), 120))
        const r2 = await new Promise<string>((res) => setTimeout(() => res('two'), 80))
        return [r1, r2]
      }
      seq().then((vals) => pushLog(`async sequence result: ${JSON.stringify(vals)}`))
      out.push('Called async sequence; results will appear in timeline.')
      return out
    },

    modules: () => {
      const out: string[] = []
      out.push('Modules summary:')
      out.push('ES Modules (import/export) enable static analysis and tree-shaking.')
      out.push('CommonJS (require/module.exports) used historically in Node.')
      out.push('Prefer ESM for modern projects when supported.')
      return out
    },
  }

  // ---------- Read-only snippets for display ----------
  const snippets: Record<TopicKey, string> = {
    hoisting: `// var declarations are hoisted; let/const are in TDZ
function demoVar() {
  console.log(typeof x) // 'undefined' for var
  var x = 5
}
function demoLet() {
  // accessing y before declaration throws ReferenceError
  // console.log(y) // ReferenceError
  let y = 10
}`,
    scope: `function foo() {
  var a = 1
  if (true) {
    var a = 2 // same function-scoped variable
  }
  console.log(a) // 2
}
function bar() {
  let b = 1
  if (true) {
    let b = 2 // different block-scoped variable
  }
  console.log(b) // 1
}`,
    closures: `function makeCounter(start = 0) {
  let value = start
  return function increment() {
    value += 1
    return value
  }
}`,
    this: `const obj = {
  name: 'alex',
  getName() { return this.name }
}
const f = obj.getName
f() // undefined (lost binding)
// Arrow functions capture lexical this:
const arrow = () => this`,
    prototypes: `const proto = { greet() { return 'hi ' + this.name } }
const p = Object.create(proto)
p.name = 'Sam'
p.greet() // 'hi Sam'`,
    coercion: `'5' + 1 // '51'
'5' - 1 // 4`,
    equality: `0 == false // true
0 === false // false
null == undefined // true
null === undefined // false`,
    eventloop: `console.log('sync')
setTimeout(() => console.log('macrotask'), 0)
Promise.resolve().then(() => console.log('microtask'))
console.log('sync2')`,
    promises: `const p1 = fetch('/one')
const p2 = fetch('/two')
Promise.all([p1, p2]).then(([a,b]) => console.log(a, b))`,
    asyncawait: `async function run() {
  const a = await fetch('/one')
  const b = await fetch('/two')
}`,
    modules: `// export
export function add(a,b){ return a+b }
// import
import { add } from './math'`,
  }

  // copy to clipboard helper (safe)
  const copyToClipboard = async (s: string) => {
    if (!navigator.clipboard) {
      pushLog('Clipboard API not available')
      return
    }
    try {
      await navigator.clipboard.writeText(s)
      pushLog('Snippet copied to clipboard')
    } catch (err) {
      pushLog('Failed to copy snippet')
    }
  }

  // Run demo and append lines (sync lines) and rely on pushLog for async parts
  const runTopic = (k: TopicKey) => {
    const fn = demos[k]
    if (!fn) {
      pushLog('Demo not implemented for ' + k)
      return
    }
    const lines = fn()
    lines.forEach((l) => pushLog(l))
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h6">JavaScript Fundamentals — interactive reference</Typography>

      <Paper
        variant="outlined"
        sx={{
          display: 'flex',
          gap: 2,
          p: 2,
          alignItems: 'stretch',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* Left: topics list */}
        <Box sx={{ width: { xs: '100%', md: 320 }, flexShrink: 0 }}>
          <Typography sx={{ fontWeight: 700, mb: 1 }}>Topics</Typography>
          <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {TOPICS.map((t) => (
              <ListItemButton key={t.key} selected={selected === t.key} onClick={() => setSelected(t.key as TopicKey)}>
                <ListItemText primary={t.title} secondary={t.short} />
                <Chip label={t.key} size="small" />
              </ListItemButton>
            ))}
          </List>
        </Box>

        {/* Middle: explanation + snippet + controls */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {TOPICS.find((x) => x.key === selected)!.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {TOPICS.find((x) => x.key === selected)!.short}
          </Typography>

          <Paper variant="outlined" sx={{ p: 2, mb: 1 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {{
                hoisting:
                  'Hoisting: declarations are processed before execution. var declarations are hoisted (initialized as undefined), while let/const live in the TDZ until initialized.',
                scope: 'Scope: JavaScript has function and block scope. let/const are block scoped, var is function scoped.',
                closures: 'Closure: a function retains access to the variables of its lexical scope even after the outer function has returned.',
                this: 'this: binding depends on how a function is called. Arrow functions capture lexical this; methods use the object before the dot.',
                prototypes: 'Prototypes: objects inherit properties via the prototype chain. Object.getPrototypeOf and Object.create are core APIs.',
                coercion: 'Type coercion: JS will implicitly convert types in certain operations, e.g. + with a string triggers concatenation.',
                equality: 'Equality: use === except when you explicitly want coercion. == performs conversions and has surprising rules.',
                eventloop: 'Event loop: JS runtime processes a macrotask, then drains microtasks (Promises) before rendering/next tick.',
                promises: 'Promises: represent eventual completion/failure of async work. Promise.all, race, any, allSettled have different semantics.',
                asyncawait: 'async/await: syntactic sugar over Promises. Use try/catch for error handling; await pauses only that async function.',
                modules: 'Modules: ES Modules enable static imports/exports and tree-shaking. Use named and default exports appropriately.',
              }[selected]
              }
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
              <Button variant="contained" onClick={() => runTopic(selected)}>
                Run demo
              </Button>

              <Button
                variant="outlined"
                onClick={() => {
                  pushLog(`Toggled snippet for ${selected}`)
                  setOpenSnippet((s) => ({ ...s, [selected]: !s[selected] }))
                }}
              >
                Toggle snippet
              </Button>

              <IconButton size="small" onClick={() => copyToClipboard(snippets[selected])} title="Copy snippet">
                <CopyAllIcon fontSize="small" />
              </IconButton>

              <Button color="inherit" onClick={clearLog}>
                Clear log
              </Button>

              <TextField
                size="small"
                placeholder="Filter snippet text"
                value={snippetFilter}
                onChange={(e) => setSnippetFilter(e.target.value)}
                sx={{ ml: 'auto', minWidth: 160 }}
              />
            </Box>

            <Collapse in={!!openSnippet[selected]} timeout="auto" unmountOnExit>
              <Box sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                  Code snippet (read-only)
                </Typography>

                <Box sx={{ borderRadius: 1, overflow: 'hidden' }}>
                  <SyntaxHighlighter language="javascript" style={oneLight} wrapLines showLineNumbers>
                    {snippetFilter
                      ? snippets[selected]
                          .split('\n')
                          .filter((ln) => ln.toLowerCase().includes(snippetFilter.toLowerCase()))
                          .join('\n')
                      : snippets[selected]}
                  </SyntaxHighlighter>
                </Box>
              </Box>
            </Collapse>

            <Typography variant="caption" color="text.secondary">
              Note: snippets are read-only. Demos use safe, prewritten code (no eval). Asynchronous outputs appear in the timeline/log.
            </Typography>
          </Paper>
        </Box>

        {/* Right: log / timeline */}
        <Box sx={{ width: { xs: '100%', md: 360 }, flexShrink: 0 }}>
          <Typography sx={{ fontWeight: 700, mb: 1 }}>Log / Timeline</Typography>
          <Paper variant="outlined" sx={{ p: 1, height: 440, overflow: 'auto' }}>
            {log.length === 0 ? (
              <Typography color="text.secondary">No logs yet — run a demo.</Typography>
            ) : (
              <Stack spacing={1}>
                {log.map((l, i) => (
                  <Paper key={i} variant="outlined" sx={{ p: 1 }}>
                    <Typography variant="body2">{l}</Typography>
                  </Paper>
                ))}
              </Stack>
            )}
          </Paper>
        </Box>
      </Paper>
    </Stack>
  )
}
