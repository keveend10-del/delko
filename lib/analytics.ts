declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
  }
}

type GtagParams = Record<string, string | number | boolean>

import { getConsent } from './consent'

function isAnalyticsAllowed(): boolean {
  const consent = getConsent()
  return consent?.analyticsAllowed === true
}

function fire(event: string, params?: GtagParams) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  if (!isAnalyticsAllowed()) return
  window.gtag('event', event, params)
}

// Ready-to-use event names for GA4 tracking (fires only when analytics consent granted):
// book_audit_click | contact_form_submit | checkout_started | checkout_completed
// signup_started | signup_completed | login_success
// client_dashboard_viewed | admin_dashboard_viewed | case_study_viewed

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
