// src/data/learnData.ts
import type { ComponentType } from 'react'

export type DemoRef = {
  id: string
  title: string
  description?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loader: () => Promise<{ default: ComponentType<any> }>
  tags?: string[]
  difficulty?: 'Easy' | 'Medium' | 'Hard'
  icon?: string
}

export type Tech = {
  id: string
  title: string
  subtitle?: string
  description?: string
  topTags?: string[]
  topics: DemoRef[]
}

/**
 * Centralized list of technologies -> topics -> dynamic loaders
 * Add or remove topics as you implement demo components in src/components/Learn/
 */
export const TECHS: Tech[] = [
  {
    id: 'javascript',
    title: 'JavaScript',
    subtitle: 'Core language concepts',
    description: 'Closures, Event loop, Promises, Prototypes and other JS fundamentals useful for interviews.',
    topTags: ['closures', 'promises', 'event-loop', 'prototypes'],
    topics: [
      {
        id: 'js-closures',
        title: 'Closures',
        description: 'How functions remember scope — counter factory demo.',
        loader: () => import('../components/Learn/Javascript/ClosureDemo'),
        tags: ['closures', 'scope', 'functions'],
        difficulty: 'Easy',
        icon: 'code'
      },
      {
        id: 'js-promises',
        title: 'Promises & async/await',
        description: 'Promise.all vs Promise.race vs sequential async/await with simulated requests.',
        loader: () => import('../components/Learn/Javascript/AsyncDemo'),
        tags: ['promises', 'async', 'await'],
        difficulty: 'Medium',
        icon: 'perf'
      },
      {
        id: 'js-event-loop',
        title: 'Event loop & microtasks',
        description: 'Visualize callstack, task queue and microtask queue behavior.',
        loader: () => import('../components/Learn/Javascript/EventLoopDemo'),
        tags: ['event-loop', 'microtasks', 'callbacks'],
        difficulty: 'Medium',
        icon: 'memory'
      },
      {
        id: 'js-fundamentals',
        title: 'JS fundamentals: Basics',
        description: 'var/let/const, hoisting, scope, prototype chain and property lookup.',
        loader: () => import('../components/Learn/Javascript/JSFundamentalsDemo'),
        tags: ['fundamentals', 'scope', 'prototype'],
        difficulty: 'Medium',
        icon: 'bug'
      },
      // {
      //   id: 'js-hoisting',
      //   title: 'Hoisting & scoping',
      //   description: 'var/let/const differences and temporal dead zone examples.',
      //   loader: () => import('../components/Learn/HoistingDemo'),
      //   tags: ['hoisting', 'scope', 'tdz'],
      //   difficulty: 'Easy',
      //   icon: 'code'
      // }
    ]
  },

  // {
  //   id: 'typescript',
  //   title: 'TypeScript',
  //   subtitle: 'Typing and patterns',
  //   description: 'Generics, utility types, type narrowing and practical TS patterns.',
  //   topTags: ['generics', 'types', 'utility-types'],
  //   topics: [
  //     {
  //       id: 'ts-generics',
  //       title: 'Generics',
  //       description: 'Small generic utilities and how to think about generic constraints.',
  //       loader: () => import('../components/Learn/TSGenericsDemo'),
  //       tags: ['generics', 'types'],
  //       difficulty: 'Medium',
  //       icon: 'code'
  //     },
  //     {
  //       id: 'ts-utility-types',
  //       title: 'Utility types',
  //       description: 'Mapped types, Pick/Partial/Record/Exclude in practical examples.',
  //       loader: () => import('../components/Learn/TSUtilityTypesDemo'),
  //       tags: ['utility-types', 'mapped-types'],
  //       difficulty: 'Easy',
  //       icon: 'code'
  //     },
  //     {
  //       id: 'ts-type-narrowing',
  //       title: 'Type narrowing',
  //       description: 'Discriminated unions, type guards, and narrowing strategies.',
  //       loader: () => import('../components/Learn/TSTypeNarrowingDemo'),
  //       tags: ['narrowing', 'unions'],
  //       difficulty: 'Medium',
  //       icon: 'bug'
  //     },
  //     {
  //       id: 'ts-declaration-merging',
  //       title: 'Declaration merging & modules',
  //       description: 'Practical cases for declaration merging and module augmentation.',
  //       loader: () => import('../components/Learn/TSDeclarationDemo'),
  //       tags: ['modules', 'declaration'],
  //       difficulty: 'Hard',
  //       icon: 'code'
  //     }
  //   ]
  // },

  {
    id: 'react',
    title: 'React',
    subtitle: 'Components & hooks',
    description: 'React fundamentals, hooks, custom hooks, rendering patterns and performance.',
    topTags: ['hooks', 'state', 'performance'],
    topics: [
    //   {
    //     id: 'react-hooks-basic',
    //     title: 'useState & useEffect',
    //     description: 'Common pitfalls with effects and proper dependency lists.',
    //     loader: () => import('../components/Learn/ReactHooksBasicDemo'),
    //     tags: ['hooks', 'useState', 'useEffect'],
    //     difficulty: 'Easy',
    //     icon: 'code'
    //   },
    //   {
    //     id: 'react-custom-hooks',
    //     title: 'Custom hooks',
    //     description: 'Designing reusable hooks and testing strategies.',
    //     loader: () => import('../components/Learn/ReactCustomHookDemo'),
    //     tags: ['hooks', 'custom-hooks'],
    //     difficulty: 'Medium',
    //     icon: 'memory'
    //   },
    //   {
    //     id: 'react-memo',
    //     title: 'Memoization & performance',
    //     description: 'useMemo, useCallback and rendering optimization patterns.',
    //     loader: () => import('../components/Learn/ReactMemoDemo'),
    //     tags: ['performance', 'memo'],
    //     difficulty: 'Medium',
    //     icon: 'perf'
    //   },
    //   {
    //     id: 'react-context',
    //     title: 'Context vs props',
    //     description: 'When to use Context, avoiding over-rendering and patterns.',
    //     loader: () => import('../components/Learn/ReactContextDemo'),
    //     tags: ['context', 'props'],
    //     difficulty: 'Easy',
    //     icon: 'network'
    //   }
    ]
  },

//   {
//     id: 'node',
//     title: 'Node.js',
//     subtitle: 'Server-side JS',
//     description: 'Streams, event loop on server, REST APIs, error handling and scaling patterns.',
//     topTags: ['streams', 'express', 'error-handling'],
//     topics: [
//       {
//         id: 'node-streams',
//         title: 'Streams basics',
//         description: 'Readable/Writable streams and piping for efficient I/O.',
//         loader: () => import('../components/Learn/NodeStreamsDemo'),
//         tags: ['streams', 'streaming'],
//         difficulty: 'Medium',
//         icon: 'storage'
//       },
//       {
//         id: 'node-express-errors',
//         title: 'Express error handling',
//         description: 'Middleware error handling, async errors and best practices.',
//         loader: () => import('../components/Learn/ExpressErrorDemo'),
//         tags: ['express', 'errors'],
//         difficulty: 'Easy',
//         icon: 'bug'
//       },
//       {
//         id: 'node-clustering',
//         title: 'Clustering & scaling',
//         description: 'Cluster module, worker restarts and basic load strategies.',
//         loader: () => import('../components/Learn/NodeClusteringDemo'),
//         tags: ['scaling', 'cluster'],
//         difficulty: 'Hard',
//         icon: 'network'
//       }
//     ]
//   },

//   {
//     id: 'redis',
//     title: 'Redis',
//     subtitle: 'In-memory data store',
//     description: 'Caching, pub/sub, eviction policies and usage patterns.',
//     topTags: ['cache', 'pubsub'],
//     topics: [
//       {
//         id: 'redis-pubsub',
//         title: 'Pub/Sub basics',
//         description: 'Simple pub/sub demo with publish and subscribe interactions (simulated).',
//         loader: () => import('../components/Learn/RedisPubSubDemo'),
//         tags: ['pubsub', 'realtime'],
//         difficulty: 'Easy',
//         icon: 'network'
//       },
//       {
//         id: 'redis-cache',
//         title: 'Caching patterns',
//         description: 'Cache-aside, write-through and TTL strategies.',
//         loader: () => import('../components/Learn/RedisCacheDemo'),
//         tags: ['cache', 'ttl'],
//         difficulty: 'Medium',
//         icon: 'storage'
//       }
//     ]
//   },

//   {
//     id: 'postgres',
//     title: 'Postgres',
//     subtitle: 'Relational databases',
//     description: 'Indexes, transactions, query planning and practical tuning tips.',
//     topTags: ['indexes', 'transactions'],
//     topics: [
//       {
//         id: 'pg-indexes',
//         title: 'Indexes & query plans',
//         description: 'How indexes affect queries and when to use them.',
//         loader: () => import('../components/Learn/PostgresIndexesDemo'),
//         tags: ['indexes', 'query-plans'],
//         difficulty: 'Medium',
//         icon: 'storage'
//       },
//       {
//         id: 'pg-transactions',
//         title: 'Transactions & isolation',
//         description: 'ACID, isolation levels and practical examples.',
//         loader: () => import('../components/Learn/PostgresTransactionsDemo'),
//         tags: ['transactions', 'isolation'],
//         difficulty: 'Hard',
//         icon: 'memory'
//       }
//     ]
//   }
 ]

export default TECHS
