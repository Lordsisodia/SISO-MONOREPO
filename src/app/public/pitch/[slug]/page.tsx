export default function PublicPitchAssetPage({ params }: { params: { slug: string } }) {
  // Placeholder public view; later will fetch asset by slug
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-semibold">Public Pitch Asset</h1>
      <p className="text-sm text-neutral-300">Slug: {params.slug}</p>
      <p className="mt-4 text-neutral-200">This public route will render a pitch deck or asset when enabled for sharing.</p>
    </main>
  );
}

