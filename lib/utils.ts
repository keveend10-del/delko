import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatMonth(monthYear: string): string {
  const [year, month] = monthYear.split('-')
  return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function generateSlug(businessName: string): string {
  const base = slugify(businessName)
  const suffix = Math.random().toString(36).substring(2, 6)
  return `${base}-${suffix}`
}

export function currentMonthYear(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
}

export function getPriceId(pkg: string): string {
  const map: Record<string, string> = {
    starter: process.env.STRIPE_PRICE_STARTER!,
    growth: process.env.STRIPE_PRICE_GROWTH!,
    dominate: process.env.STRIPE_PRICE_DOMINATE!,
  }
  return map[pkg] ?? ''
}
