'use client'

export function CookieSettingsLink() {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent('openCookieModal'))}
      className="text-muted-foreground hover:text-accent transition-colors duration-200 text-left"
    >
      Cookie Settings
    </button>
  )
}
