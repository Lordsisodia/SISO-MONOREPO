/**
 * Settings Feature Entry Point
 * - Shared: domain/, components/
 * - Feature folders: account/, notifications/, etc.
 *
 * Note: Routes relocated to their proper domains:
 * - Membership/Tiers → earnings/tier-progress
 * - Affiliate Dashboard → recruitment/invite-partners
 * - Refer a Friend → recruitment/invite-partners
 * - Provide Feedback → partnership-hub/support
 * - What's New → community/announcements
 */

export * from "./domain";
export * from "./menu";
export * from "./settings-route-registry";

// General Settings
export * from "./general";

// Individual feature views (Live routes)
export * from "./account/ui/AccountSettingsView";
export * from "./notifications/ui/AccountNotificationsView";
export * from "./profile/ui/ProfileSettingsView";
export * from "./devices/ui/ConnectedDevicesView";
