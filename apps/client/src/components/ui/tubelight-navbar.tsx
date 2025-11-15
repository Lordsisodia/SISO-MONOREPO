"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string // used as a value/key; not for navigation here
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  fixed?: boolean // if true, renders fixed centered bar; otherwise inline centered
  value?: string
  onChange?: (value: string) => void
}

export function NavBar({ items, className, fixed = false, value, onChange }: NavBarProps) {
  const [active, setActive] = useState<string>(value ?? items[0]?.url)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (value && value !== active) setActive(value)
  }, [value])

  const Container = ({ children }: { children: React.ReactNode }) => (
    <div
      className={cn(
        fixed
          ? "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6"
          : "relative z-10 flex justify-center",
        className,
      )}
    >
      {children}
    </div>
  )

  return (
    <Container>
      <div className="flex items-center gap-2 bg-siso-bg-alt/80 border border-siso-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = active === item.url
          return (
            <button
              key={item.url}
              type="button"
              onClick={() => {
                setActive(item.url)
                onChange?.(item.url)
              }}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-5 py-2 rounded-full transition-colors",
                "text-siso-text/80 hover:text-siso-orange",
                isActive && "bg-siso-orange/10 text-white sm:text-siso-orange",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden flex items-center justify-center">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-siso-orange/5 rounded-full -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-siso-orange rounded-t-full">
                    <div className="absolute w-12 h-6 bg-siso-orange/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-siso-orange/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-siso-orange/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </button>
          )
        })}
      </div>
    </Container>
  )
}

// Demo kept for reference (not exported by default)
export function NavBarDemo() {
  const { Home, User, Briefcase, FileText } = require("lucide-react")
  const items: NavItem[] = [
    { name: "Home", url: "home", icon: Home },
    { name: "About", url: "about", icon: User },
    { name: "Projects", url: "projects", icon: Briefcase },
    { name: "Resume", url: "resume", icon: FileText },
  ]
  return <NavBar items={items} />
}

