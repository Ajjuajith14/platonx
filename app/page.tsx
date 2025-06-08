"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Hero from "@/components/hero"
import About from "@/components/about"
import Watches from "@/components/watches"
import Contact from "@/components/contact"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Smooth page entrance
      gsap.fromTo(mainRef.current, { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out" })

      // Cleanup on unmount
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }
  }, [])

  return (
    <main ref={mainRef} className="bg-charcoal text-ivory cursor-default">
      <ScrollProgress />
      <Navigation />
      <Hero />
      <About />
      <Watches />
      <Contact />
      <Footer />
    </main>
  )
}
