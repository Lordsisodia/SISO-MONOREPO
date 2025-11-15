import { MobileShell } from "@/domains/partnerships/mobile/ui/MobileShell";
import { redirect } from "next/navigation";

export default function PartnersWalletPage() {
  redirect("/partners/settings/wallet");
}
