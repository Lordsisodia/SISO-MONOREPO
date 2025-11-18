import React, { useMemo, useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ScreenshotGallery } from './ScreenshotGallery'

interface GuidedWalkthroughProps {
  desktop?: string[]
  mobile?: string[]
  pages?: { id: string; title: string }[]
}

export function GuidedWalkthrough({ desktop = [], mobile = [], pages = [] }: GuidedWalkthroughProps) {
  const [deviceDefault] = useState(desktop.length ? 'desktop' : 'mobile')

  const desktopShots = useMemo(() => desktop.map((url, i) => ({ url, caption: pages[i]?.title || `Step ${i + 1}` })), [desktop, pages])
  const mobileShots = useMemo(() => mobile.map((url, i) => ({ url, caption: pages[i]?.title || `Step ${i + 1}` })), [mobile, pages])

  return (
    <Tabs defaultValue={deviceDefault} className="w-full">
      <TabsList className="bg-siso-bg-alt border border-siso-border mb-6">
        <TabsTrigger value="desktop">Desktop</TabsTrigger>
        <TabsTrigger value="mobile">Mobile</TabsTrigger>
      </TabsList>
      <TabsContent value="desktop" className="mt-2">
        <ScreenshotGallery screenshots={desktopShots} />
      </TabsContent>
      <TabsContent value="mobile" className="mt-2">
        <ScreenshotGallery screenshots={mobileShots} />
      </TabsContent>
    </Tabs>
  )
}

