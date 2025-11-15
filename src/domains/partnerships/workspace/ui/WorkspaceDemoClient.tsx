"use client";

import type { ReactNode } from 'react';

type Category = { id: string; label: string; channels: Array<{ id?: string; label?: string }> };

export function WorkspaceDemoClient({ categories }: { categories: Category[] }): ReactNode {
  return (
    <section className="p-4 text-sm text-siso-text-primary">
      <h1 className="mb-2 text-xl font-semibold uppercase tracking-[0.35em]">Workspace</h1>
      <p className="text-siso-text-muted">This is a lightweight placeholder for the workspace demo.</p>
      <ul className="mt-3 list-disc pl-5 text-siso-text-secondary">
        {categories.map((c) => (
          <li key={c.id}>{c.label}</li>
        ))}
      </ul>
    </section>
  );
}

