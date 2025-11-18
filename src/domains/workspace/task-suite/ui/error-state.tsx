export function ErrorState({ title = "Error", message = "Something went wrong", className = "" }: { title?: string; message?: string; className?: string }) {
  return (
    <div className={`flex min-h-[200px] w-full items-center justify-center ${className}`}>
      <div className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-100 shadow">
        <p className="font-semibold">{title}</p>
        <p className="text-red-200">{message}</p>
      </div>
    </div>
  );
}
