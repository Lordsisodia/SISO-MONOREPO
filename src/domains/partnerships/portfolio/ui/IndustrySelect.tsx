"use client";

import { useMemo } from "react";
import { CustomDropdown } from "@/domains/partnerships/portal-architecture/settings/general/ui/CustomDropdown";
import { industries } from "@/domains/partnerships/portfolio/data";

export function IndustrySelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const options = useMemo(
    () => [{ value: "all", label: "All industries" }, ...industries.map((i) => ({ value: i.slug, label: i.name }))],
    [],
  );

  return (
    <CustomDropdown
      options={options}
      value={value}
      onChange={onChange}
      placeholder="Select industry"
      searchable={true}
      maxVisible={12}
      className="w-full"
    />
  );
}
