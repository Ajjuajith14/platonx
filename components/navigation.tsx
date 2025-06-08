"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Timepieces", href: "#watches" },
    { name: "Atelier", href: "#about" },
    { name: "Heritage", href: "#heritage" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-700 ${
        scrolled ? "glass-dark shadow-dark" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-20 lg:h-24 px-6 lg:px-12">
          {/* Ultra-refined Dark Logo */}
          <Link href="/" className="group">
            <div className="font-display-ultra text-2xl lg:text-3xl text-accent tracking-tight glow-pulse">
              <span className="relative">
                PLATONX
                <div className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-700"></div>
              </span>
            </div>
            <div className="font-accent-italic text-xs text-platinum mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Swiss Excellence
            </div>
          </Link>

          {/* Desktop Navigation - Dark Theme */}
          <div className="hidden lg:flex items-center space-x-12">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative group font-body-refined text-sm text-pearl hover:text-accent transition-all duration-500"
              >
                {item.name}
                <div className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-500"></div>
              </Link>
            ))}
          </div>

          {/* Dark Luxury CTA */}
          <div className="hidden lg:block">
            <button className="btn-outline-dark">Private Consultation</button>
          </div>

          {/* Mobile Menu - Dark */}
          <button
            className="lg:hidden p-2 text-accent hover:text-ivory transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation - Dark Luxury Overlay */}
        {isOpen && (
          <div className="lg:hidden fixed inset-0 bg-obsidian z-40">
            <div className="flex flex-col justify-center items-center h-full space-y-8">
              <div className="text-center mb-8">
                <div className="font-display-ultra text-3xl text-accent mb-2 glow-pulse">PLATONX</div>
                <div className="font-accent-italic text-sm text-platinum">Swiss Excellence</div>
              </div>

              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-display-light text-2xl text-ivory hover:text-accent transition-colors fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-8">
                <button className="btn-dark-luxury btn-mobile-dark" onClick={() => setIsOpen(false)}>
                  Private Consultation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
