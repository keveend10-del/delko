'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Menu, X } from 'lucide-react'
import { trackCTAClick } from '@/lib/analytics'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#packages' },
  { label: 'Process', href: '#process' },
  { label: 'Results', href: '#sway' },
]

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
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'pt-3 pb-0' : 'pt-0'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          className={`flex items-center justify-between h-16 px-5 rounded-xl transition-all duration-500 ${scrolled ? 'bg-[#050505] border border-white/[0.07]' : 'bg-transparent'}`}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          <a href="#top" className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inset-0 rounded-full bg-accent animate-dot" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            <span className="text-[14px] font-semibold tracking-tight">
              Delko
            </span>
          </a>

          <nav className="hidden md:flex items-center">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-4 py-2 text-[13px] font-medium text-muted-foreground hover:text-foreground rounded-full hover:bg-white/5 transition-all duration-200"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <a href="/portal/login">Client Portal</a>
            </Button>
            <Button asChild variant="accent" size="sm">
              <a href="#audit" onClick={() => trackCTAClick('get_free_audit', 'navbar')}>Free Audit</a>
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
            className="md:hidden mx-4 mt-2 rounded-xl border border-white/[0.07] bg-[#050505] shadow-elevated overflow-hidden"
          >
            <div className="p-5 flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-[15px] font-medium text-muted-foreground hover:text-foreground py-2.5 px-3 rounded-xl hover:bg-white/5 transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <Button asChild variant="ghost" className="mt-2 w-full">
                <a href="/portal/login" onClick={() => setOpen(false)}>Client Portal</a>
              </Button>
              <Button asChild variant="accent" className="mt-2 w-full">
                <a href="#audit" onClick={() => setOpen(false)}>Free Audit</a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
