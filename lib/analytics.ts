declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
  }
}

type GtagParams = Record<string, string | number | boolean>

function fire(event: string, params?: GtagParams) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, params)
  }
}

export function trackAuditSubmission(businessType: string) {
  fire('generate_lead', {
    event_category: 'audit_form',
    event_label: businessType || 'unspecified',
    value: 1,
  })
}

export function trackCTAClick(label: string, location: string) {
  fire('cta_click', {
    event_category: 'engagement',
    cta_label: label,
    cta_location: location,
  })
}

export function trackScrollMilestone(percent: number) {
  fire('scroll_milestone', {
    event_category: 'engagement',
    percent_scrolled: percent,
  })
}
