# Design Language: Meet Your AI-Powered Growth Team // Graphite

> Extracted from `https://graphite.io` on May 14, 2026
> 427 elements analyzed

This document describes the complete design language of the website. It is structured for AI/LLM consumption — use it to faithfully recreate the visual design in any framework.

## Color Palette

### Primary Colors

| Role | Hex | RGB | HSL | Usage Count |
|------|-----|-----|-----|-------------|
| Primary | `#42ca80` | rgb(66, 202, 128) | hsl(147, 56%, 53%) | 5 |
| Secondary | `#0000ee` | rgb(0, 0, 238) | hsl(240, 100%, 47%) | 8 |

### Neutral Colors

| Hex | HSL | Usage Count |
|-----|-----|-------------|
| `#c4bcaa` | hsl(42, 18%, 72%) | 506 |
| `#fff9eb` | hsl(42, 100%, 96%) | 172 |
| `#000000` | hsl(0, 0%, 0%) | 140 |
| `#161616` | hsl(0, 0%, 9%) | 27 |
| `#7c776a` | hsl(43, 8%, 45%) | 20 |
| `#ffffff` | hsl(0, 0%, 100%) | 10 |
| `#333333` | hsl(0, 0%, 20%) | 5 |
| `#9b9b9b` | hsl(0, 0%, 61%) | 2 |

### Background Colors

Used on large-area elements: `#000000`

### Text Colors

Text color palette: `#000000`, `#c4bcaa`, `#ffffff`, `#7c776a`, `#0000ee`, `#fff9eb`

### Full Color Inventory

| Hex | Contexts | Count |
|-----|----------|-------|
| `#c4bcaa` | text, border | 506 |
| `#fff9eb` | text, border | 172 |
| `#000000` | text, border, background | 140 |
| `#161616` | background | 27 |
| `#7c776a` | text, border | 20 |
| `#ffffff` | text, border | 10 |
| `#0000ee` | text, border | 8 |
| `#42ca80` | background | 5 |
| `#333333` | background | 5 |
| `#9b9b9b` | border | 2 |

## Typography

### Font Families

- **Gesta** — used for all (306 elements)
- **JetBrains Mono** — used for body (36 elements)
- **Alliance No 2** — used for all (25 elements)

### Type Scale

| Size (px) | Size (rem) | Weight | Line Height | Letter Spacing | Used On |
|-----------|------------|--------|-------------|----------------|---------|
| 132.616px | 8.2885rem | 400 | 119.354px | normal | div, h2, strong |
| 88.353px | 5.5221rem | 400 | 94.5378px | normal | div, h1, strong |
| 51.367px | 3.2104rem | 400 | 66.7772px | normal | div, p, em, a |
| 46.5016px | 2.9064rem | 500 | 46.5016px | normal | div, h2, strong, p |
| 22.1313px | 1.3832rem | 500 | 22.1313px | normal | div |
| 15.5005px | 0.9688rem | 400 | normal | normal | html, head, style, meta |
| 13.9505px | 0.8719rem | 500 | 17.4381px | normal | a, div, img |
| 12.5554px | 0.7847rem | 400 | 15.0665px | normal | div |
| 9.30031px | 0.5813rem | 400 | 9.30031px | normal | div |

### Heading Scale

```css
h2 { font-size: 132.616px; font-weight: 400; line-height: 119.354px; }
h1 { font-size: 88.353px; font-weight: 400; line-height: 94.5378px; }
h2 { font-size: 46.5016px; font-weight: 500; line-height: 46.5016px; }
h2 { font-size: 15.5005px; font-weight: 400; line-height: normal; }
```

### Body Text

```css
body { font-size: 46.5016px; font-weight: 500; line-height: 46.5016px; }
```

### Font Weights in Use

`400` (386x), `500` (38x), `300` (3x)

## Spacing

**Base unit:** 2px

| Token | Value | Rem |
|-------|-------|-----|
| spacing-8 | 8px | 0.5rem |
| spacing-58 | 58px | 3.625rem |
| spacing-93 | 93px | 5.8125rem |
| spacing-115 | 115px | 7.1875rem |
| spacing-194 | 194px | 12.125rem |

## Border Radii

| Label | Value | Count |
|-------|-------|-------|
| sm | 4px | 4 |

## Box Shadows

**sm** — blur: 5px
```css
box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 5px 0px;
```

**md** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0.2) 8px 8px 0px 0px;
```

**lg** — blur: 0px
```css
box-shadow: rgb(124, 119, 106) 15px 15px 0px -7px;
```

## CSS Custom Properties

### Colors

```css
--_colors---neutral--black: black;
--_typography---fonts--secondary-font: Gesta, "Times New Roman", sans-serif;
--_colors---warm--w200: #c4bcaa;
--_components---button--border-radius: .25rem;
--_colors---primary--primary: #42ca80;
--_colors---neutral--n700: #161616;
--_colors---neutral--n300: #9b9b9b;
--_colors---primary--primary300: #2e8c59;
--_colors---neutral--n500: #333;
--_colors---neutral--n600: #1f1f1f;
--_colors---neutral--n200: #fff9eb;
--_components---input--border-raidus: .25rem;
--_colors---warm--w300: #7c776a;
--_typography---fonts--primary-font: "Alliance No 2", Georgia, sans-serif;
--_colors---neutral--n400: #606060;
--_colors---neutral--white: white;
--_colors---primary--primary200: #65ffaa;
--_colors---neutral--n900: #121212;
--_colors---warm--w100: #ddcfac;
--swiper-theme-color: #007aff;
```

### Spacing

```css
--_responsive---font-size--paragraph-body: var(--_space---space--4);
--_responsive---font-size--paragraph-l: clamp(1.25rem, calc((1.25 - ((1.5 - 1.25) / (var(--viewport-max)  - var(--viewport-min)) * var(--viewport-min))) * 1rem + ((1.5 - 1.25) / (var(--viewport-max)  - var(--viewport-min))) * 100vw), 1.5rem);
--_responsive---font-size--h2: clamp(1.375rem, calc((1.375 - ((3 - 1.375) / (80 - 20) * var(--viewport-min))) * 1rem + ((3 - 1.375) / (80 - 20)) * 100vw), 3rem);
--_responsive---font-size--h1: clamp(2.5rem, calc((2.5 - ((7 - 2.5) / (var(--viewport-max)  - var(--viewport-min)) * var(--viewport-min))) * 1rem + ((7 - 2.5) / (var(--viewport-max)  - var(--viewport-min))) * 100vw), 7rem);
--_responsive---font-size--h3: clamp(1.625rem, calc((1.625 - ((4 - 1.625) / (var(--viewport-max)  - var(--viewport-min)) * var(--viewport-min))) * 1rem + ((4 - 1.625) / (var(--viewport-max)  - var(--viewport-min))) * 100vw), 4rem);
--_responsive---font-size--h4: clamp(1.3rem, calc((1.3 - ((2.5 - 1.3) / (var(--viewport-max)  - var(--viewport-min)) * var(--viewport-min))) * 1rem + ((2.5 - 1.3) / (var(--viewport-max)  - var(--viewport-min))) * 100vw), 2.5rem);
--_responsive---font-size--cta: clamp(5rem, calc((5 - ((10 - 5) / (var(--viewport-max)  - var(--viewport-min)) * var(--viewport-min))) * 1rem + ((10 - 5) / (var(--viewport-max)  - var(--viewport-min))) * 100vw), 10rem);
--_components---button--padding: .75rem;
--_components---button--font-size: .9rem;
--_space---space--15: calc(var(--_space---space--1) * 15);
--_space---space--0: 0px;
--_space---section-space--xs: var(--_space---space--10);
--_components---input-label--font-size: 1rem;
--_components---input--padding: 1rem;
--_space---space--3: calc(var(--_space---space--1) * 3);
--_space---space--4: calc(var(--_space---space--1) * 4);
--_responsive---font-size--paragraph-m: clamp(1rem, calc((1 - ((1.25 - 1) / (var(--viewport-max)  - var(--viewport-min)) * var(--viewport-min))) * 1rem + ((1.25 - 1) / (var(--viewport-max)  - var(--viewport-min))) * 100vw), 1.25rem);
--_space---space--8: calc(var(--_space---space--1) * 8);
--_space---space--30: calc(var(--_space---space--1) * 30);
--_space---space--6: calc(var(--_space---space--1) * 6);
--_space---space--2: calc(var(--_space---space--1) * 2);
--_space---space--10: calc(var(--_space---space--1) * 10);
--_space---space--20: calc(var(--_space---space--1) * 20);
--_space---space--1: .25rem;
--_space---space--11: calc(var(--_space---space--1) * 11);
--_space---section-space--m: var(--_space---space--24);
--_space---space--60: calc(var(--_space---space--1) * 60);
--_space---space--24: calc(var(--_space---space--1) * 24);
--_space---space--38: calc(var(--_space---space--1) * 38);
--_responsive---padding--pad-x-fluid: clamp(1rem, calc((1 - ((10 - 1) / (var(--viewport-max)  - var(--viewport-min)) * var(--viewport-min))) * 1rem + ((10 - 1) / (var(--viewport-max)  - var(--viewport-min))) * 100vw), 10rem);
--_space---section-space--s: var(--_space---space--20);
--_space---section-space--xl: var(--_space---space--50);
--_space---space--50: calc(var(--_space---space--1) * 50);
--_space---space--18: calc(var(--_space---space--1) * 18);
--_space---space--12: calc(var(--_space---space--1) * 12);
--_space---space--28: calc(var(--_space---space--1) * 28);
--_space---space--36: calc(var(--_space---space--1) * 36);
--_space---space--48: calc(var(--_space---space--1) * 48);
--_space---section-space--l: var(--_space---space--48);
--_components---input--font-size: .87rem;
--swiper-navigation-size: 44px;
```

### Typography

```css
--_typography---paragraph--line-height: 1;
--_typography---paragraph--font: var(--_typography---fonts--secondary-font);
--_typography---h3--line-height: 1.3;
--_typography---h2--font: var(--_typography---fonts--primary-font);
--_typography---h2--font-weight: 500;
--_typography---h1--font: var(--_typography---fonts--primary-font);
--_typography---h1--line-height: 1.07;
--_typography---h1--font-weight: 400;
--_typography---h3--font: var(--_typography---fonts--tertiary-font);
--_typography---fonts--tertiary-font: "JetBrains Mono", sans-serif;
--_components---button--font: var(--_typography---fonts--secondary-font);
--_components---button--line-height: 1.25;
--_components---button--font-weight: 500;
--_components---input-label--font: var(--_typography---fonts--secondary-font);
--_components---input--font: var(--_typography---fonts--tertiary-font);
--_typography---h2--line-height: 1.2;
--_components---input-label--line-height: 1.25;
```

### Other

```css
--_layout---container--max-width: 85rem;
--_layout---container--max-width-quiz: 56rem;
--viewport-max: 108;
--viewport-min: 20;
```

### Dependencies

```css
--_responsive---font-size--paragraph-body: --_space---space--4;
--_typography---paragraph--font: --_typography---fonts--secondary-font;
--_responsive---font-size--paragraph-l: --viewport-max,--viewport-min,--viewport-min,--viewport-max,--viewport-min;
--_typography---h2--font: --_typography---fonts--primary-font;
--_responsive---font-size--h2: --viewport-min;
--_typography---h1--font: --_typography---fonts--primary-font;
--_responsive---font-size--h1: --viewport-max,--viewport-min,--viewport-min,--viewport-max,--viewport-min;
--_typography---h3--font: --_typography---fonts--tertiary-font;
--_responsive---font-size--h3: --viewport-max,--viewport-min,--viewport-min,--viewport-max,--viewport-min;
--_responsive---font-size--h4: --viewport-max,--viewport-min,--viewport-min,--viewport-max,--viewport-min;
--_responsive---font-size--cta: --viewport-max,--viewport-min,--viewport-min,--viewport-max,--viewport-min;
--_components---button--font: --_typography---fonts--secondary-font;
--_space---space--15: --_space---space--1;
--_space---section-space--xs: --_space---space--10;
--_components---input-label--font: --_typography---fonts--secondary-font;
--_components---input--font: --_typography---fonts--tertiary-font;
--_space---space--3: --_space---space--1;
--_space---space--4: --_space---space--1;
--_responsive---font-size--paragraph-m: --viewport-max,--viewport-min,--viewport-min,--viewport-max,--viewport-min;
--_space---space--8: --_space---space--1;
--_space---space--30: --_space---space--1;
--_space---space--6: --_space---space--1;
--_space---space--2: --_space---space--1;
--_space---space--10: --_space---space--1;
--_space---space--20: --_space---space--1;
--_space---space--11: --_space---space--1;
--_space---section-space--m: --_space---space--24;
--_space---space--60: --_space---space--1;
--_space---space--24: --_space---space--1;
--_space---space--38: --_space---space--1;
--_responsive---padding--pad-x-fluid: --viewport-max,--viewport-min,--viewport-min,--viewport-max,--viewport-min;
--_space---section-space--s: --_space---space--20;
--_space---section-space--xl: --_space---space--50;
--_space---space--50: --_space---space--1;
--_space---space--18: --_space---space--1;
--_space---space--12: --_space---space--1;
--_space---space--28: --_space---space--1;
--_space---space--36: --_space---space--1;
--_space---space--48: --_space---space--1;
--_space---section-space--l: --_space---space--48;
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
| sm | 479px | max-width |
| md | 767px | max-width |
| md | 768px | min-width |
| lg | 991px | max-width |
| 1440px | 1440px | max-width |
| 1920px | 1920px | max-width |

## Transitions & Animations

**Durations:** `0.2s`, `0.3s`

### Common Transitions

```css
transition: all;
transition: 0.2s;
transition: opacity 0.3s;
```

### Keyframe Animations

**spin**
```css
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

**tab-fade-in**
```css
@keyframes tab-fade-in {
  0% { opacity: 0; transform: translateY(6px); }
  100% { opacity: 1; transform: none; }
}
```

## Component Patterns

Detected UI component patterns and their most common styles:

### Buttons (9 instances)

```css
.button {
  background-color: rgb(66, 202, 128);
  color: rgb(196, 188, 170);
  font-size: 15.5005px;
  font-weight: 500;
  padding-top: 0px;
  padding-right: 0px;
  border-radius: 0px;
}
```

### Cards (64 instances)

```css
.card {
  background-color: rgb(22, 22, 22);
  border-radius: 0px;
  padding-top: 15.5005px;
  padding-right: 0px;
}
```

### Links (16 instances)

```css
.link {
  color: rgb(196, 188, 170);
  font-size: 15.5005px;
  font-weight: 500;
}
```

### Navigation (5 instances)

```css
.navigatio {
  color: rgb(196, 188, 170);
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  position: static;
}
```

### Footer (6 instances)

```css
.foote {
  color: rgb(196, 188, 170);
  padding-top: 0px;
  padding-bottom: 0px;
  font-size: 15.5005px;
}
```

### Dropdowns (11 instances)

```css
.dropdown {
  background-color: rgb(0, 0, 0);
  border-radius: 0px;
  border-color: rgb(196, 188, 170);
  padding-top: 0px;
}
```

### Tabs (16 instances)

```css
.tab {
  background-color: rgb(51, 51, 51);
  color: rgb(255, 249, 235);
  font-size: 15.5005px;
  font-weight: 400;
  padding-top: 0px;
  padding-right: 0px;
  border-color: rgb(255, 249, 235);
  border-radius: 0px;
}
```

## Component Clusters

Reusable component instances grouped by DOM structure and style similarity:

### Button — 3 instances, 1 variant

**Variant 1** (3 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(196, 188, 170);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(196, 188, 170);
  font-size: 15.5005px;
  font-weight: 400;
```

### Button — 3 instances, 1 variant

**Variant 1** (3 instances)

```css
  background: rgb(66, 202, 128);
  color: rgb(0, 0, 0);
  padding: 11.6254px 11.6254px 11.6254px 11.6254px;
  border-radius: 3.87513px;
  border: 0px none rgb(0, 0, 0);
  font-size: 13.9505px;
  font-weight: 500;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgb(66, 202, 128);
  color: rgb(0, 0, 238);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 238);
  font-size: 15.5005px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(196, 188, 170);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(196, 188, 170);
  font-size: 15.5005px;
  font-weight: 400;
```

### Button — 5 instances, 1 variant

**Variant 1** (5 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 249, 235);
  padding: 0px 23.2508px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(255, 249, 235);
  font-size: 15.5005px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgb(66, 202, 128);
  color: rgb(0, 0, 0);
  padding: 11.6254px 11.6254px 11.6254px 11.6254px;
  border-radius: 4px;
  border: 0px none rgb(0, 0, 0);
  font-size: 13.9505px;
  font-weight: 500;
```

### Card — 32 instances, 2 variants

**Variant 1** (5 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(196, 188, 170);
  padding: 15.5005px 0px 15.5005px 0px;
  border-radius: 0px;
  border: 6px 0px 0px solid none none rgb(124, 119, 106) rgb(196, 188, 170) rgb(51, 51, 51);
  font-size: 22.1313px;
  font-weight: 500;
```

**Variant 2** (27 instances)

```css
  background: rgb(22, 22, 22);
  color: rgb(196, 188, 170);
  padding: 15.5005px 15.5005px 15.5005px 15.5005px;
  border-radius: 0px;
  border: 0px none rgb(196, 188, 170);
  font-size: 9.30031px;
  font-weight: 400;
```

### Card — 32 instances, 1 variant

**Variant 1** (32 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(196, 188, 170);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(196, 188, 170);
  font-size: 22.1313px;
  font-weight: 500;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(196, 188, 170);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(196, 188, 170);
  font-size: 15.5005px;
  font-weight: 400;
```

### Button — 5 instances, 1 variant

**Variant 1** (5 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(196, 188, 170);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(196, 188, 170);
  font-size: 15.5005px;
  font-weight: 500;
```

## Layout System

**13 grid containers** and **75 flex containers** detected.

### Container Widths

| Max Width | Padding |
|-----------|---------|
| 1317.54px | 0px |
| 100% | 0px |
| 800px | 0px |

### Grid Column Patterns

| Columns | Usage Count |
|---------|-------------|
| 5-column | 8x |
| 1-column | 3x |
| 3-column | 1x |
| 2-column | 1x |

### Grid Templates

```css
grid-template-columns: 1050.59px;
gap: 15.5005px;
grid-template-columns: 1050.59px;
grid-template-columns: 832px;
gap: 58.127px;
grid-template-columns: 339.531px 339.531px 339.531px;
gap: 16px;
grid-template-columns: 197.719px 197.719px 197.719px 197.719px 197.719px;
gap: 7.75026px 15.5005px;
```

### Flex Patterns

| Direction/Wrap | Count |
|----------------|-------|
| row/nowrap | 59x |
| column/nowrap | 16x |

**Gap values:** `11.6254px`, `15.5005px`, `16px`, `23.2508px`, `31.001px`, `38.7513px`, `58.127px`, `7.75026px`, `7.75026px 15.5005px`, `93.0031px`, `normal 23.2508px`, `normal 31.001px`

## Accessibility (WCAG 2.1)

**Overall Score: 100%** — 0 passing, 0 failing color pairs

## Design System Score

**Overall: 89/100 (Grade: B)**

| Category | Score |
|----------|-------|
| Color Discipline | 100/100 |
| Typography Consistency | 80/100 |
| Spacing System | 85/100 |
| Shadow Consistency | 100/100 |
| Border Radius Consistency | 100/100 |
| Accessibility | 100/100 |
| CSS Tokenization | 100/100 |

**Strengths:** Tight, disciplined color palette, Well-defined spacing scale, Clean elevation system, Consistent border radii, Strong accessibility compliance, Good CSS variable tokenization

**Issues:**
- 80 !important rules — prefer specificity over overrides
- 96% of CSS is unused — consider purging
- 22558 duplicate CSS declarations

## Z-Index Map

**4 unique z-index values** across 3 layers.

| Layer | Range | Elements |
|-------|-------|----------|
| modal | 9999,9999 | section.s.e.c.t.i.o.n._.m.e.n.u |
| dropdown | 100,100 | a.v.i.d.e.o.-.t.h.u.m.b.n.a.i.l._.w.r.a.p.p.e.r. .w.-.v.a.r.i.a.n.t.-.5.9.3.e.b.8.1.b.-.6.f.6.9.-.e.4.3.d.-.0.5.1.b.-.8.3.e.4.7.4.1.0.0.3.1.2 |
| sticky | 10,11 | img.v.i.d.e.o.-.t.h.u.m.b.n.a.i.l, div.v.i.d.e.o.-.b.u.t.t.o.n. .w.-.v.a.r.i.a.n.t.-.5.9.3.e.b.8.1.b.-.6.f.6.9.-.e.4.3.d.-.0.5.1.b.-.8.3.e.4.7.4.1.0.0.3.1.2 |

## SVG Icons

**6 unique SVG icons** detected. Dominant style: **filled**.

| Size Class | Count |
|------------|-------|
| lg | 1 |
| xl | 5 |

**Icon colors:** `currentColor`, `white`, `currentcolor`

## Font Files

| Family | Source | Weights | Styles |
|--------|--------|---------|--------|
| webflow-icons | self-hosted | normal | normal |
| Alliance No 2 | self-hosted | 400, 500, 600 | normal |
| Gesta | self-hosted | 400, 500 | normal |
| JetBrains Mono | google-fonts | 300, 400, 500, 600, 700 | normal |
| swiper-icons | self-hosted | 400 | normal |

**Google Fonts URL:** `https://fonts.googleapis.com/`

## Image Style Patterns

| Pattern | Count | Key Styles |
|---------|-------|------------|
| thumbnail | 3 | objectFit: contain, borderRadius: 0px, shape: square |
| hero | 1 | objectFit: cover, borderRadius: 0px, shape: square |
| gallery | 1 | objectFit: fill, borderRadius: 0px, shape: square |
| general | 1 | objectFit: fill, borderRadius: 0px, shape: square |

**Aspect ratios:** 9:16 (2x), 4.31:1 (1x), 16:9 (1x), 21:9 (1x), 2.83:1 (1x)

## Motion Language

**Feel:** mixed · **Scroll-linked:** yes

### Duration Tokens

| name | value | ms |
|---|---|---|
| `sm` | `200ms` | 200 |
| `md` | `300ms` | 300 |

### Keyframes In Use

| name | kind | properties | uses |
|---|---|---|---|
| `tab-fade-in` | slide-y | opacity, transform | 1 |

## Component Anatomy

### card — 64 instances

**Slots:** description

### button — 20 instances

**Slots:** label
**Variants:** link
**Sizes:** medium

| variant | count | sample label |
|---|---|---|
| default | 15 | START GROWING |
| link | 5 | Careers |

## Brand Voice

**Tone:** friendly · **Pronoun:** we-only · **Headings:** Sentence case (balanced)

### Top CTA Verbs

- **start** (4)
- **let's** (3)
- **careers** (1)
- **linkedin** (1)
- **terms** (1)
- **privacy** (1)
- **cookie** (1)

### Button Copy Patterns

- "start growing" (4×)
- "let's chat" (3×)
- "careers" (1×)
- "linkedin" (1×)
- "terms" (1×)
- "privacy" (1×)
- "cookie policy" (1×)

### Sample Headings

> Meet Your AI-Powered Growth Team
> We like charts.
> Reproducible results are the best predictor of future success.

## Page Intent

**Type:** `landing` (confidence 0.29)
**Description:** We help companies with AEO, SEO, programmatic, content strategy, and growth design.

Alternates: legal (0.4)

## Section Roles

Reading order (top→bottom): content → hero → content → content → content → content → content

| # | Role | Heading | Confidence |
|---|------|---------|------------|
| 0 | content | — | 0.3 |
| 1 | hero | Meet Your AI-Powered Growth Team | 0.85 |
| 2 | content | — | 0.3 |
| 3 | content | We like charts. | 0.3 |
| 4 | content | — | 0.3 |
| 5 | content | — | 0.3 |
| 6 | content | — | 0.3 |

## Material Language

**Label:** `flat` (confidence 0)

| Metric | Value |
|--------|-------|
| Avg saturation | 0.203 |
| Shadow profile | soft |
| Avg shadow blur | 0px |
| Max radius | 4px |
| backdrop-filter in use | no |
| Gradients | 0 |

## Imagery Style

**Label:** `photography` (confidence 0.25)
**Counts:** total 6, svg 3, icon 2, screenshot-like 0, photo-like 3
**Dominant aspect:** ultra-wide
**Radius profile on images:** square

## Quick Start

To recreate this design in a new project:

1. **Install fonts:** Add `Gesta` from Google Fonts or your font provider
2. **Import CSS variables:** Copy `variables.css` into your project
3. **Tailwind users:** Use the generated `tailwind.config.js` to extend your theme
4. **Design tokens:** Import `design-tokens.json` for tooling integration
