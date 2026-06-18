'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Menu, X, Layers, LayoutGrid, TrendingUp, Bot, ChevronDown, Sun, Moon } from 'lucide-react'
import { trackCTAClick } from '@/lib/analytics'

const serviceItems = [
  { icon: Layers, label: 'Brand & Web', desc: 'Logo, identity, web design & development', href: '/services#brand-web' },
  { icon: LayoutGrid, label: 'Content & Social', desc: 'Social media, creative direction & content', href: '/services#content-social' },
  { icon: TrendingUp, label: 'Google + AI Visibility', desc: 'Local SEO, GBP, paid ads & AI search', href: '/services#google-ai-visibility' },
  { icon: Bot, label: 'AI Workflows', desc: 'Automated follow-up, reviews & reporting', href: '/services#ai-workflows' },
]

const navLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Packages', href: '/pricing' },
]

function ThemeToggle() {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const isDark = document.documentElement.classList.contains('dark')
    setDark(isDark)
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', next)
  }

  return (
    <button
      onClick={mounted ? toggle : undefined}
      className="h-9 w-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06] transition-all"
      aria-label="Toggle theme"
    >
      {mounted && (dark ? <Sun size={15} /> : <Moon size={15} />)}
    </button>
  )
}

const ServicesDropdown = () => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 px-4 py-2 text-[13px] font-medium text-muted-foreground hover:text-foreground rounded-full hover:bg-foreground/[0.05] transition-all duration-200"
      >
        Services
        <ChevronDown size={13} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-0 mt-2 w-64 rounded-xl border border-border bg-popover shadow-elevated overflow-hidden"
          >
            <div className="p-1.5">
              {serviceItems.map(({ icon: Icon, label, desc, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="group flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-foreground/[0.04] transition-colors"
                >
                  <div className="h-8 w-8 rounded-lg border border-border bg-foreground/[0.03] flex items-center justify-center text-muted-foreground group-hover:text-accent group-hover:border-accent/25 transition-all duration-200 shrink-0 mt-0.5">
                    <Icon size={14} />
                  </div>
                  <div>
                    <div className="text-[13px] font-medium text-foreground/80 group-hover:text-foreground transition-colors">{label}</div>
                    <div className="text-[11px] text-muted-foreground/60 mt-0.5 leading-snug">{desc}</div>
                  </div>
                </a>
              ))}
              <div className="h-px mx-2 my-1.5" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--border-strong)), transparent)' }} />
              <a
                href="/services"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-[12px] font-medium text-muted-foreground hover:text-accent hover:bg-foreground/[0.03] transition-colors"
              >
                View all services →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'pt-2 pb-0' : 'pt-0'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          className={`flex items-center justify-between h-12 px-4 rounded-xl transition-all duration-500 ${
            scrolled
              ? 'bg-background border border-border shadow-[0_2px_16px_rgba(0,0,0,0.06)] dark:shadow-elevated'
              : 'bg-background/60 backdrop-blur-md border border-border/40'
          }`}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          <a href="/" className="flex items-center gap-2">
            <img src="/favicon.svg" alt="Delko" className="h-6 w-6" />
            <span className="text-[13px] font-semibold tracking-tight">Delko</span>
          </a>

          <nav className="hidden md:flex items-center">
            <ServicesDropdown />
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-4 py-2 text-[13px] font-medium text-muted-foreground hover:text-foreground rounded-full hover:bg-foreground/[0.05] transition-all duration-200"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-1">
            <ThemeToggle />
            <Button asChild variant="ghost" size="sm">
              <a href="/portal/login">Client Portal</a>
            </Button>
            <Button asChild variant="accent" size="sm">
              <a href="/audit" onClick={() => trackCTAClick('get_free_audit', 'navbar')}>Free Audit</a>
            </Button>
          </div>

          <button
            className="md:hidden p-2 -mr-1 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="md:hidden mx-4 mt-2 rounded-xl border border-border bg-background shadow-elevated overflow-hidden"
          >
            <div className="p-5 flex flex-col gap-1">
              <div className="text-[10px] font-bold font-mono uppercase tracking-[0.2em] text-muted-foreground/40 px-3 pb-1 pt-0.5">Services</div>
              {serviceItems.map(({ icon: Icon, label, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 text-[14px] font-medium text-muted-foreground hover:text-foreground py-2.5 px-3 rounded-xl hover:bg-foreground/[0.05] transition-colors"
                >
                  <Icon size={14} className="text-accent/60 shrink-0" />
                  {label}
                </a>
              ))}
              <div className="h-px my-2" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--border-strong)), transparent)' }} />
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-[15px] font-medium text-muted-foreground hover:text-foreground py-2.5 px-3 rounded-xl hover:bg-foreground/[0.05] transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <div className="flex items-center gap-2 mt-2 px-3">
                <ThemeToggle />
                <span className="text-[12px] text-muted-foreground">Toggle theme</span>
              </div>
              <Button asChild variant="ghost" className="mt-1 w-full">
                <a href="/portal/login" onClick={() => setOpen(false)}>Client Portal</a>
              </Button>
              <Button asChild variant="accent" className="mt-2 w-full">
                <a href="/audit" onClick={() => setOpen(false)}>Free Audit</a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
