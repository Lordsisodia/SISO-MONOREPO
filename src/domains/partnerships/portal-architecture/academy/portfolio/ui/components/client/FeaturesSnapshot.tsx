import React, { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'

interface FeaturesSnapshotProps {
  features: {
    key: string[]
    technical?: string[]
    integrations?: string[]
  }
  mainCount?: number
}

export function FeaturesSnapshot({ features, mainCount = 6 }: FeaturesSnapshotProps) {
  const main = (features.key || []).slice(0, mainCount)
  const all = useMemo(() => {
    const set = new Set<string>(features.key || [])
    ;(features.technical || []).forEach(f => set.add(f))
    ;(features.integrations || []).forEach(f => set.add(f))
    return Array.from(set)
  }, [features])

  const [showAll, setShowAll] = useState(false)

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-siso-text-muted mb-2">Main Features</h3>
        <div className="flex flex-wrap gap-2">
          {main.map((f) => (
            <Badge key={f} variant="secondary" className="text-xs bg-siso-border/50 text-siso-text">
              {f}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-siso-text-muted">All Features</h3>
          <button
            className="text-xs text-siso-orange hover:underline"
            onClick={() => setShowAll(v => !v)}
          >
            {showAll ? 'Show less' : 'Show all'}
          </button>
        </div>
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 transition-all ${showAll ? '' : 'max-h-28 overflow-hidden'}`}>
          {all.map((f) => (
            <div key={f} className="flex items-center gap-2 text-xs text-siso-text">
              <div className="h-1 w-1 bg-siso-orange rounded-full" />
              <span className="line-clamp-1">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

