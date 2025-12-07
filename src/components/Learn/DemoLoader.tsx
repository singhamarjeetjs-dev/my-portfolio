// src/components/Learn/DemoLoader.tsx
import React, { useEffect, useState } from 'react'
import { TECHS } from '../../data/learnData'

type Props = { techId: string; demoId: string }

export default function DemoLoader({ techId, demoId }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [DemoComp, setDemoComp] = useState<React.ComponentType<any> | null>(null)

  useEffect(() => {
    let mounted = true
    const tech = TECHS.find(t => t.id === techId)
    const demo = tech?.topics.find(d => d.id === demoId)
    if (!demo) return
    demo.loader().then(mod => {
      if (!mounted) return
      setDemoComp(() => mod.default)
    })
    return () => { mounted = false }
  }, [techId, demoId])

  if (!DemoComp) return <div>Loading demo…</div>
  return <DemoComp />
}
