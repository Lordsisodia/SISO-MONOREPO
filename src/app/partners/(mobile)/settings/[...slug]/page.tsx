import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { ComponentType } from "react";
import { getLiveSettingsRoutes } from "@/domains/partnerships/portal-architecture/settings/settings-route-registry";
import { renderSettingsRouteBySlug } from "@/domains/partnerships/portal-architecture/settings/route-renderers";

type SettingsDynamicParams = Promise<{ slug?: string[] }> | { slug?: string[] };

export async function generateStaticParams() {
  return getLiveSettingsRoutes().map((route) => ({
    slug: route.slug.split("/"),
  }));
}

async function SettingsRouteRenderer({ slug }: { slug: string }) {
  return renderSettingsRouteBySlug(slug);
}

export default async function SettingsDynamicPage({ params }: { params: SettingsDynamicParams }) {
  const resolved = await params as { slug?: string[] };
  return (
    <Suspense fallback={null}>
      {/* Route-level loading uses loading.tsx with shared Loader */}
      {/* @ts-expect-error Async Server Component */}
      <SettingsRouteRenderer slug={(resolved.slug ?? []).join("/")} />
    </Suspense>
  );
}
