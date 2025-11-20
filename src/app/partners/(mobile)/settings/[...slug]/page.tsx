import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { ComponentType } from "react";
import { getLiveSettingsRoutes } from "@/domains/partnerships/portal-architecture/settings/settings-route-registry";
import { renderSettingsRouteBySlug } from "@/domains/partnerships/portal-architecture/settings/route-renderers";


type SettingsDynamicParams = { slug?: string[] };

async function SettingsRouteRenderer({ slug }: { slug: string }) {
  return renderSettingsRouteBySlug(slug);
}

export default async function SettingsDynamicPage({ params }: { params: Promise<SettingsDynamicParams> }) {
  const resolved = await params;
  return (
    <Suspense fallback={null}>
      {/* Route-level loading uses loading.tsx with shared Loader */}
      <SettingsRouteRenderer slug={(resolved.slug ?? []).join("/")} />
    </Suspense>
  );
}
