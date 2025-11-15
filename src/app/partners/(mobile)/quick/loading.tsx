"use client";

import Loader from "@/domains/partnerships/portal-architecture/settings/shared/loader-15";

export default function QuickActionsLoading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center px-4 py-10">
      <Loader />
    </div>
  );
}

