"use client";

export function ProfileSettingsScreen() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Profile</h1>
        <p className="text-muted-foreground">
          Manage your name, bio, photo, and contact info
        </p>
      </div>

      {/* TODO: Import and use profile components from portal-architecture/profile */}
      <div>Profile editing will use components from the profile domain</div>
    </div>
  );
}
