export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold">SISO Monorepo</h1>
        <p className="text-xl text-gray-600">
          Unified platform ready for migration
        </p>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Client Base</h2>
            <p className="text-sm text-gray-500">
              Customer-facing features
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Partnerships</h2>
            <p className="text-sm text-gray-500">
              Partner management platform
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-2 text-sm text-gray-500">
          <p>✅ Scaffolding created</p>
          <p>✅ Reference apps preserved in apps/</p>
          <p>📝 Ready to migrate domains</p>
        </div>
      </div>
    </main>
  )
}
