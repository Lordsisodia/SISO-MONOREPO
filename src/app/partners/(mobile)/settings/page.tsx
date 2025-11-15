import { SettingsPanel } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsPanel";
import { SettingsPageShell } from "@/domains/partnerships/portal-architecture/settings/SettingsPageShell";

export default function PartnersSettingsPage() {
  return (
    <SettingsPageShell>
      <SettingsPanel />
    </SettingsPageShell>
  );
}
