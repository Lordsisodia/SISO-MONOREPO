import React, { useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// Icon set available in repo
import { NextjsIcon } from '@/components/ui/icons/NextjsIcon'
import { TypeScriptIcon } from '@/components/ui/icons/TypeScriptIcon'
import { TailwindCSSIcon } from '@/components/ui/icons/TailwindCSSIcon'
import { SupabaseIcon } from '@/components/ui/icons/SupabaseIcon'
import { VercelIcon } from '@/components/ui/icons/VercelIcon'
import { StripeIcon } from '@/components/ui/icons/StripeIcon'
import { OpenAIIcon } from '@/components/ui/icons/OpenAIIcon'
import { UpstashIcon } from '@/components/ui/icons/UpstashIcon'

type Group = 'Frontend' | 'Backend' | 'Database' | 'Auth' | 'Hosting' | 'Tools'

interface OverviewTechStackProps {
  stack: {
    frontend?: string[]
    backend?: string[]
    database?: string[]
    hosting?: string[]
    tools?: string[]
  }
}

const iconFor = (name: string) => {
  const n = name.toLowerCase()
  if (n.includes('next')) return <NextjsIcon className="w-5 h-5" />
  if (n.includes('typescript') || n === 'ts') return <TypeScriptIcon className="w-5 h-5" />
  if (n.includes('tailwind')) return <TailwindCSSIcon className="w-5 h-5" />
  if (n.includes('supabase')) return <SupabaseIcon className="w-5 h-5" />
  if (n.includes('vercel')) return <VercelIcon className="w-5 h-5" />
  if (n.includes('stripe')) return <StripeIcon className="w-5 h-5" />
  if (n.includes('openai')) return <OpenAIIcon className="w-5 h-5" />
  if (n.includes('upstash')) return <UpstashIcon className="w-5 h-5" />
  return null
}

const normalize = (arr?: string[]) => Array.from(new Set((arr || []).filter(Boolean)))

export function OverviewTechStack({ stack }: OverviewTechStackProps) {
  const groups = useMemo(() => {
    return [
      { label: 'Frontend', items: normalize(stack.frontend) },
      { label: 'Backend', items: normalize(stack.backend) },
      { label: 'Database', items: normalize(stack.database) },
      { label: 'Hosting', items: normalize(stack.hosting) },
      { label: 'Tools', items: normalize(stack.tools) },
    ].filter(g => g.items.length > 0)
  }, [stack])

  if (groups.length === 0) return null

  return (
    <Card className="border border-siso-border bg-siso-bg-alt">
      <CardContent className="p-4 md:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {groups.map(g => (
            <div key={g.label}>
              <h3 className="text-sm font-semibold text-siso-text-muted mb-2">{g.label}</h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map(item => {
                  const icon = iconFor(item)
                  return (
                    <Badge key={item} variant="secondary" className={cn("text-xs bg-siso-border/50 text-siso-text flex items-center gap-1")}> 
                      {icon}
                      <span>{item}</span>
                    </Badge>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

