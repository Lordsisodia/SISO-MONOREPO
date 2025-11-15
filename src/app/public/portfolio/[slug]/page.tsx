export default function PublicPortfolioAssetPage({ params }: { params: { slug: string } }) {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-semibold">Public Portfolio Asset</h1>
      <p className="text-sm text-neutral-300">Slug: {params.slug}</p>
      <p className="mt-4 text-neutral-200">This public route will render a portfolio asset when marked public.</p>
    </main>
  );
}

