import { AtSign, Mail, Phone, KeyRound, List, LockKeyhole, Users } from "lucide-react";
import type { AccountField, TwoFactorAction } from "./types";

export const accountContactFields: AccountField[] = [
  { id: "username", label: "Username", value: "SISOagency", icon: AtSign, helper: "@SISOagency" },
  { id: "account-type", label: "Account Type", value: "Individual", icon: Users, helper: "Personal account" },
  { id: "email", label: "Email address", value: "sam.geracitano19@gmail.com", icon: Mail, helper: "Unverified" },
  { id: "phone", label: "Phone number", value: "Not set", icon: Phone },
  { id: "recovery-email", label: "Recovery email", value: "Not set", icon: Mail, helper: "Backup email for account recovery" },
  { id: "password", label: "Password", value: "••••••••", icon: KeyRound },
];

export const twoFactorActions: TwoFactorAction[] = [
  {
    id: "backup-codes",
    label: "Generate backup codes",
    description: "Get ready to use 2FA by setting a backup method.",
    ctaLabel: "Setup",
  },
  {
    id: "totp",
    label: "Add authenticator",
    description: "Set up time-based one-time password (TOTP).",
    ctaLabel: "Connect",
  },
];
