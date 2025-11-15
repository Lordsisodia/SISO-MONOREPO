import { permanentRedirect } from "next/navigation";

export default function LegacyPartnersMobileRedirect() {
  permanentRedirect("/partners");
}
