// src/data/learnData.ts
export type DemoRef = {
  id: string           // unique id, e.g. 'js-closures'
  title: string
  description: string
  // dynamic import path or key to DemoLoader
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loader: () => Promise<{ default: React.ComponentType<any> }>
  // optional tags
  tags?: string[]
}

export type Tech = {
  id: string           // 'javascript', 'react', 'typescript', ...
  title: string
  subtitle?: string
  description?: string
  topics: DemoRef[]
}

/* Example small dataset */
export const TECHS: Tech[] = [
  {
    id: 'javascript',
    title: 'JavaScript',
    subtitle: 'Core language concepts',
    description: 'Closures, Event Loop, Promises, Prototypes, ...',
    topics: [
      {
        id: 'js-closures',
        title: 'Closures',
        description: 'Functions that remember scope — counters demo.',
        loader: () => import('../components/Learn/ClosureDemo')
      },
      {
        id: 'js-promises',
        title: 'Promises & async/await',
        description: 'Promise.all vs Promise.race vs sequential.',
        loader: () => import('../components/Learn/AsyncDemo')
      }
      // add more topics...
    ]
  },
  {
    id: 'react',
    title: 'React',
    subtitle: 'Component & Hooks',
    topics: [
      // lazy demo imports for React topics
    ]
  }
]
