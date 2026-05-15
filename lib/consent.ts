// Cookie consent management — Google Consent Mode v2 compatible

export const CONSENT_KEY = 'delko_cookie_consent'
export const CONSENT_VERSION = '1.0'

export interface ConsentPreferences {
  version: string
  timestamp: string
  analyticsAllowed: boolean
  marketingAllowed: boolean
  preferencesAllowed: boolean
}

export function getConsent(): ConsentPreferences | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    return JSON.parse(raw) as ConsentPreferences
  } catch {
    return null
  }
}

export function setConsent(prefs: Omit<ConsentPreferences, 'version' | 'timestamp'>): ConsentPreferences {
  const full: ConsentPreferences = {
    ...prefs,
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
  }
  localStorage.setItem(CONSENT_KEY, JSON.stringify(full))
  return full
}

export function updateGoogleConsent(prefs: Pick<ConsentPreferences, 'analyticsAllowed' | 'marketingAllowed'>) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('consent', 'update', {
    analytics_storage: prefs.analyticsAllowed ? 'granted' : 'denied',
    ad_storage: prefs.marketingAllowed ? 'granted' : 'denied',
    ad_user_data: prefs.marketingAllowed ? 'granted' : 'denied',
    ad_personalization: prefs.marketingAllowed ? 'granted' : 'denied',
  })
}

// TODO: Store anonymous consent events in Supabase (consent_events table)
// TODO: Show cookie consent stats in admin dashboard
