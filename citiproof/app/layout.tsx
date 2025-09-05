import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Web3Provider } from "@/components/providers/Web3Provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "CitiProof - Citizen Onboarding",
  description: "Complete your citizen verification and onboarding process",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Web3Provider>
          <Suspense fallback={null}>{children}</Suspense>
        </Web3Provider>
        <Analytics />
      </body>
    </html>
  )
}
