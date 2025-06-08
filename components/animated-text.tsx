"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface AnimatedTextProps {
  text: string
  className?: string
  animation?: "reveal" | "bounce" | "slide" | "typewriter" | "wave" | "shimmer" | "glow"
  delay?: number
  stagger?: number
  trigger?: string
}

export default function AnimatedText({
  text,
  className = "",
  animation = "reveal",
  delay = 0,
  stagger = 0.1,
  trigger,
}: AnimatedTextProps) {
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && textRef.current) {
      const chars = textRef.current.querySelectorAll(".char")

      if (animation === "typewriter") {
        gsap.fromTo(
          textRef.current,
          { width: 0 },
          {
            width: "100%",
            duration: 2,
            ease: "power2.inOut",
            delay,
            scrollTrigger: trigger
              ? {
                  trigger,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                }
              : undefined,
          },
        )
      } else if (animation === "wave") {
        gsap.fromTo(
          chars,
          { y: 0, rotationX: 0 },
          {
            y: -10,
            rotationX: 10,
            duration: 0.6,
            stagger: stagger,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay,
          },
        )
      } else {
        const animationProps = {
          reveal: { y: 100, rotationX: 90, opacity: 0 },
          bounce: { y: -100, scale: 0.3, opacity: 0 },
          slide: { x: -50, opacity: 0 },
          shimmer: { opacity: 0 },
          glow: { opacity: 0, scale: 0.8 },
        }

        const toProps = {
          reveal: { y: 0, rotationX: 0, opacity: 1 },
          bounce: { y: 0, scale: 1, opacity: 1 },
          slide: { x: 0, opacity: 1 },
          shimmer: { opacity: 1 },
          glow: { opacity: 1, scale: 1 },
        }

        gsap.fromTo(chars, animationProps[animation], {
          ...toProps[animation],
          duration: 0.8,
          stagger: stagger,
          ease: animation === "bounce" ? "back.out(1.7)" : "power3.out",
          delay,
          scrollTrigger: trigger
            ? {
                trigger,
                start: "top 80%",
                toggleActions: "play none none reverse",
              }
            : undefined,
        })
      }
    }
  }, [animation, delay, stagger, trigger])

  const renderText = () => {
    if (animation === "typewriter") {
      return (
        <span
          ref={textRef}
          className={`${className} inline-block overflow-hidden whitespace-nowrap border-r-2 border-platinum`}
        >
          {text}
        </span>
      )
    }

    return (
      <span ref={textRef} className={className}>
        {text.split("").map((char, index) => (
          <span
            key={index}
            className={`char inline-block ${animation === "shimmer" ? "text-shimmer" : ""} ${
              animation === "glow" ? "text-glow-pulse" : ""
            }`}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    )
  }

  return renderText()
}
