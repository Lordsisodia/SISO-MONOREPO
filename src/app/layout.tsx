import type { Metadata } from "next"
import "./globals.css"
import WebVitals from "@/components/analytics/WebVitals";

export const metadata: Metadata = {
  title: "SISO Platform",
  description: "Unified platform for client-base and partnerships",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.dicebear.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === "development" ? <WebVitals /> : null}
      </body>
    </html>
  )
}
