export function LoadingState({ message, className = "" }: { message?: string; className?: string }) {
  return (
    <div className={`flex min-h-[200px] w-full items-center justify-center text-white ${className}`}>
      <div className="flex items-center gap-3 text-sm text-white/80">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        <span>{message ?? "Loading..."}</span>
      </div>
    </div>
  );
}
