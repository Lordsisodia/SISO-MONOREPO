import { SettingsDetailLayout } from "@/domains/partnerships/settings/ui/mobile/components/SettingsDetailLayout";
import { Share2 } from "lucide-react";

const sampleInvites = [
  { name: "Jordan Rivers", email: "jordan@agency.io", status: "accepted" },
  { name: "Brooklyn Chen", email: "brooklyn@siso.co", status: "pending" },
];

export function InvitePartnersScreen() {
  return (
    <SettingsDetailLayout
      title="Invite Partners"
      description="Share invite links, track status, and grow your pod."
      icon={<Share2 className="h-5 w-5 text-siso-orange" />}
      wrapContent={false}
    >
      <div className="space-y-5 text-siso-text-primary">
        <article className="rounded-3xl border border-siso-border bg-siso-bg-secondary/70 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-siso-text-muted">Personal link</p>
          <p className="mt-2 break-all text-lg font-semibold text-white">https://partners.siso.co/invite/sisoagency</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <button className="rounded-full bg-siso-orange px-4 py-2 font-semibold text-black">Copy link</button>
            <button className="rounded-full border border-white/20 px-4 py-2">Share</button>
          </div>
        </article>

        <section className="rounded-3xl border border-siso-border bg-siso-bg-secondary/60 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-siso-text-muted">Recent invites</p>
          <ul className="mt-3 space-y-2 text-sm">
            {sampleInvites.map((invite) => (
              <li key={invite.email} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                <div>
                  <p className="font-semibold text-white">{invite.name}</p>
                  <p className="text-xs text-siso-text-muted">{invite.email}</p>
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-siso-text-muted">{invite.status}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </SettingsDetailLayout>
  );
}
