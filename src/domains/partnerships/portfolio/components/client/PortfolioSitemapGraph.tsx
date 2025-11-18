import React, { useMemo } from 'react'
import ReactFlow, { Background, Controls } from 'reactflow'
import 'reactflow/dist/style.css'

type PageNode = { id: string; title: string; route?: string; type?: 'page' | 'modal' | 'flow' }
type PageLink = { from: string; to: string; label?: string }

interface Props {
  pages?: PageNode[]
  pageLinks?: PageLink[]
}

export function PortfolioSitemapGraph({ pages = [], pageLinks = [] }: Props) {
  if (!pages.length) {
    return <p className="text-sm text-siso-text-muted">Page map coming soon.</p>
  }

  const byId = useMemo(() => new Map(pages.map(p => [p.id, p])), [pages])

  const nodes = pages.map((p, i) => ({
    id: p.id,
    data: { label: p.title },
    position: { x: (i % 3) * 220, y: Math.floor(i / 3) * 120 },
    style: { border: '1px solid rgba(255,255,255,0.1)', background: 'var(--siso-bg-alt)', color: 'white' },
  }))
  const edges = pageLinks.map((e, i) => ({ id: `e-${i}`, source: e.from, target: e.to, label: e.label }))

  const height = pages.length <= 3 ? 220 : pages.length <= 6 ? 340 : 420

  return (
    <div className="rounded-lg border border-siso-border overflow-hidden" style={{ height }}>
      <ReactFlow nodes={nodes} edges={edges} fitView fitViewOptions={{ padding: 0.2 }}>
        <Background color="#333" gap={16} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  )
}
