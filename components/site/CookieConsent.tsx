'use client'

import { useEffect, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { getConsent, setConsent, updateGoogleConsent, type ConsentPreferences } from '@/lib/consent'

interface Prefs {
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

const DEFAULT_PREFS: Prefs = { analytics: false, marketing: false, preferences: false }
const ALL_GRANTED: Prefs = { analytics: true, marketing: true, preferences: true }

function Toggle({ checked, onChange, disabled }: { checked: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={cn(
        'relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40',
        checked ? 'bg-accent' : 'bg-foreground/10',
        disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
      )}
    >
      <span
        className={cn(
          'pointer-events-none block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200',
          checked ? 'translate-x-4' : 'translate-x-0'
        )}
      />
    </button>
  )
}

function CategoryRow({
  title,
  description,
  checked,
  onChange,
  always,
}: {
  title: string
  description: string
  checked: boolean
  onChange: (v: boolean) => void
  always?: boolean
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 border-b border-border last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[13px] font-semibold text-foreground">{title}</span>
          {always && (
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-accent px-1.5 py-0.5 rounded bg-accent/10">
              Always on
            </span>
          )}
        </div>
        <p className="text-[12px] text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <div className="pt-0.5 shrink-0">
        <Toggle checked={checked} onChange={onChange} disabled={always} />
      </div>
    </div>
  )
}

export function CookieConsent() {
  const [mounted, setMounted] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS)

  useEffect(() => {
    setMounted(true)
    const stored = getConsent()
    if (!stored) {
      setShowBanner(true)
    } else {
      setPrefs({
        analytics: stored.analyticsAllowed,
        marketing: stored.marketingAllowed,
        preferences: stored.preferencesAllowed,
      })
      updateGoogleConsent({ analyticsAllowed: stored.analyticsAllowed, marketingAllowed: stored.marketingAllowed })
    }
  }, [])

  // Listen for footer "Cookie Settings" trigger
  useEffect(() => {
    const handler = () => setShowModal(true)
    window.addEventListener('openCookieModal', handler)
    return () => window.removeEventListener('openCookieModal', handler)
  }, [])

  const savePrefs = useCallback((p: Prefs) => {
    setConsent({ analyticsAllowed: p.analytics, marketingAllowed: p.marketing, preferencesAllowed: p.preferences })
    updateGoogleConsent({ analyticsAllowed: p.analytics, marketingAllowed: p.marketing })
    setPrefs(p)
    setShowBanner(false)
    setShowModal(false)
  }, [])

  const acceptAll = useCallback(() => savePrefs(ALL_GRANTED), [savePrefs])
  const declineAll = useCallback(() => savePrefs(DEFAULT_PREFS), [savePrefs])
  const saveCurrent = useCallback(() => savePrefs(prefs), [savePrefs, prefs])

  if (!mounted) return null

  return (
    <>
      {/* ── Cookie Banner ── */}
      {showBanner && !showModal && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 pointer-events-none">
          <div
            className="pointer-events-auto mx-auto max-w-2xl rounded-2xl border border-border bg-card/[0.97] backdrop-blur-xl shadow-elevated p-5 sm:p-6"
            role="dialog"
            aria-label="Cookie consent"
            aria-modal="false"
          >
            <p className="text-[13px] text-muted-foreground leading-relaxed mb-5">
              We use cookies and similar technologies to improve your browsing experience, security, analytics, and site
              personalization. You can accept all, decline non-essential cookies, or manage your preferences.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={acceptAll}
                className="h-9 px-4 rounded-[10px] bg-accent text-[#050505] text-[13px] font-semibold transition-all hover:brightness-110 active:scale-[0.97]"
              >
                Accept All
              </button>
              <button
                onClick={declineAll}
                className="h-9 px-4 rounded-[10px] border border-border text-foreground text-[13px] font-semibold transition-all hover:bg-foreground/[0.04] hover:border-border-strong"
              >
                Decline All
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="h-9 px-4 rounded-[10px] text-muted-foreground text-[13px] font-semibold transition-all hover:text-foreground hover:bg-foreground/[0.04]"
              >
                Manage Cookies
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Manage Cookies Modal ── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Manage cookie preferences"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />

          {/* Modal panel */}
          <div className="relative w-full max-w-lg rounded-2xl border border-border bg-card shadow-elevated overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border">
              <h2 className="text-[15px] font-semibold">Cookie Preferences</h2>
              <button
                onClick={() => setShowModal(false)}
                className="h-7 w-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06] transition-colors text-[18px] leading-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Categories */}
            <div className="px-6 py-2 max-h-[60vh] overflow-y-auto">
              <CategoryRow
                title="Necessary Cookies"
                description="Required for login, security, Stripe checkout, dashboard access, and core site functionality. Cannot be disabled."
                checked={true}
                onChange={() => {}}
                always
              />
              <CategoryRow
                title="Analytics Cookies"
                description="Used for Google Analytics and event tracking to help us understand how visitors use the site."
                checked={prefs.analytics}
                onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
              />
              <CategoryRow
                title="Marketing Cookies"
                description="Used for future ads, retargeting, and campaign measurement across advertising platforms."
                checked={prefs.marketing}
                onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
              />
              <CategoryRow
                title="Preference Cookies"
                description="Used to remember your site preferences and settings for a better experience on future visits."
                checked={prefs.preferences}
                onChange={(v) => setPrefs((p) => ({ ...p, preferences: v }))}
              />
            </div>

            {/* Footer */}
            <div className="flex flex-wrap gap-2 px-6 py-5 border-t border-border">
              <button
                onClick={saveCurrent}
                className="h-9 px-4 rounded-[10px] bg-accent text-[#050505] text-[13px] font-semibold transition-all hover:brightness-110 active:scale-[0.97]"
              >
                Save Preferences
              </button>
              <button
                onClick={acceptAll}
                className="h-9 px-4 rounded-[10px] border border-border text-foreground text-[13px] font-semibold transition-all hover:bg-foreground/[0.04] hover:border-border-strong"
              >
                Accept All
              </button>
              <button
                onClick={declineAll}
                className="h-9 px-4 rounded-[10px] text-muted-foreground text-[13px] font-semibold transition-all hover:text-foreground hover:bg-foreground/[0.04]"
              >
                Decline All
              </button>
            </div>

            {/* Privacy note */}
            <p className="px-6 pb-5 text-[11px] text-muted-foreground leading-relaxed">
              We never store personal data like your name, email, or IP address in consent records.
            </p>
          </div>

          {/* TODO: Store anonymous consent events in Supabase consent_events table */}
          {/* TODO: Show cookie consent stats in admin dashboard */}
          {/* TODO: Add Google Tag Manager support if needed */}
          {/* TODO: Add marketing pixel support (Meta, TikTok) */}
        </div>
      )}
    </>
  )
}
