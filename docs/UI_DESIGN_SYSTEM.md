# Beauty Parlor — UI Design System & Component Library

## 1. Aesthetic Vision & Brand Persona

The design system for **Beauty Parlor** rejects generic template styling (excessive bubble cards, oversaturated pink gradients, heavy drop shadows) in favor of **editorial high-fashion luxury**. 

Taking inspiration from premier botanical and cosmetic labels (**Aesop, Glossier, Chanel Beauty, and boutique wellness sanctuaries**), the interface pairs generous whitespace, disciplined typography, subtle champagne gold accents, and serene natural stone/linen textures.

```
+-------------------------------------------------------------------------+
| LUXURY EDITORIAL DESIGN SYSTEM                                          |
|                                                                         |
|  * Warm Natural Tones: Ivory, Bone Linen, Warm White, Espresso, Noir    |
|  * High-Fashion Serifs: Cormorant / Playfair for dramatic titles        |
|  * Modern Sans Body: Plus Jakarta Sans for crystal clarity             |
|  * Subtle Kinetic Polish: 60fps micro-motion with custom bezier curves  |
|  * Structural Elegance: Architectural dividers, soft 4px-8px radiuses   |
+-------------------------------------------------------------------------+
```

---

## 2. Color System & Design Tokens

Defined via CSS custom properties and extended in Tailwind CSS:

```css
:root {
  /* Surfaces & Backgrounds */
  --color-canvas: #FDFBF7;         /* Warm White base page canvas */
  --color-surface: #FAF8F5;        /* Soft Ivory section background */
  --color-surface-raised: #F4EFEB; /* Linen card background */
  --color-surface-hover: #EFECE6;  /* Interactive hover surface */
  --color-border: #E5DFD5;         /* Muted architectural border */
  --color-border-subtle: #EFECE6;  /* Ultra-soft hairline divider */

  /* Typography & Foreground */
  --color-fg-primary: #1A1A1A;     /* Charcoal Noir primary text */
  --color-fg-secondary: #4A3E3D;   /* Muted Espresso secondary text */
  --color-fg-muted: #7A6F6D;       /* Soft Taupe captions & hints */
  --color-fg-subtle: #A39996;      /* Disabled text & placeholders */

  /* Luxury Accents */
  --color-accent-gold: #C5A880;     /* Muted Champagne Gold */
  --color-accent-gold-dark: #A3855E;/* Deep Bronze Gold for hovers/pressed */
  --color-accent-gold-light: #F7F1E8;/* Gold tint for active tags & badges */
  --color-accent-blush: #F9ECE8;   /* Subtle botanical blush highlight */
  --color-accent-blush-border: #F0D9D3;

  /* Semantic Feedback */
  --color-success: #386641;        /* Muted Botanical Sage */
  --color-success-bg: #EBF4EC;
  --color-warning: #BC6C25;        /* Warm Amber */
  --color-warning-bg: #FDF4E7;
  --color-error: #9B2226;          /* Deep Terracotta Crimson */
  --color-error-bg: #FBEBEB;
}
```

---

## 3. Typography Hierarchy

### 3.1 Font Families
* **Display & Editorial Headings**: `font-serif` -> **Playfair Display** or **Cormorant Garamond**
* **Body, UI & Data Elements**: `font-sans` -> **Plus Jakarta Sans** or **Inter**

### 3.2 Scale & Rhythms
| Level | Font Size | Line Height | Tracking | Weight | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | 3.75rem (60px) / 5rem (80px)| 1.05 | -0.02em | Regular / Medium | Landing Page Hero |
| **Section Title**| 2.25rem (36px) / 3rem (48px)| 1.15 | -0.01em | Medium | Category & Featured Headers |
| **Subsection**   | 1.5rem (24px) / 1.75rem (28px)| 1.25 | 0.00em | Medium | Card Titles, Package Names |
| **Body Large**   | 1.125rem (18px) | 1.60 | 0.00em | Regular | Intro lead paragraphs |
| **Body Regular** | 1.000rem (16px) | 1.60 | 0.00em | Regular | Standard copy & descriptions |
| **UI Small**     | 0.875rem (14px) | 1.40 | +0.01em | Medium | Table cells, inputs, buttons |
| **Caption / Tag**| 0.750rem (12px) | 1.30 | +0.05em | Semibold (Uppercase)| Category tags, badges, timestamps |

---

## 4. Component Design Specifications

### 4.1 Button Hierarchy
* **Primary (Luxury Dark)**: Background `#1A1A1A`, Text `#FDFBF7`, 1px border `#1A1A1A`. Hover transitions smoothly to `#2C221E` with subtle 1px border highlight `#C5A880`.
* **Gold Champagne**: Background `#C5A880`, Text `#FFFFFF`, Hover `#A3855E`. Reserved for primary booking conversions and bridal packages.
* **Secondary (Outline)**: Transparent background, 1px border `#1A1A1A` or `#E5DFD5`, Text `#1A1A1A`. Hover shifts background to `#FAF8F5`.
* **Floating WhatsApp Button**: High-visibility bottom-right floating pill (`#25D366` or Champagne accent with WhatsApp badge) pre-populating context-aware messages.

### 4.2 Interactive Before / After Comparison Slider
* Dual-layer image container with an absolute-positioned top layer masked via CSS clip-path or width percentage.
* Central drag handle in Champagne Gold (`#C5A880`) with dual directional arrows.
* Smooth touch, mouse drag, and keyboard arrow key responsiveness.
* High-resolution photography with labeled "Before" and "After" pill tags in frosted glass (`backdrop-blur-md bg-white/70`).

### 4.3 8-Step Booking Wizard Layout
* **Desktop**: Split-screen architecture: Left column displays current step selection; Right sticky column displays dynamic booking summary receipt (Service, Beautician, Date/Time, Price, Deposit required, Loyalty points discount).
* **Mobile**: Single-column vertical flow with sticky bottom action bar displaying total advance deposit and step progression button ("Continue to Date" -> "Select Time" -> "Pay Deposit").

---

## 5. Kinetic & Animation System (Framer Motion)

### 5.1 Easing & Timing
* **Luxury Ease**: `cubic-bezier(0.16, 1, 0.3, 1)` (snappy entry with long, luxurious deceleration).
* **Durations**:
  - Micro-interactions (hover, taps, toggle switches): 150ms - 250ms.
  - Modal entries & drawer slides: 350ms - 400ms.
  - Page hero staggered reveals: 600ms - 800ms.

### 5.2 Accessibility / Reduced Motion
All animation wrappers check the `prefers-reduced-motion` media query using Framer Motion's `useReducedMotion()`. If enabled, position transforms (`y: 20 -> 0`) are disabled, falling back to clean opacity fades (`opacity: 0 -> 1`).
