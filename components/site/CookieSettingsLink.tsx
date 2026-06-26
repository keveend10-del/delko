'use client'

export function CookieSettingsLink() {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent('openCookieModal'))}
      className="inline-flex items-center py-2 text-muted-foreground hover:text-accent transition-colors duration-200 text-left"
    >
      Cookie Settings
    </button>
  )
}
