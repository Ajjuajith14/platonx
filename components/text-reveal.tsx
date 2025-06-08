"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface TextRevealProps {
  children: React.ReactNode
  className?: string
  animation?: "slideUp" | "fadeIn" | "scaleIn" | "rotateIn" | "splitReveal"
  delay?: number
  duration?: number
  trigger?: boolean
}

export default function TextReveal({
  children,
  className = "",
  animation = "slideUp",
  delay = 0,
  duration = 1,
  trigger = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && containerRef.current) {
      const element = containerRef.current

      const animations = {
        slideUp: {
          from: { y: 100, opacity: 0 },
          to: { y: 0, opacity: 1 },
        },
        fadeIn: {
          from: { opacity: 0, filter: "blur(10px)" },
          to: { opacity: 1, filter: "blur(0px)" },
        },
        scaleIn: {
          from: { scale: 0.5, opacity: 0, rotationY: 180 },
          to: { scale: 1, opacity: 1, rotationY: 0 },
        },
        rotateIn: {
          from: { rotationX: 90, opacity: 0, transformOrigin: "bottom" },
          to: { rotationX: 0, opacity: 1, transformOrigin: "bottom" },
        },
        splitReveal: {
          from: { y: "100%", skewY: 7 },
          to: { y: "0%", skewY: 0 },
        },
      }

      const { from, to } = animations[animation]

      if (trigger) {
        gsap.fromTo(element, from, {
          ...to,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      } else {
        gsap.fromTo(element, from, {
          ...to,
          duration,
          delay,
          ease: "power3.out",
        })
      }
    }
  }, [animation, delay, duration, trigger])

  if (animation === "splitReveal") {
    return (
      <div className={`overflow-hidden ${className}`}>
        <div ref={containerRef}>{children}</div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
