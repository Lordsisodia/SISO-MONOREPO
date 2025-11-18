import { redirect } from "next/navigation";

// Redirect academy root to My Progress so users land on a concrete screen
export default function PartnersAcademyLandingPage() {
  redirect("/partners/academy/my-progress");
}
