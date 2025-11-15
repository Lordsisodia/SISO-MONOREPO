import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { getSettingsRouteBySlug } from "./settings-route-registry";

export async function renderSettingsRouteBySlug(slug: string) {
  const route = getSettingsRouteBySlug(slug);
  if (!route) notFound();

  if (route.status === "planned") {
    const mod = await import("./components/ComingSoonView");
    const ComingSoon = (mod as any).ComingSoonView ?? mod.default;
    return <ComingSoon title={route.title} description={route.description} />;
  }

  if (route.status !== "live" || !route.component) notFound();
  const mod = await route.component();
  const View: ComponentType | undefined = (mod as any).default;
  if (!View) notFound();
  return <View />;
}

