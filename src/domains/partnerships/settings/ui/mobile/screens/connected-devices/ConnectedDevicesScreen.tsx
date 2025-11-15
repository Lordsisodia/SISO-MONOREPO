"use client";

export function ConnectedDevicesScreen() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-siso-text-primary">Connected Devices</h1>
      <p className="text-siso-text-muted">Manage your active sessions and connected devices.</p>

      <div className="bg-siso-bg-secondary rounded-xl p-6">
        <p className="text-siso-text-primary">Connected devices will appear here.</p>
      </div>
    </div>
  );
}