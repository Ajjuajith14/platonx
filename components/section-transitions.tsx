"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function SectionTransitions() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Create smooth section transitions
      const sections = document.querySelectorAll("section")

      sections.forEach((section, index) => {
        // Background color transitions
        gsap.to(section, {
          backgroundColor: index % 2 === 0 ? "#000000" : "#111111",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        })

        // Section reveal with clip-path
        gsap.fromTo(
          section,
          { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
          {
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 20%",
              toggleActions: "play none none reverse",
            },
          },
        )

        // Parallax backgrounds
        const bgElements = section.querySelectorAll(".bg-element")
        bgElements.forEach((bg) => {
          gsap.to(bg, {
            yPercent: -30,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          })
        })
      })

      // Text reveal animations
      const textElements = document.querySelectorAll("h1, h2, h3, p")
      textElements.forEach((text) => {
        gsap.fromTo(
          text,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: text,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
            },
          },
        )
      })
    }
  }, [])

  return null
}
