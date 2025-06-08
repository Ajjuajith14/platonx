"use client"

import Link from "next/link"
import { Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "YouTube", icon: Youtube, href: "#" },
  ]

  return (
    <footer className="bg-charcoal border-t border-graphite/30 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="text-2xl font-display font-bold tracking-wider text-white mb-2 drop-shadow-lg">PLATONX</div>
            <p className="text-pearl text-sm max-w-md">Architectural precision meets horological mastery</p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="w-10 h-10 bg-graphite rounded-lg flex items-center justify-center text-silver hover:text-white hover:bg-silver/20 transition-all duration-300 shadow-lg"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-graphite/30 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4">
          <p className="text-silver text-sm">© {currentYear} Platonx. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-silver hover:text-white transition-colors text-sm">
              Privacy
            </Link>
            <Link href="#" className="text-silver hover:text-white transition-colors text-sm">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
