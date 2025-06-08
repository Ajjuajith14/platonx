"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cursor = cursorRef.current
      const follower = followerRef.current

      const moveCursor = (e: MouseEvent) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 })
        gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.3 })
      }

      const handleMouseEnter = () => {
        gsap.to([cursor, follower], { scale: 1.5, duration: 0.3 })
      }

      const handleMouseLeave = () => {
        gsap.to([cursor, follower], { scale: 1, duration: 0.3 })
      }

      document.addEventListener("mousemove", moveCursor)

      // Add magnetic effect to interactive elements
      const magneticElements = document.querySelectorAll("button, a, .watch-card")
      magneticElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter)
        el.addEventListener("mouseleave", handleMouseLeave)
      })

      return () => {
        document.removeEventListener("mousemove", moveCursor)
        magneticElements.forEach((el) => {
          el.removeEventListener("mouseenter", handleMouseEnter)
          el.removeEventListener("mouseleave", handleMouseLeave)
        })
      }
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-4 h-4 bg-platinum rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={followerRef}
        className="fixed w-8 h-8 border border-platinum rounded-full pointer-events-none z-50"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  )
}
