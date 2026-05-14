# Design Language: Events - Ticket Tree

> Extracted from `https://tickettree.us` on May 14, 2026
> 900 elements analyzed

This document describes the complete design language of the website. It is structured for AI/LLM consumption — use it to faithfully recreate the visual design in any framework.

## Color Palette

### Primary Colors

| Role | Hex | RGB | HSL | Usage Count |
|------|-----|-----|-----|-------------|
| Primary | `#059669` | rgb(5, 150, 105) | hsl(161, 94%, 30%) | 7 |

### Neutral Colors

| Hex | HSL | Usage Count |
|-----|-----|-------------|
| `#262626` | hsl(0, 0%, 15%) | 888 |
| `#f2f2f2` | hsl(0, 0%, 95%) | 430 |
| `#ffffff` | hsl(0, 0%, 100%) | 351 |
| `#000000` | hsl(0, 0%, 0%) | 185 |
| `#d1d5db` | hsl(216, 12%, 84%) | 24 |
| `#1a1a1a` | hsl(0, 0%, 10%) | 3 |

### Background Colors

Used on large-area elements: `#1a1a1a`, `#000000`, `#2a2a2a`

### Text Colors

Text color palette: `#000000`, `#f2f2f2`, `#ffffff`, `#d1d5db`

### Gradients

```css
background-image: linear-gradient(135deg, rgba(52, 211, 153, 0.45) 0%, rgba(16, 185, 129, 0.4) 35%, rgba(0, 185, 108, 0.45) 70%, rgba(5, 150, 105, 0.4) 100%);
```

```css
background-image: linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5));
```

```css
background-image: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));
```

```css
background-image: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
```

```css
background-image: linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(34, 197, 94, 0.25), rgba(0, 0, 0, 0));
```

### Full Color Inventory

| Hex | Contexts | Count |
|-----|----------|-------|
| `#262626` | border, background | 888 |
| `#f2f2f2` | text, border | 430 |
| `#ffffff` | border, text, background | 351 |
| `#000000` | text, background | 185 |
| `#d1d5db` | text | 24 |
| `#059669` | background | 7 |
| `#1a1a1a` | background | 3 |

## Typography

### Font Families

- **Times** — used for body (1 elements)

### Type Scale

| Size (px) | Size (rem) | Weight | Line Height | Letter Spacing | Used On |
|-----------|------------|--------|-------------|----------------|---------|
| 48px | 3rem | 600 | 48px | normal | h1 |
| 20px | 1.25rem | 600 | 25px | normal | h1 |
| 18px | 1.125rem | 600 | 28px | normal | h3, span, svg, path |
| 16px | 1rem | 400 | 24px | normal | html, head, meta, link |
| 14px | 0.875rem | 400 | 20px | normal | input, div, h3, a |
| 12px | 0.75rem | 300 | 16px | 1.2px | button, svg, path, span |

### Heading Scale

```css
h1 { font-size: 48px; font-weight: 600; line-height: 48px; }
h1 { font-size: 20px; font-weight: 600; line-height: 25px; }
h3 { font-size: 18px; font-weight: 600; line-height: 28px; }
h3 { font-size: 14px; font-weight: 400; line-height: 20px; }
```

### Body Text

```css
body { font-size: 12px; font-weight: 300; line-height: 16px; }
```

### Font Weights in Use

`400` (541x), `600` (146x), `300` (141x), `500` (72x)

## Spacing

**Base unit:** 4px

| Token | Value | Rem |
|-------|-------|-----|
| spacing-1 | 1px | 0.0625rem |
| spacing-32 | 32px | 2rem |
| spacing-48 | 48px | 3rem |
| spacing-64 | 64px | 4rem |
| spacing-80 | 80px | 5rem |

## Border Radii

| Label | Value | Count |
|-------|-------|-------|
| md | 7px | 1 |
| lg | 12px | 122 |
| lg | 16px | 1 |
| full | 9999px | 35 |

## Box Shadows

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
```

**xs (inset)** — blur: 0px
```css
box-shadow: rgba(255, 255, 255, 0.12) 0px 1px 0px 0px inset, rgba(16, 185, 129, 0.08) 0px 0px 10px 0px;
```

## CSS Custom Properties

### Colors

```css
--toastify-color-light: #fff;
--toastify-color-dark: #121212;
--toastify-color-info: #3498db;
--toastify-color-success: #07bc0c;
--toastify-color-warning: #f1c40f;
--toastify-color-error: #e74c3c;
--toastify-color-transparent: #ffffffb3;
--toastify-icon-color-info: var(--toastify-color-info);
--toastify-icon-color-success: var(--toastify-color-success);
--toastify-icon-color-warning: var(--toastify-color-warning);
--toastify-icon-color-error: var(--toastify-color-error);
--toastify-text-color-light: #757575;
--toastify-text-color-dark: #fff;
--toastify-text-color-info: #fff;
--toastify-text-color-success: #fff;
--toastify-text-color-warning: #fff;
--toastify-text-color-error: #fff;
--toastify-spinner-color: #616161;
--toastify-spinner-color-empty-area: #e0e0e0;
--toastify-color-progress-light: linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);
--toastify-color-progress-dark: #bb86fc;
--toastify-color-progress-info: var(--toastify-color-info);
--toastify-color-progress-success: var(--toastify-color-success);
--toastify-color-progress-warning: var(--toastify-color-warning);
--toastify-color-progress-error: var(--toastify-color-error);
--toastify-color-progress-bgo: .2;
--foreground: 0 0% 95%;
--card: 0 0% 13%;
--card-foreground: 0 0% 95%;
--card-border: 0 0% 24%;
--icon-bg: 0, 0, 16%;
--popover: 0 0% 13%;
--popover-foreground: 0 0% 95%;
--primary: 0 0% 16.5%;
--primary-foreground: 0 0% 95%;
--secondary: 0 0% 14.9%;
--secondary-foreground: 0 0% 95%;
--muted: 0 0% 63.9%;
--muted-foreground: 0 0% 63.9%;
--accent: 0 0% 14.9%;
--accent-foreground: 0 0% 95%;
--destructive: 0 84.2% 60.2%;
--destructive-foreground: 0 0% 98%;
--border: 0 0% 14.9%;
--ring: 0 0% 83.1%;
--primary-green: #00b96c;
--secondary-green: #06995c;
--muted-green: #06995c28;
--primary-dark: #172c21;
--brand-green-secondary: 120, 86%, 92%;
--theme-bg-light: #fafafa;
--theme-bg-dark: #2a2a2a;
--theme-border-light: #0000001a;
--theme-border-dark: #ffffff1a;
--secondary-dark: var(--space-grey-1);
--header-color: #fff;
--text-color: #bebebe;
--button-text-color: #fff;
--privy-color-background: #FFFFFF;
--privy-color-background-2: #F1F2F9;
--privy-color-background-3: #5B4FFF;
--privy-color-foreground: #040217;
--privy-color-foreground-2: #64668B;
--privy-color-foreground-3: #9498B8;
--privy-color-foreground-4: #E2E3F0;
--privy-color-foreground-accent: hsl(0, 0%, 97%);
--privy-color-accent: hsl(237, 100%, 70%);
--privy-color-accent-light: hsl(237, 100%, 85%);
--privy-color-accent-hover: hsl(0, 0%, 100%);
--privy-color-accent-dark: hsl(237, 100%, 64%);
--privy-color-accent-darkest: hsl(237, 100%, 10%);
--privy-color-success: #DCFCE7;
--privy-color-success-dark: #135638;
--privy-color-success-light: #DCFCE7;
--privy-color-success-bg: #DCFCE7;
--privy-color-error: #991B1B;
--privy-color-error-light: #FEE2E2;
--privy-color-error-bg: #FEE2E2;
--privy-color-error-bg-hover: #FECACA;
--privy-color-warn: #FEF3C7;
--privy-color-warn-light: #FEF3C7;
--privy-color-warn-bg: #FEF3C7;
--privy-color-warning-dark: #906218;
--privy-color-error-dark: #991B1B;
--privy-color-info-bg: #E0E7FF;
--privy-color-info-bg-hover: #EEF2FF;
--privy-color-border-default: #E2E3F0;
--privy-color-border-hover: #E2E3F0;
--privy-color-border-focus: #949DF9;
--privy-color-border-error: #F69393;
--privy-color-border-success: #87D7B7;
--privy-color-border-warning: #FACD63;
--privy-color-border-info: #F1F2F9;
--privy-color-border-interactive: #5B4FFF;
--privy-color-border-interactive-hover: #5B4FFF;
--privy-color-background-hover: #F8F9FC;
--privy-color-background-clicked: #F1F2F9;
--privy-color-background-disabled: #FFFFFF;
--privy-color-background-interactive: #5B4FFF;
--privy-color-background-interactive-hover: #4F46E5;
--privy-color-background-interactive-clicked: #4338CA;
--privy-color-background-interactive-disabled: #F1F2F9;
--privy-color-foreground-hover: #040217;
--privy-color-foreground-clicked: #040217;
--privy-color-foreground-disabled: #CBCDE1;
--privy-color-foreground-interactive: #5B4FFF;
--privy-color-foreground-interactive-hover: #5B4FFF;
--privy-link-navigation-color: hsl(237, 100%, 70%);
--privy-accent-has-good-contrast: 1;
--privy-color-icon-default: #110F2A;
--privy-color-icon-muted: #64668B;
--privy-color-icon-subtle: #9498B8;
--privy-color-icon-inverse: #FFFFFF;
--privy-color-icon-success: #33B287;
--privy-color-icon-warning: #F59E0B;
--privy-color-icon-error: #EF4444;
--privy-color-icon-interactive: #564FFF;
--privy-color-icon-default-hover: #1D1B35;
--privy-color-icon-muted-hover: #64668B;
--privy-color-icon-subtle-hover: #888AAE;
--privy-color-icon-default-clicked: #060C23;
--privy-color-icon-muted-clicked: #64668B;
--privy-color-icon-subtle-clicked: #788804;
--privy-color-icon-default-disabled: #CBCDE1;
--privy-color-icon-muted-disabled: #CBCDE1;
--privy-color-icon-subtle-disabled: #CBCDE1;
--privy-color-icon-error-hover: #F06060;
--privy-color-icon-interactive-hover: #4F46E5;
--privy-color-icon-error-clicked: #DC3838;
--privy-color-icon-interactive-clicked: #2BA482;
--privy-color-icon-muted-disabled-alt: #CBCDE1;
--privy-color-icon-subtle-disabled-alt: #CBCDE1;
--privy-border-radius-xs: 6px;
--privy-border-radius-sm: 8px;
--privy-border-radius-md: 12px;
--privy-border-radius-mdlg: 16px;
--privy-border-radius-lg: 24px;
--privy-border-radius-full: 9999px;
--tw-ring-shadow: 0 0 #0000;
--tw-border-spacing-x: 0;
--tw-ring-color: #3b82f680;
--tw-ring-offset-color: #fff;
--tw-ring-offset-width: 0px;
--tw-shadow-colored: 0 0 #0000;
--tw-ring-offset-shadow: 0 0 #0000;
--tw-ring-inset: ;
--tw-border-spacing-y: 0;
--tw-border-opacity: 1;
```

### Spacing

```css
--space-grey-1: #363d49;
--space-grey-2: #2c2f35;
--space-grey-3: #282a2f;
--space-grey-4: #242529;
--space-grey-5: #202122;
--tw-numeric-spacing: ;
--tw-contain-size: ;
```

### Typography

```css
--toastify-font-family: sans-serif;
--theme-text-light: #3d3d3d;
--theme-text-dark: #f0f0f0;
--faded-text: #bfbfbf;
--font-rubik: "Rubik", "Rubik Fallback";
```

### Shadows

```css
--tw-drop-shadow: ;
--tw-shadow: 0 0 #0000;
```

### Radii

```css
--toastify-toast-bd-radius: 6px;
--radius: .5rem;
```

### Other

```css
--toastify-toast-width: 320px;
--toastify-toast-offset: 16px;
--toastify-toast-top: max(var(--toastify-toast-offset), env(safe-area-inset-top));
--toastify-toast-right: max(var(--toastify-toast-offset), env(safe-area-inset-right));
--toastify-toast-left: max(var(--toastify-toast-offset), env(safe-area-inset-left));
--toastify-toast-bottom: max(var(--toastify-toast-offset), env(safe-area-inset-bottom));
--toastify-toast-background: #fff;
--toastify-toast-min-height: 64px;
--toastify-toast-max-height: 800px;
--toastify-z-index: 9999;
--background: 0 0% 16.5%;
--input: 0 0% 14.9%;
--brand-green: 155, 89%, 34%;
--brand-green-hover: 155, 85.4%, 24.1%;
--brand-green-outline-hover: 155, 20.8%, 12.7%;
--emerald: #10b981;
--emerald-dark: #059669;
--emerald-darker: #047857;
--emerald-mint: #34d399;
--emerald-pale: #d1fae5;
--emerald-frost: #e5f9ee;
--emerald-sage: #f0fdf4;
--forest-dark: #002415;
--forest: #0f1f1a;
--button-background: var(--primary-green);
--button-pressed-background: #06995c;
--privy-link-navigation-decoration: none;
--privy-height-modal-full: 620px;
--privy-height-modal-compact: 480px;
--page-header-height: 56px;
--tw-backdrop-sepia: ;
--tw-sepia: ;
--tw-ordinal: ;
--tw-contain-style: ;
--tw-backdrop-invert: ;
--tw-backdrop-grayscale: ;
--tw-hue-rotate: ;
--tw-pan-y: ;
--tw-rotate: 0;
--tw-saturate: ;
--tw-scroll-snap-strictness: proximity;
--tw-gradient-via-position: ;
--tw-grayscale: ;
--tw-backdrop-hue-rotate: ;
--tw-gradient-to-position: ;
--tw-numeric-fraction: ;
--tw-skew-y: 0;
--tw-slashed-zero: ;
--tw-backdrop-opacity: ;
--tw-gradient-from-position: ;
--tw-pinch-zoom: ;
--tw-contain-paint: ;
--tw-backdrop-saturate: ;
--tw-brightness: ;
--tw-scale-y: 1;
--tw-backdrop-contrast: ;
--tw-backdrop-brightness: ;
--tw-pan-x: ;
--tw-translate-y: 0;
--tw-contrast: ;
--tw-skew-x: 0;
--tw-backdrop-blur: ;
--tw-translate-x: 0;
--tw-scale-x: 1;
--tw-blur: ;
--tw-invert: ;
--tw-numeric-figure: ;
--tw-contain-layout: ;
```

### Dependencies

```css
--toastify-icon-color-info: --toastify-color-info;
--toastify-icon-color-success: --toastify-color-success;
--toastify-icon-color-warning: --toastify-color-warning;
--toastify-icon-color-error: --toastify-color-error;
--toastify-toast-top: --toastify-toast-offset;
--toastify-toast-right: --toastify-toast-offset;
--toastify-toast-left: --toastify-toast-offset;
--toastify-toast-bottom: --toastify-toast-offset;
--toastify-color-progress-info: --toastify-color-info;
--toastify-color-progress-success: --toastify-color-success;
--toastify-color-progress-warning: --toastify-color-warning;
--toastify-color-progress-error: --toastify-color-error;
--secondary-dark: --space-grey-1;
--button-background: --primary-green;
```

### Semantic

```css
success: [object Object];
warning: [object Object];
error: [object Object];
info: [object Object];
```

## Breakpoints

| Name | Value | Type |
|------|-------|------|
| xs | 380px | min-width |
| 400px | 400px | min-width |
| sm | 480px | max-width |
| sm | 520px | min-width |
| sm | 640px | min-width |
| md | 768px | min-width |
| lg | 1024px | min-width |
| xl | 1280px | min-width |
| 2xl | 1536px | min-width |

## Transitions & Animations

**Easing functions:** `[object Object]`, `[object Object]`, `[object Object]`

**Durations:** `0.3s`, `0.2s`, `0.15s`, `0.7s`, `0.5s`, `1s`, `0.1s`

### Common Transitions

```css
transition: all;
transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), text-decoration-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), fill 0.2s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.2s cubic-bezier(0.4, 0, 0.2, 1);
transition: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
transition: width 0.3s ease-in-out;
transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), text-decoration-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), fill 0.15s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.15s cubic-bezier(0.4, 0, 0.2, 1);
transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1);
transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
```

### Keyframe Animations

**animatedLoader-module__6iKsaG__treeGrow**
```css
@keyframes animatedLoader-module__6iKsaG__treeGrow {
  0% { opacity: 0.7; transform: scale(0.6); }
  50% { opacity: 1; transform: scale(1.1); }
  100% { opacity: 1; transform: scale(1); }
}
```

**animatedLoader-module__6iKsaG__loadingSpin**
```css
@keyframes animatedLoader-module__6iKsaG__loadingSpin {
  0% {  }
  25% { rotate: -10deg; }
  50% { rotate: 360deg; }
  100% { rotate: 360deg; }
}
```

**Toastify__trackProgress**
```css
@keyframes Toastify__trackProgress {
  0% { transform: scaleX(1); }
  100% { transform: scaleX(0); }
}
```

**Toastify__bounceInRight**
```css
@keyframes Toastify__bounceInRight {
  0%, 60%, 75%, 90%, 100% { animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }
  0% { opacity: 0; transform: translate(3000px); }
  60% { opacity: 1; transform: translate(-25px); }
  75% { transform: translate(10px); }
  90% { transform: translate(-5px); }
  100% { transform: none; }
}
```

**Toastify__bounceOutRight**
```css
@keyframes Toastify__bounceOutRight {
  20% { opacity: 1; transform: translate3d(-20px, var(--y), 0); }
  100% { opacity: 0; transform: translate3d(2000px, var(--y), 0); }
}
```

**Toastify__bounceInLeft**
```css
@keyframes Toastify__bounceInLeft {
  0%, 60%, 75%, 90%, 100% { animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }
  0% { opacity: 0; transform: translate(-3000px); }
  60% { opacity: 1; transform: translate(25px); }
  75% { transform: translate(-10px); }
  90% { transform: translate(5px); }
  100% { transform: none; }
}
```

**Toastify__bounceOutLeft**
```css
@keyframes Toastify__bounceOutLeft {
  20% { opacity: 1; transform: translate3d(20px, var(--y), 0); }
  100% { opacity: 0; transform: translate3d(-2000px, var(--y), 0); }
}
```

**Toastify__bounceInUp**
```css
@keyframes Toastify__bounceInUp {
  0%, 60%, 75%, 90%, 100% { animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }
  0% { opacity: 0; transform: translateY(3000px); }
  60% { opacity: 1; transform: translateY(-20px); }
  75% { transform: translateY(10px); }
  90% { transform: translateY(-5px); }
  100% { transform: translate(0px, 0px); }
}
```

**Toastify__bounceOutUp**
```css
@keyframes Toastify__bounceOutUp {
  20% { transform: translate3d(0, calc(var(--y) - 10px), 0); }
  40%, 45% { opacity: 1; transform: translate3d(0, calc(var(--y) + 20px), 0); }
  100% { opacity: 0; transform: translateY(-2000px); }
}
```

**Toastify__bounceInDown**
```css
@keyframes Toastify__bounceInDown {
  0%, 60%, 75%, 90%, 100% { animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }
  0% { opacity: 0; transform: translateY(-3000px); }
  60% { opacity: 1; transform: translateY(25px); }
  75% { transform: translateY(-10px); }
  90% { transform: translateY(5px); }
  100% { transform: none; }
}
```

## Component Patterns

Detected UI component patterns and their most common styles:

### Buttons (41 instances)

```css
.button {
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 600;
  padding-top: 0px;
  padding-right: 0px;
  border-radius: 12px;
}
```

### Inputs (2 instances)

```css
.input {
  color: rgb(255, 255, 255);
  border-color: rgb(38, 38, 38);
  border-radius: 0px;
  font-size: 14px;
  padding-top: 0px;
  padding-right: 0px;
}
```

### Links (46 instances)

```css
.link {
  color: rgb(242, 242, 242);
  font-size: 16px;
  font-weight: 400;
}
```

### Navigation (1 instances)

```css
.navigatio {
  color: rgb(242, 242, 242);
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 16px;
  padding-right: 16px;
  position: static;
}
```

### Footer (1 instances)

```css
.foote {
  color: rgb(255, 255, 255);
  padding-top: 24px;
  padding-bottom: 24px;
  font-size: 16px;
}
```

## Component Clusters

Reusable component instances grouped by DOM structure and style similarity:

### Input — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(38, 38, 38);
  font-size: 14px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(255, 255, 255, 0.1);
  color: rgb(255, 255, 255);
  padding: 10px 24px 10px 24px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 12px;
  font-weight: 300;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgba(255, 255, 255, 0.7);
  padding: 8px 8px 8px 8px;
  border-radius: 8px;
  border: 0px solid rgb(38, 38, 38);
  font-size: 16px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  padding: 12px 24px 12px 24px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 12px;
  font-weight: 300;
```

### Button — 11 instances, 1 variant

**Variant 1** (11 instances)

```css
  background: rgba(255, 255, 255, 0.4);
  color: rgb(242, 242, 242);
  padding: 0px 0px 0px 0px;
  border-radius: 9999px;
  border: 0px solid rgb(38, 38, 38);
  font-size: 16px;
  font-weight: 400;
```

### Button — 24 instances, 1 variant

**Variant 1** (24 instances)

```css
  background: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 12px;
  border: 0px solid rgb(38, 38, 38);
  font-size: 16px;
  font-weight: 600;
```

## Layout System

**1 grid containers** and **182 flex containers** detected.

### Container Widths

| Max Width | Padding |
|-----------|---------|
| 1280px | 0px |
| 100% | 0px |
| 576px | 0px |

### Grid Column Patterns

| Columns | Usage Count |
|---------|-------------|
| 4-column | 1x |

### Grid Templates

```css
grid-template-columns: 280px 280px 280px 280px;
gap: 16px;
```

### Flex Patterns

| Direction/Wrap | Count |
|----------------|-------|
| row/nowrap | 153x |
| column/nowrap | 28x |
| row/wrap | 1x |

**Gap values:** `12px`, `16px`, `24px`, `6px`, `8px`

## Accessibility (WCAG 2.1)

**Overall Score: 100%** — 0 passing, 0 failing color pairs

## Design System Score

**Overall: 93/100 (Grade: A)**

| Category | Score |
|----------|-------|
| Color Discipline | 100/100 |
| Typography Consistency | 90/100 |
| Spacing System | 100/100 |
| Shadow Consistency | 100/100 |
| Border Radius Consistency | 100/100 |
| Accessibility | 100/100 |
| CSS Tokenization | 100/100 |

**Strengths:** Tight, disciplined color palette, Consistent typography system, Well-defined spacing scale, Clean elevation system, Consistent border radii, Strong accessibility compliance, Good CSS variable tokenization

**Issues:**
- 150 !important rules — prefer specificity over overrides
- 94% of CSS is unused — consider purging
- 3796 duplicate CSS declarations

## Gradients

**5 unique gradients** detected.

| Type | Direction | Stops | Classification |
|------|-----------|-------|----------------|
| linear | 135deg | 4 | bold |
| linear | to right | 3 | bold |
| linear | to top | 3 | bold |
| linear | to top | 3 | bold |
| linear | 90deg | 3 | bold |

```css
background: linear-gradient(135deg, rgba(52, 211, 153, 0.45) 0%, rgba(16, 185, 129, 0.4) 35%, rgba(0, 185, 108, 0.45) 70%, rgba(5, 150, 105, 0.4) 100%);
background: linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5));
background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));
background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
background: linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(34, 197, 94, 0.25), rgba(0, 0, 0, 0));
```

## Z-Index Map

**5 unique z-index values** across 2 layers.

| Layer | Range | Elements |
|-------|-------|----------|
| sticky | 10,40 | main.r.e.l.a.t.i.v.e. .z.-.1.0. .w.-.f.u.l.l. .m.i.n.-.h.-.s.c.r.e.e.n. .f.l.e.x. .f.l.e.x.-.c.o.l. .o.v.e.r.f.l.o.w.-.x.-.h.i.d.d.e.n, div.a.b.s.o.l.u.t.e. .i.n.s.e.t.-.0. .z.-.1.0. .b.g.-.g.r.a.d.i.e.n.t.-.t.o.-.r. .f.r.o.m.-.b.l.a.c.k./.9.0. .v.i.a.-.b.l.a.c.k./.7.0. .t.o.-.b.l.a.c.k./.5.0, div.r.e.l.a.t.i.v.e. .z.-.1.0. .f.l.e.x.-.g.r.o.w. .p.x.-.4. .l.g.:.p.x.-.6. .p.b.-.8. .m.d.:.p.b.-.1.2 |
| base | 0,0 | div.a.b.s.o.l.u.t.e. .i.n.s.e.t.-.0. .z.-.0. .o.v.e.r.f.l.o.w.-.h.i.d.d.e.n |

## SVG Icons

**11 unique SVG icons** detected. Dominant style: **outlined**.

| Size Class | Count |
|------------|-------|
| xs | 5 |
| sm | 6 |

**Icon colors:** `currentColor`

## Font Files

| Family | Source | Weights | Styles |
|--------|--------|---------|--------|
| Rubik | self-hosted | 300 900 | italic, normal |

## Image Style Patterns

| Pattern | Count | Key Styles |
|---------|-------|------------|
| thumbnail | 26 | objectFit: contain, borderRadius: 0px, shape: square |
| general | 25 | objectFit: cover, borderRadius: 8px, shape: rounded |
| hero | 1 | objectFit: cover, borderRadius: 0px, shape: square |

**Aspect ratios:** 1:1 (26x), 3:4 (25x), 21:9 (1x)

## Motion Language

**Feel:** mixed · **Scroll-linked:** yes

### Duration Tokens

| name | value | ms |
|---|---|---|
| `xs` | `100ms` | 100 |
| `sm` | `200ms` | 200 |
| `md` | `300ms` | 300 |
| `lg` | `500ms` | 500 |
| `xl` | `1s` | 1000 |

### Easing Families

- **custom** (186 uses) — `cubic-bezier(0.4, 0, 0.2, 1)`
- **ease-in-out** (1 uses) — `ease`
- **ease-out** (24 uses) — `cubic-bezier(0, 0, 0.2, 1)`

## Component Anatomy

### button — 38 instances

**Slots:** label, icon
**Sizes:** xs · lg · xl

## Brand Voice

**Tone:** friendly · **Pronoun:** third-person · **Headings:** Title Case (tight)

### Top CTA Verbs

- **get** (24)
- **sign** (1)
- **view** (1)

### Button Copy Patterns

- "get tickets" (24×)
- "log in / sign up" (1×)
- "view event
→" (1×)

### Sample Headings

> CECC May Madness Texas - Day 2
> CECC May Madness Texas - Day 2
> Cage Titans 76
> CECC May Madness Texas - Day 3
> CECC May Madness Texas - Day 2
> CECC May Madness Texas - Day 2
> CECC May Madness Texas - Day 2
> Cage Titans 76
> CECC May Madness Texas - Day 3
> CECC May Madness Texas - Day 2

## Page Intent

**Type:** `landing` (confidence 0.45)

## Section Roles

Reading order (top→bottom): pricing-table → nav → pricing-table → footer

| # | Role | Heading | Confidence |
|---|------|---------|------------|
| 0 | nav | — | 0.9 |
| 1 | pricing-table | CECC May Madness Texas - Day 2 | 0.9 |
| 2 | pricing-table | CECC May Madness Texas - Day 2 | 0.9 |
| 3 | footer | Ticket Tree | 0.95 |

## Material Language

**Label:** `flat` (confidence 0)

| Metric | Value |
|--------|-------|
| Avg saturation | 0.145 |
| Shadow profile | soft |
| Avg shadow blur | 0px |
| Max radius | 9999px |
| backdrop-filter in use | no |
| Gradients | 5 |

## Imagery Style

**Label:** `mixed` (confidence 0)
**Counts:** total 52, svg 0, icon 27, screenshot-like 0, photo-like 0
**Dominant aspect:** square-ish
**Radius profile on images:** soft

## Component Library

**Detected:** `tailwindcss` (confidence 0.863)

Evidence:
- tailwind-like class density 82%

## Quick Start

To recreate this design in a new project:

1. **Install fonts:** Add `Times` from Google Fonts or your font provider
2. **Import CSS variables:** Copy `variables.css` into your project
3. **Tailwind users:** Use the generated `tailwind.config.js` to extend your theme
4. **Design tokens:** Import `design-tokens.json` for tooling integration
