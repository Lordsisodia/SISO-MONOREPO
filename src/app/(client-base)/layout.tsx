export default function ClientBaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Add client-base specific layout (nav, footer, etc.)
  return <>{children}</>
}
