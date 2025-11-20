import { Suspense } from "react";

async function PitchAssetContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-semibold">Public Pitch Asset</h1>
      <p className="text-sm text-neutral-300">Slug: {slug}</p>
      <p className="mt-4 text-neutral-200">
        This public route will render a pitch deck or asset when enabled for sharing.
      </p>
    </main>
  );
}

export default function PublicPitchAssetPage(props: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black text-white p-6">
          <p className="text-neutral-300">Loading pitch asset…</p>
        </main>
      }
    >
      <PitchAssetContent {...props} />
    </Suspense>
  );
}
