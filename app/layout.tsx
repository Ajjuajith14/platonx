import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from 'next/font/google'
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Platonx - Platinum Timepieces",
  description: "Crafting platinum-only watches for the world's most discerning collectors.",
  keywords: "luxury watches, platinum watches, exclusive timepieces",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}