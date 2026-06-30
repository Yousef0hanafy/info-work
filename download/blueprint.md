# Infeworks — Ultimate Product & Brand Blueprint

> **Version**: 1.0 | **Date**: July 2026 | **Classification**: Internal — AI Agent Context Document
>
> This document is the single source of truth for any AI coding agent (Lovable, Bolt, v0, Cursor, etc.) building or modifying the Infeworks digital platform. It contains the full business logic, screen-by-screen flow, brand identity system, and market positioning. Treat this as the product spec.

---

## Table of Contents

1. [Executive Summary & Business Logic](#1-executive-summary--business-logic)
2. [Platform Architecture & Screen-by-Screen Flow](#2-platform-architecture--screen-by-screen-flow)
3. [The New Digital-First Brand Identity](#3-the-new-digital-first-brand-identity)
4. [Market Fit & Competitor Advantage](#4-market-fit--competitor-advantage)
5. [Appendix: Technical Implementation Notes](#5-appendix-technical-implementation-notes)

---

## 1. Executive Summary & Business Logic

### What is this platform?

**Infeworks** (domain: `infeworks.com`) is the digital presence of **International for Engineering Works** — an Egyptian EPC (Engineering, Procurement, Construction) contractor headquartered in Naser City, Cairo. The company operates at the intersection of **water/wastewater treatment infrastructure**, **electromechanical systems**, and **civil construction**.

The platform is **not** a SaaS product or a digital tool. It is a **B2B corporate website** that serves as the primary lead-generation and brand-awareness channel for a traditional engineering firm that builds physical infrastructure — water treatment plants, HVAC systems, fire fighting installations, and civil works across Egypt and the wider MENA region.

**Critical Context for AI Agents**: The brand identity system (logo, color palette, typography) was designed with a **digital/tech-forward aesthetic** — dark navy backgrounds, neon cyan accents, futuristic card layouts — but the **actual business is a brick-and-mortar engineering contractor**. Any code you generate must bridge this gap: the visual language should feel modern and tech-savvy while the content and user flows must serve a construction/engineering audience (project managers, government procurement officers, industrial facility owners).

**Registered Name**: International for Engineering Works
**Legal Entity**: Egyptian joint-stock company (شركة مساهمة)
**Domain**: infeworks.com
**Current CMS**: WordPress (Astra theme) — **to be replaced** with a modern framework (Next.js recommended)
**Physical Address**: 313 Zahraa, Naser City, Cairo, Egypt
**Phone**: +20 100 624 9420 / +20 111 866 0042
**Email**: info@infeworks.com

### Target Audience

| Segment | Description | Pain Points | How They Find Infeworks |
|---|---|---|---|
| **Government & Municipal Procurement Officers** | Egyptian government agencies (New Administrative Capital, Egyptian Armed Forces, governorate water authorities) seeking EPC contractors for water/infrastructure projects | Need certified, experienced contractors with proven track record; long procurement cycles; compliance requirements | Industry events (WATREX), direct referrals, Google search for "water treatment contractors Egypt" |
| **Industrial Facility Managers** | Factory owners, food processing plants, oil & gas facilities needing wastewater treatment, HVAC, or fire fighting systems | Downtime costs from water system failures; need turnkey solutions (design → build → operate); regulatory compliance | Google search, industry directories, LinkedIn |
| **Real Estate Developers** | Companies building residential compounds, commercial towers needing water treatment, fire fighting, HVAC infrastructure | Must meet building code requirements; need reliable electromechanical subcontractors; multi-project coordination | Construction industry networks, referrals |
| **International Partners / Investors** | MENA-wide water technology firms looking for Egyptian EPC partners or market entry | Need local partner with engineering capacity; want transparent processes; bilingual communication | Trade events, LinkedIn, embassy trade offices |
| **Engineering Consultants** | Design firms that specify subcontractors for electromechanical and water treatment scope | Need subcontractors who follow specifications accurately; competitive pricing; schedule adherence | Professional networks, past project collaboration |

### Core Value Proposition

**Infeworks bridges the gap between complex engineering execution and modern project management.** The company delivers turnkey solutions across three interconnected pillars:

1. **Water & Wastewater Treatment** — Design, supply, installation, and commissioning of water treatment plants, sewage treatment systems, industrial wastewater processing, UV filtration, and desalination support. This is the company's primary differentiator and revenue driver.

2. **Electromechanical Systems** — HVAC (heating, ventilation, air conditioning), fire fighting systems (wet/dry risers, sprinkler systems, FM200), steam and ventilation systems, and complete electrical panel engineering.

3. **Civil & Infrastructure Construction** — Excavation, earthworks, concrete works, road construction, and building structural works. This is the supporting capability that enables the company to deliver full EPC packages (not just equipment supply).

**Why clients choose Infeworks over competitors:**
- **Single-source responsibility**: One contract covers design + procurement + construction + commissioning (EPC model), eliminating multi-vendor coordination headaches.
- **Cross-disciplinary capability**: The combination of water treatment expertise + electromechanical + civil works under one roof is rare in the Egyptian market. Most competitors specialize in only one domain.
- **15+ years of project history**: The website testimonials reference 5+ year relationships, indicating deep industry roots and repeat business.
- **MENA market coverage**: While based in Egypt, the company's capabilities (modular treatment units, containerized systems) are scalable to Gulf markets where water infrastructure demand is exploding ($2.04B → $4.72B by 2033).

### Business Model Summary

| Aspect | Detail |
|---|---|
| **Revenue Model** | Project-based (fixed-price or cost-plus contracts). Revenue per project typically ranges from $50K–$2M+ depending on scope. |
| **Sales Cycle** | 3–18 months for government/industrial projects. Includes tender submission → technical evaluation → commercial negotiation → contract award → execution. |
| **Delivery Model** | EPC (Engineering, Procurement, Construction). The company manages the full lifecycle from design through commissioning. |
| **Geographic Focus** | Primary: Egypt (Cairo, Delta, New Administrative Capital, Sinai). Secondary: MENA region (Saudi Arabia, UAE, Oman via partnerships). |
| **Key Cost Drivers** | Equipment procurement (UV filters, pumps, blowers, membranes, electrical panels from European/Chinese OEMs), labor, concrete/steel materials, project management overhead. |
| **Profit Margins** | Typical EPC margins in Egyptian water sector: 15–25% depending on project complexity and contract structure. |

---

## 2. Platform Architecture & Screen-by-Screen Flow

### Current Site Structure (WordPress — To Be Replaced)

The existing website is a **single-page WordPress site** built with the Astra theme. All content loads on one long-scrolling page with anchor-link navigation. There are **no separate routed pages** — the URLs for `/our-services/`, `/our-clients/`, etc. return **404 errors**. The entire site is one page.

**Navigation Items (Top Bar):**
1. Our Services
2. Chairman Talk
3. Our Work (dropdown: Water & Wastewater Treatment Projects | Sewage Treatment Projects | Construction Works)
4. Testimonial
5. Our Clients
6. Contact Us

**Social Links (Header):** Facebook, LinkedIn

### Screen-by-Screen Breakdown

---

#### Screen 1: Hero Section (Above the Fold)

**Current State:**
- Full-width hero image showing a **construction site with workers** (industrial/construction photography)
- Company name overlaid in bold uppercase text: "INTERNATIONAL FOR ENGINEERING WORKS"
- No headline or value proposition statement
- No CTA button
- Navigation bar above hero with dark background

**Functional Requirements for Rebuild:**
- **Hero Headline**: Must communicate the value proposition in under 5 seconds. Recommended: "Engineering Water Intelligence — From Design to Commissioning" or equivalent outcome-oriented headline.
- **Sub-headline**: Brief description of the EPC service model. 1–2 sentences maximum.
- **Primary CTA**: "Request a Project Consultation" (links to contact form with pre-filled context).
- **Secondary CTA**: "View Our Projects" (scrolls to portfolio section).
- **Background**: Use a combination of abstract water-tech visualization (animated particles or gradient mesh) with real project photography as a secondary layer. Dark mode background (#0B1120) with cyan accent (#3B82F6) glow effects.
- **Badge/Trust Signal**: "15+ Years of Engineering Excellence" or "200+ Projects Delivered" badge in the top-right corner.
- **Responsive Behavior**: On mobile (<768px), stack headline/sub-headline vertically, reduce hero image to 60% opacity overlay, make CTAs full-width.

**Components:**
```
<Navbar /> — Fixed top, dark background, logo left, nav links center, CTA button right
<HeroSection /> — Full viewport height, gradient mesh background, headline, sub-headline, dual CTAs, trust badge
<ScrollIndicator /> — Subtle animated down-arrow at bottom of hero
```

---

#### Screen 2: Services Section

**Current State:**
- Two columns under "Our Services":
  - **Left column (Supplier)**: Lists equipment categories — Metal compact works, UV filtration unit, Pumps, Air blowers, Pipes & connecting parts, Air diffusers, Multimedia filters, Cartridge filters, Green sand filters, Electrical panels. Displayed as a plain text list with no descriptions or images.
  - **Right column (Construction Projects Management)**: Lists capabilities — Design for water & sewage treatment stations, HVAC & fire fighting systems, Steam & ventilation system, Drawings (2D, 3D), Cost estimation, Implementation supervision, Electromechanical works, Infrastructure works, Civil workings. Also plain text with no visual hierarchy.
- No images, icons, or visual differentiation between services
- No CTA per service

**Functional Requirements for Rebuild:**
This section must be **redesigned as a service grid** with icon-based cards, each linking to a dedicated service detail page.

**Service Card Components (6–8 cards in a responsive grid):**

| Card # | Service Name | Icon Type | Short Description | CTA |
|---|---|---|---|---|
| 1 | Water Treatment Plants | Droplet/Tank | Complete design, construction, and commissioning of potable water treatment systems — filtration, desalination, disinfection, and distribution. | Learn More → |
| 2 | Wastewater & Sewage Treatment | Recycling Arrows | Industrial and municipal sewage treatment plants — biological treatment, membrane systems, and effluent compliance. | Learn More → |
| 3 | HVAC Systems | Wind/Temperature | Heating, ventilation, and air conditioning engineering for commercial, industrial, and residential buildings. | Learn More → |
| 4 | Fire Fighting Systems | Shield/Flame | Complete fire suppression systems — sprinklers, wet/dry risers, FM200, hose reels, and fire alarm integration. | Learn More → |
| 5 | Electromechanical Works | Circuit/Gear | Full-scope electromechanical contracting — electrical panels, power distribution, control systems, and instrumentation. | Learn More → |
| 6 | Civil & Infrastructure | Building/Crane | Excavation, earthworks, concrete construction, road works, and structural engineering for water infrastructure projects. | Learn More → |
| 7 | Equipment Supply | Box/Package | Procurement and supply of specialized equipment — UV filters, pumps, blowers, membranes, pipes, air diffusers, and electrical panels from certified OEMs. | Learn More → |
| 8 | Design & Consultation | Blueprint/Pencil | 2D/3D engineering drawings, cost estimation, feasibility studies, and technical consultation for water and electromechanical projects. | Learn More → |

**Each Service Card Must Include:**
- SVG icon (custom, not generic) in the brand's cyan accent color
- Service name (bold, heading)
- 2–3 line description
- "Learn More →" text link (not a button — buttons are reserved for primary CTAs)
- Hover state: subtle border glow in cyan (#3B82F6 at 20% opacity), slight translateY(-2px) lift
- Card background: Dark mode surface (#1A2332), border: #2D3B4F, border-radius: 12px

**Responsive Grid:**
- Desktop (≥1280px): 4 columns
- Tablet (768–1279px): 2 columns
- Mobile (<768px): 1 column, stacked

**Components:**
```
<ServicesSection /> — Section wrapper with heading "What We Engineer"
<ServiceGrid /> — CSS Grid/Flex layout containing service cards
<ServiceCard /> — Individual card with icon, title, description, CTA link
```

---

#### Screen 3: Chairman Talk Section

**Current State:**
- Section titled "Chairman Talk"
- Quote text: "They always say that 'many parts bring a company together', but we believe that the greatest strength and most valuable resource has always been its people who dare to dream and do things uniquely different and we believe that we can make the dream comes true"
- Signature: "Eng. / Houssien Derbaze — Chairman"
- Simple text layout, no photo, no visual framing

**Functional Requirements for Rebuild:**
- **Redesign as a leadership/credibility section** rather than a traditional "Chairman's Message" block.
- Use a **split layout**: Left side = chairman's professional photo (or silhouette with brand overlay if photo unavailable), Right side = quote text with quotation marks styled in the brand's cyan accent.
- Keep the quote but clean up the grammar (fix "comes true" typo, tighten the phrasing).
- Add credibility markers below the quote: "15+ Years in Water Engineering | 200+ Projects Delivered | Egypt & MENA"
- Optional: Add a brief chairman bio (2–3 sentences about engineering background).
- Background: Slightly lighter dark surface (#0F172A) to create visual separation from adjacent sections.
- Border-left on the quote block: 3px solid #3B82F6 (brand accent).

**Components:**
```
<ChairmanSection /> — Section wrapper with "Leadership" or "From the Chairman" heading
<QuoteBlock /> — Styled blockquote with signature and credibility badges
<CredibilityBadges /> — Row of stat badges (years, projects, regions)
```

---

#### Screen 4: Projects Portfolio Section

**Current State:**
- Three sub-sections with "See all Projects" links:
  1. **Water and Waste Water Treatment Projects** — Image gallery of water treatment plants (tanks, pipes, filtration systems on-site)
  2. **Sewage Treatment Projects** — Image gallery of sewage treatment installations
  3. **Construction Works** — Image gallery of civil/construction projects
- Each sub-section displays 3–4 project images in a simple grid
- No project descriptions, no metrics, no client names, no dates
- "See all Projects" links appear broken (return 404)

**Functional Requirements for Rebuild:**
This must become a **filterable project portfolio** with project detail cards, not just image galleries.

**Project Card Component:**
Each project card should display:
- Project thumbnail image (real site photography, minimum 600x400px)
- Project name/title (e.g., "Industrial Wastewater Treatment Plant — Sharqia Governorate")
- Project category tag (Water Treatment | Sewage Treatment | Civil Works | Electromechanical)
- Key metric badges (e.g., "Capacity: 500 m³/day" | "Duration: 8 months" | "Status: Completed")
- Client name (optional — some clients may be confidential)
- Hover state: overlay with "View Details" button

**Filtering System:**
- Horizontal filter bar at top: "All Projects" | "Water Treatment" | "Sewage Treatment" | "HVAC" | "Fire Fighting" | "Civil Works"
- Active filter: filled background in accent color (#3B82F6)
- Inactive: transparent with border (#2D3B4F)
- Filtering should animate cards in/out (CSS transitions, fade + scale)

**Project Detail Page (NEW — does not exist on current site):**
Each project should have a dedicated detail page with:
- Hero image gallery (3–5 images with lightbox)
- Project overview (2–3 paragraphs describing scope, challenges, and solution)
- Technical specifications table (capacity, technology used, equipment supplied, treatment process)
- Key metrics panel (project value, timeline, team size, compliance standards met)
- Client testimonial (if available)
- "Start a Similar Project" CTA button → links to contact form

**Components:**
```
<ProjectsSection /> — Section wrapper with "Our Projects" heading and filter bar
<ProjectFilter /> — Horizontal tab-style filter bar
<ProjectGrid /> — Responsive grid of project cards
<ProjectCard /> — Thumbnail, title, category tag, metrics, hover overlay
<ProjectDetailPage /> — Full project detail (separate route)
<ProjectGallery /> — Image gallery with lightbox
<TechSpecsTable /> — Technical specifications table
```

---

#### Screen 5: Testimonials Section

**Current State:**
- Section titled "Testimonial" with sub-headline "Don't take our word for it, hear what our happy clients have to say"
- Three testimonials in **Arabic only**, from:
  1. **Col. Nasser Fared Salem** — Manager, Automated Slaughterhouse, Shobra Shahab — Describes collaboration on building a collection tank and industrial sewage station inside the slaughterhouse, praises professionalism and speed.
  2. **Hany Abbas** — Contractor — Describes 5+ years of collaboration on excavation, backfilling, concrete works, and finishing works; praises adherence to schedule and financial commitments.
  3. **Eng. Naser Hafny** — Consulting Engineer — Selected Infeworks for sewage/water projects based on experience; praises quality execution, timely delivery, and addressing all observations.
- All testimonials are plain text blocks, no photos, no star ratings, no attribution styling.

**Functional Requirements for Rebuild:**
- **Add bilingual support**: Each testimonial should appear in both Arabic and English (Arabic primary, English secondary or toggle).
- **Add credibility markers**: Client title/role, organization name, project type tag.
- **Visual enhancement**: Testimonial cards with subtle left-border accent (#3B82F6), client avatar placeholder (initials in a circle if no photo), quotation mark icon in brand color.
- **Carousel on mobile**: On mobile viewport, testimonials should be horizontally scrollable or in a swipeable carousel (3 slides minimum).
- **Add star rating**: 5-star visual rating on each testimonial.
- **Consider adding 1–2 English testimonials** for international audience credibility.

**Components:**
```
<TestimonialsSection /> — Section wrapper with "Client Testimonials" heading
<TestimonialCarousel /> — Desktop: 3-column grid; Mobile: horizontal carousel
<TestimonialCard /> — Quote text, attribution, role, organization, star rating, project tag
```

---

#### Screen 6: Our Clients / Suppliers Section

**Current State:**
- Section titled "Our Clients" with sub-heading "our supplier"
- Shows **logo grid** of supplier/partner companies
- Logos include equipment manufacturers and material suppliers (the actual company names are not visible in the text extraction — they appear as images only)
- No distinction between "Clients" and "Suppliers" — the heading says "Our Clients" but the sub-heading says "our supplier", which is confusing

**Functional Requirements for Rebuild:**
- **Separate into two sub-sections**: "Trusted By" (clients) and "Our Technology Partners" (suppliers/OEMs)
- **Client logos**: Display in a clean, monochrome or desaturated grid with grayscale → color on hover effect
- **Partner logos**: Display with a small caption under each (e.g., "Official Distributor — UV Filtration Systems")
- **Add credibility section**: "Certifications & Compliance" badges (ISO, local contractor licensing, etc.) — if available
- **Responsive**: 4–6 logos per row on desktop, 2–3 on tablet, 2 on mobile

**Components:**
```
<ClientsSection /> — Section wrapper with "Trusted By Industry Leaders" heading
<ClientLogoGrid /> — Responsive grid of client logos with hover effects
<PartnersSection /> — Section wrapper for technology partners/OEMs
<PartnerLogoGrid /> — Responsive grid with captions
<CertificationsBadges /> — Row of certification/compliance badges (if applicable)
```

---

#### Screen 7: Contact Section

**Current State:**
- Section titled "Contact Us" with sub-heading "Get In Touch"
- Three contact methods: Two phone numbers (+20 100 624 9420, +20 111 866 0042), email (info@infeworks.com), address (313 Zahraa, Naser City, Cairo)
- **Contact form** with three fields only: Name, Email, Message (textarea)
- "Send Message" submit button
- No form validation, no success/error feedback, no file upload capability
- No map integration
- No qualification logic (no "What service are you interested in?" dropdown, no project budget range, no timeline)

**Functional Requirements for Rebuild:**
This must become a **proper lead-generation form** that qualifies prospects before they submit.

**Enhanced Contact Form Fields:**

| Field | Type | Required | Validation |
|---|---|---|---|
| Full Name | Text Input | Yes | Min 3 characters |
| Email | Email Input | Yes | Valid email regex |
| Phone | Tel Input | Yes | Valid Egyptian/international phone format |
| Company/Organization | Text Input | No | — |
| Service Interest | Dropdown | Yes | Options: Water Treatment Plant, Wastewater/Sewage Treatment, HVAC System, Fire Fighting System, Electromechanical Works, Civil Construction, Equipment Supply, Design & Consultation, Other |
| Project Type | Dropdown | No | Options: New Construction, Expansion/Retrofit, Maintenance & Repair, Feasibility Study, Other |
| Estimated Budget Range | Dropdown | No | Options: < $50K, $50K–$200K, $200K–$500K, $500K–$1M, $1M+, Not Sure Yet |
| Project Timeline | Dropdown | No | Options: Immediate (ASAP), 1–3 months, 3–6 months, 6–12 months, Planning Phase |
| Message | Textarea | Yes | Min 20 characters |
| File Upload | File Input | No | Accept: .pdf, .doc, .docx, .dwg, .jpg, .png (max 10MB) |

**Additional Contact Elements:**
- **Map**: Embedded Google Maps showing the Naser City, Cairo office location
- **WhatsApp CTA**: Floating WhatsApp button (bottom-right corner) linking to the primary phone number via `https://wa.me/201006249420`
- **Social Links**: Footer-level links to LinkedIn company page and Facebook page
- **Form Success State**: After submission, show a confirmation message with "We typically respond within 24 hours. For urgent inquiries, call us directly."
- **Backend**: Form data should be sent to `info@infeworks.com` via email (e.g., using Resend, SendGrid, or Nodemailer) and optionally stored in a database for CRM integration.

**Components:**
```
<ContactSection /> — Full-width section with two-column layout
<ContactForm /> — Enhanced form with all fields, validation, and success/error states
<ContactInfo /> — Address, phone, email, map, social links
<WhatsAppButton /> — Floating action button (fixed bottom-right)
```

---

#### Screen 8: Footer

**Current State:**
- Copyright: "© 2026 infeworks"
- Social icons: Facebook, LinkedIn
- Navigation links: Full repeat of the top navigation
- "Scroll to Top" button

**Functional Requirements for Rebuild:**
- **Multi-column footer layout:**
  - Column 1: Logo + tagline + brief company description (1–2 sentences)
  - Column 2: Quick Links (Services, Projects, About, Contact)
  - Column 3: Service Areas (Cairo, Delta, Red Sea, New Administrative Capital, MENA)
  - Column 4: Contact Info (address, phones, email, social icons)
- **Newsletter signup**: Optional email capture field with "Stay updated on our latest projects and industry insights"
- **Language toggle**: Arabic | English switch
- **Bottom bar**: Copyright, privacy policy link, terms link

**Components:**
```
<Footer /> — Multi-column footer
<FooterColumn /> — Reusable footer column component
<NewsletterForm /> — Email input + subscribe button
<LanguageToggle /> — AR/EN language switch
<ScrollToTop /> — Button that appears on scroll
```

---

### Proposed Route Architecture (Next.js)

```
/                           → Homepage (all sections as described above)
/services                   → Services overview (redirects to /services/water-treatment)
/services/water-treatment   → Water & Wastewater Treatment detail page
/services/sewage-treatment  → Sewage Treatment detail page
/services/hvac              → HVAC Systems detail page
/services/fire-fighting      → Fire Fighting Systems detail page
/services/electromechanical → Electromechanical Works detail page
/services/civil             → Civil & Infrastructure detail page
/services/equipment         → Equipment Supply detail page
/services/design            → Design & Consultation detail page
/projects                   → Projects portfolio (filterable grid)
/projects/[slug]            → Individual project detail page
/about                      → About the company, team, history (NEW)
/chairman                   → Chairman's message (full page) (NEW)
/clients                    → Clients & partners (NEW)
/testimonials               → All testimonials (NEW)
/contact                    → Contact form + info
/thank-you                  → Form submission confirmation (NEW)
/privacy                    → Privacy policy (NEW)
/terms                      → Terms of service (NEW)
```

---

## 3. The New Digital-First Brand Identity

### Brand Voice & Personality

**Voice Attributes:**
| Attribute | Description | Do | Don't |
|---|---|---|---|
| **Confident** | Speaks with authority rooted in engineering expertise | Use active voice, definitive statements, quantified claims | Use tentative language ("we believe", "we think", "maybe") |
| **Precise** | Every word carries specific meaning — no fluff | Use technical terms correctly, cite specific metrics | Use vague marketing jargon ("world-class", "best-in-class", "cutting-edge") |
| **Outcome-Oriented** | Leads with results and impact, not features | "We delivered a 500 m³/day treatment plant in 6 months" | "We provide high-quality water solutions" |
| **Modern** | Sounds like a Y-Combinator startup that moves concrete | Short sentences, clear hierarchy, modern formatting | Wall-of-text paragraphs, passive voice, bureaucratic tone |
| **Bilingual-Ready** | All content must work in both Arabic and English | Use simple sentence structures, avoid cultural idioms | Use English-specific wordplay or culturally-specific references |

**Copywriting Guidelines:**
- Headlines: 6–10 words maximum. Must communicate the outcome or value, not just the category. Example: "We Engineer Water Intelligence" not "Water Treatment Services"
- Body text: 3–5 sentences per paragraph. Lead with the problem, then the solution, then the outcome. Every paragraph must pass the "So what?" test.
- CTAs: Action-oriented, specific. "Request a Project Consultation" not "Contact Us". "View Our Portfolio" not "Our Work".
- Arabic content: Use formal but accessible Arabic ( Fus'ha — not overly classical, not colloquial). Equivalent technical terms must be accurate (e.g., محطات معالجة المياه for "water treatment plants").
- Numbers: Always use numerals (15, not "fifteen") for statistics, capacities, and measurements. Include units (m³/day, kW, months, EGP/USD).

### Design System & Tokens (Tailwind CSS)

#### Color Palette

```css
/* === DARK MODE (Primary Expression) === */
--color-bg-dark:        #0B1120;   /* Page background */
--color-surface-dark:   #1A2332;   /* Card/modal/panel backgrounds */
--color-surface-elevated: #1E293B; /* Elevated surfaces (dropdowns, popovers) */
--color-border-dark:    #2D3B4F;   /* Borders, dividers */
--color-text-primary:    #F1F5F9;   /* Primary text */
--color-text-secondary:  #94A3B8;   /* Secondary/meta text */
--color-text-tertiary:  #64748B;   /* Tertiary/disabled text */
--color-accent-primary: #3B82F6;   /* Primary accent — buttons, links, active states */
--color-accent-glow:    #60A5FA;   /* Glow effects, hover highlights, neon accents */
--color-accent-soft:    #EFF6FF;   /* 10% accent on dark backgrounds (soft highlights) */
--color-success:        #10B981;   /* Success states, positive metrics */
--color-warning:        #F59E0B;   /* Warning states, pending indicators */
--color-error:          #EF4444;   /* Error states, critical alerts */
--color-info:           #06B6D4;   /* Information badges, tooltips */
--color-purple:         #7C3AED;   /* Accent variation — used sparingly for gradients */

/* === LIGHT MODE (Secondary Expression) === */
--color-bg-light:       #FFFFFF;   /* Page background */
--color-surface-light:  #F8FAFC;   /* Card backgrounds */
--color-surface-muted:  #F1F5F9;   /* Subtle surface variation */
--color-border-light:   #E2E8F0;   /* Borders, dividers */
--color-text-primary-l: #0F172A;   /* Primary text */
--color-text-secondary-l:#64748B;  /* Secondary/meta text */
--color-accent-primary-l:#2563EB;  /* Primary accent (lighter variant for readability) */

/* === BRAND-SPECIFIC GRADIENTS === */
--gradient-hero:        linear-gradient(135deg, #0B1120 0%, #1A2332 50%, #0F2D52 100%);
--gradient-accent:      linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%);
--gradient-water:       linear-gradient(135deg, #3B82F6 0%, #7C3AED 100%);
--gradient-glow:        radial-gradient(circle at 50% 50%, rgba(59,130,246,0.15) 0%, transparent 70%);
```

**Tailwind CSS Configuration (`tailwind.config.ts`):**
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          dark:     { DEFAULT: '#0B1120', surface: '#1A2332', elevated: '#1E293B', border: '#2D3B4F' },
          light:    { DEFAULT: '#FFFFFF', surface: '#F8FAFC', muted: '#F1F5F9', border: '#E2E8F0' },
          accent:   { DEFAULT: '#3B82F6', glow: '#60A5FA', soft: '#EFF6FF', dark: '#2563EB' },
          success:  '#10B981',
          warning:  '#F59E0B',
          error:    '#EF4444',
          purple:   '#7C3AED',
        },
        text: {
          primary:  { dark: '#F1F5F9', light: '#0F172A' },
          secondary:{ dark: '#94A3B8', light: '#64748B' },
          tertiary: { dark: '#64748B', light: '#94A3B8' },
        }
      },
      fontFamily: {
        sans: ['Inter', 'Cairo', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        arabic: ['Cairo', 'sans-serif'],
      },
      borderRadius: {
        'brand': '12px',
        'brand-lg': '16px',
        'brand-sm': '8px',
      },
      boxShadow: {
        'brand': '0 1px 3px rgba(0,0,0,0.08)',
        'brand-md': '0 4px 12px rgba(0,0,0,0.12)',
        'brand-lg': '0 12px 40px rgba(0,0,0,0.16)',
        'glow': '0 0 20px rgba(59,130,246,0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
```

#### Typography Hierarchy

| Level | Font | Weight | Size (Desktop) | Size (Mobile) | Line Height | Letter Spacing | Color |
|---|---|---|---|---|---|---|---|
| **Display** | Inter | 700 (Bold) | 48px | 32px | 1.15 | -0.02em | text-primary |
| **H1** | Inter | 700 (Bold) | 36px | 28px | 1.2 | -0.01em | text-primary |
| **H2** | Inter | 600 (Semibold) | 28px | 24px | 1.3 | -0.01em | text-primary |
| **H3** | Inter | 600 (Semibold) | 22px | 20px | 1.35 | 0 | text-primary |
| **H4** | Inter | 600 (Semibold) | 18px | 16px | 1.4 | 0 | text-primary |
| **Body** | Inter | 400 (Regular) | 16px | 15px | 1.7 | 0 | text-primary |
| **Body Small** | Inter | 400 (Regular) | 14px | 13px | 1.65 | 0 | text-secondary |
| **Label** | Inter | 500 (Medium) | 12px | 12px | 1.5 | 0.02em (uppercase) | text-tertiary |
| **Caption** | Inter | 400 (Regular) | 11px | 11px | 1.4 | 0.01em | text-tertiary |
| **Data/Metric** | JetBrains Mono | 600 (Semibold) | 32px | 24px | 1.2 | 0 | accent-primary |
| **Data Label** | Inter | 500 (Medium) | 13px | 12px | 1.4 | 0.02em | text-secondary |

**Arabic Typography Override:**
When the page is in RTL/Arabic mode, replace `Inter` with `Cairo` for all text elements. Cairo is available on Google Fonts and provides excellent Arabic readability at all weights. Set `dir="rtl"` and `lang="ar"` on the `<html>` element for proper RTL layout switching.

```css
html[dir="rtl"] { font-family: 'Cairo', 'Inter', sans-serif; }
html[dir="rtl"] .font-mono { font-family: 'Cairo', monospace; }
```

### Component Styling Rules

#### Buttons

| Variant | Background | Text | Border | Hover | Active | Disabled |
|---|---|---|---|---|---|---|
| **Primary** | `#3B82F6` | `#FFFFFF` | none | `#2563EB` (darker blue) | `#1D4ED8` + scale(0.98) | `opacity: 0.5`, cursor: not-allowed |
| **Secondary** | transparent | `#3B82F6` | `1px solid #3B82F6` | `#EFF6FF` background | `#DBEAFE` background | `opacity: 0.5` |
| **Ghost** | transparent | `#94A3B8` | none | `#F1F5F9` background | `#E2E8F0` background | `opacity: 0.5` |
| **Danger** | `#EF4444` | `#FFFFFF` | none | `#DC2626` | `#B91C1C` + scale(0.98) | `opacity: 0.5` |

**Button Sizing:**
- Default: `height: 44px`, `padding: 0 24px`, `border-radius: 10px`, `font-size: 14px`, `font-weight: 600`
- Large: `height: 52px`, `padding: 0 32px`, `border-radius: 12px`, `font-size: 16px`
- Small: `height: 36px`, `padding: 0 16px`, `border-radius: 8px`, `font-size: 13px`
- Icon-only: `height: 44px`, `width: 44px`, `border-radius: 10px`

**Transition:** All buttons use `transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1)` (standard Tailwind easing).

#### Cards

**Standard Card:**
```
background: var(--color-surface-dark)       /* or --color-surface-light */
border: 1px solid var(--color-border-dark)  /* or --color-border-light */
border-radius: 12px
padding: 24px (desktop) / 16px (mobile)
box-shadow: 0 1px 3px rgba(0,0,0,0.08)
```

**Card Hover State:**
```
border-color: var(--color-accent-primary)
box-shadow: 0 0 20px rgba(59,130,246,0.15)
transform: translateY(-2px)
transition: all 300ms ease
```

**Stat Card (Dashboard-style):**
```
background: var(--color-surface-dark)
border-left: 4px solid var(--color-accent-primary)
border-radius: 0 12px 12px 0
padding: 20px 24px
```
Contains: Large metric number (JetBrains Mono, 32px, accent color) + label text below (Inter, 13px, secondary color) + optional trend indicator (up/down arrow with percentage).

#### Navigation

**Top Navigation Bar:**
```
position: fixed
top: 0
left: 0
right: 0
height: 64px
background: rgba(11, 17, 32, 0.85)  /* Semi-transparent with backdrop blur */
backdrop-filter: blur(12px)
border-bottom: 1px solid rgba(45, 59, 79, 0.5)
z-index: 1000
display: flex
align-items: center
justify-content: space-between
padding: 0 32px
```

**Nav Items:**
- Font: Inter, 14px, font-weight 500
- Color: `#94A3B8` (inactive), `#F1F5F9` (active/hover)
- Spacing: 32px between items
- Active indicator: 2px solid `#3B82F6` underline at bottom of active item
- On scroll (>100px from top): reduce height to 56px, increase background opacity to 0.95

**Mobile Navigation (<768px):**
- Hamburger icon (3-line) in top-right
- Slide-in sidebar from right (RTL) or left (LTR)
- Dark background with blur effect
- Full-width nav items stacked vertically
- Active state: cyan left border + accent text

#### Forms

**Input Fields:**
```
background: var(--color-surface-dark)
border: 1px solid var(--color-border-dark)
border-radius: 10px
height: 44px (default) / auto (textarea)
padding: 0 16px
font-size: 14px
color: var(--color-text-primary)
placeholder-color: var(--color-text-tertiary)
transition: border-color 200ms, box-shadow 200ms
```

**Input Focus State:**
```
border-color: var(--color-accent-primary)
box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15)
outline: none
```

**Input Error State:**
```
border-color: var(--color-error)
box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15)
```

**Form Labels:**
```
font-size: 13px
font-weight: 500
color: var(--color-text-secondary)
margin-bottom: 6px
```

**Select/Dropdown:**
Custom styled (not native browser select). Uses same styling as input fields with a chevron-down icon on the right side. On click, opens a dropdown panel below with options styled as hover-able list items.

#### Badges & Tags

**Badge (Pill):**
```
display: inline-flex
align-items: center
padding: 4px 12px
border-radius: 100px (full)
font-size: 12px
font-weight: 600
letter-spacing: 0.02em
```

**Color Variants:**
| Variant | Background | Text |
|---|---|---|
| Blue (default) | `rgba(59,130,246,0.15)` | `#60A5FA` |
| Green (success) | `rgba(16,185,129,0.15)` | `#34D399` |
| Amber (warning) | `rgba(245,158,11,0.15)` | `#FBBF24` |
| Red (error) | `rgba(239,68,68,0.15)` | `#F87171` |
| Purple (special) | `rgba(124,58,237,0.15)` | `#A78BFA` |

#### Section Dividers & Spacing

**Section Spacing:**
```
section {
  padding-top: 96px;    /* Desktop */
  padding-bottom: 96px; /* Desktop */
}
@media (max-width: 768px) {
  section {
    padding-top: 64px;
    padding-bottom: 64px;
  }
}
```

**Section Headers:**
```
/* Section label (e.g., "WHAT WE DO") */
.label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--color-accent-primary);
  margin-bottom: 12px;
}

/* Section title */
.title {
  font-size: 28px;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 16px;
}

/* Section divider */
.divider {
  width: 48px;
  height: 3px;
  background: var(--color-accent-primary);
  border-radius: 2px;
  margin-bottom: 24px;
}
```

**Alternating Section Backgrounds:**
Odd sections: `#0B1120` (dark bg)
Even sections: `#0F172A` (slightly lighter dark bg)
This creates subtle visual separation without hard dividers.

### Logo Usage

**Primary Logo (Dark Background):**
- Full-color water droplet icon (gradient: navy → cyan)
- Wordmark "Infeworks" in lowercase, modern sans-serif, white
- Tagline "Clear, Controlled, Reliable" below in smaller, lighter weight
- Minimum clear space: Height of the 'i' in "Infeworks" on all sides
- Minimum size: 32px width (for mobile header)
- Maximum size: No maximum — scales proportionally

**Primary Logo (Light Background):**
- Same water droplet icon
- Wordmark in dark navy (#0F172A)
- Tagline in secondary gray (#64748B)

**Icon-Only (Favicon, App Icon, Social Profile):**
- Water droplet icon only, no wordmark
- Favicon: 32x32px (standard), 180x180px (Apple Touch Icon)
- App icon: 512x512px
- Social profile: 400x400px minimum

**Logo DO:**
✅ Use the approved logo files only
✅ Maintain clear space around the logo
✅ Use the dark variant on dark backgrounds, light variant on light backgrounds
✅ Scale proportionally (never stretch or distort)

**Logo DON'T:**
❌ Never add effects (shadows, glows, outlines) to the logo
❌ Never change the logo colors
❌ Never rotate, skew, or animate the logo
❌ Never place the logo on busy/photographic backgrounds without a solid or gradient overlay
❌ Never use the logo at sizes below 24px width

### Icon System

- **Library**: Use Lucide Icons (lucide-react) as the base icon library
- **Custom overrides**: For service-specific icons (water treatment, HVAC, fire fighting), create custom SVG icons that align with the brand's visual language
- **Style**: 24x24px default, stroke-width: 2px, rounded line caps
- **Color**: Inherit from parent (usually `currentColor`)
- **Accent state**: Use `#3B82F6` when an icon needs to stand out
- **Consistency**: Never mix icon styles (outlined vs. filled) on the same page

---

## 4. Market Fit & Competitor Advantage

### Why Infeworks, Why Now

The Egyptian and MENA water infrastructure market is at an **inflection point**. Three macro forces are creating a once-in-a-generation opportunity for engineering firms with water treatment expertise:

**1. Egypt's Water Infrastructure Deficit**
Egypt is one of the most water-scarce countries on Earth (per-capita water availability below the UN poverty line of 1,000 m³/year). The country currently operates ~400 wastewater treatment plants with a total daily capacity of 10.6 million m³ — serving only 7.4 million people, primarily in urban centers. Rural areas, industrial zones, and new cities (the New Administrative Capital alone needs massive water infrastructure) remain severely underserved. Egypt is preparing to tender multiple water treatment facilities, including seawater desalination and industrial wastewater plants, signaling massive government investment.

**2. Egypt Vision 2030 & Mega-Project Demand**
Egypt's Vision 2030 strategy explicitly prioritizes water infrastructure: "Strengthening the institutional and legislative structure of water resources management" and "Expanding infrastructure for supporting a sustainable water supply." Mega-projects like the New Administrative Capital ($59B), 4 million acres development project, and Suez Canal Axis development all require water treatment and electromechanical systems at scale. Private investment is being actively solicited.

**3. MENA Water Market Explosion**
The Middle East water treatment systems market was valued at $2.04 billion in 2024 and is projected to reach $4.72 billion by 2033, at a CAGR of 10.6%. Saudi Arabia alone has a projected $38–42 billion in desalination and wastewater investment from 2025–2030. Smart water management (IoT, AI-driven monitoring) in ME&A was valued at $1.92 billion in 2025.

### Strategic Market Gaps Infeworks Can Exploit

| Gap | Description | Opportunity Size | Infeworks Advantage |
|---|---|---|---|
| **Modular/Containerized Treatment** | Pre-fabricated, transportable water treatment units for remote sites, military camps, construction sites, and temporary facilities | Growing niche; Egypt's remote/Desert areas are underserved | EPC capabilities + equipment supply position = natural advantage to design-build-deliver modular units |
| **Industrial Wastewater Compliance** | Egyptian industries (food processing, textiles, chemicals) face strict new environmental regulations; ~50% currently violate standards | $100M+ addressable market in Egypt alone | Water treatment expertise + electromechanical integration = turnkey compliance solutions |
| **O&M 4.0 (Smart Operations)** | Digital monitoring, predictive maintenance, and IoT-enabled water management for existing treatment plants | Global smart water management growing at 11.7% CAGR; Egypt's smart water market valued at $1.2B | The brand's tech-forward aesthetic and engineering depth = unique credibility to bridge physical infrastructure with digital intelligence |
| **Cross-Discipline EPC** | Very few Egyptian firms can deliver water treatment + HVAC + fire fighting + civil works under one contract | Every new building, factory, and compound needs ALL these systems | Infeworks already has this capability — competitors are siloed in one discipline |
| **Gulf Market Entry Partner** | International water tech firms need local Egyptian EPC partners for MENA expansion | Saudi Arabia: $38–42B water investment pipeline (2025–2030) | Cost-competitive Egyptian labor + existing OEM supplier relationships = attractive partner profile |

### Competitor Landscape

**Direct Competitors (Egypt-based water treatment/engineering):**

| Competitor | Strengths | Weaknesses | How Infeworks Wins |
|---|---|---|---|
| **ESWTCO** | Established player; strong in sewage treatment; government relationships | Narrow focus (water only); no electromechanical/civil capability; traditional branding | Broader EPC scope; modern digital brand presence attracts next-gen decision makers |
| **City Water Egypt** | Comprehensive solutions; desalination capability; established since 2005 | Heavily commodity-focused; no visible digital innovation; weak brand storytelling | Infeworks' cross-discipline capability + tech-forward brand = premium positioning |
| **EnviroTech International** | Oil & gas produced water treatment; Kazakhstan/Oman experience | Niche (oil & gas only); no civil/HVAC capability; international not local | Local depth + broader service range = more accessible for Egyptian clients |
| **EC WTS** | Water purification/filtration units; retail-ready products | Small scale (Haram, Giza shop); no large-scale EPC; limited online presence | Infeworks covers the entire project lifecycle, not just equipment retail |
| **WATER Consult** | Engineering design and consultancy; desalination expertise | Consultancy only — no construction/execution capability | Infeworks executes, not just advises — single-source responsibility |

**Indirect Competitors (broader engineering/construction):**

| Competitor | Strengths | Weaknesses | How Infeworks Wins |
|---|---|---|---|
| **DT-Holding** | Large conglomerate; diverse portfolio | No water treatment specialization; bureaucratic | Water treatment specialization = deeper domain expertise |
| **Argonaut** | International EPC experience | Not Egypt-focused; limited local network | Local presence + government relationships = faster procurement cycles |
| **Elecon** | Electrical engineering strength | No water/civil capability | Full-scope EPC = one contract, one team, one accountability |
| **Habikon Egypt** | Mechanical/HVAC focus | No water treatment capability | Water treatment is Infeworks' core — the hardest domain to replicate |

### The New Identity's Competitive Moat

The transformation from "traditional Egyptian contractor" to "modern water-tech engineering firm" creates a **brand moat** that no competitor can easily replicate:

1. **Visual Differentiation**: No other Egyptian engineering firm uses a dark-mode, tech-forward digital identity. This immediately signals "next generation" to prospects browsing multiple contractor websites.

2. **Digital Credibility**: A modern, well-designed website with project portfolios, case studies, and proper CTAs converts at 3–5x higher rates than WordPress brochure sites. Most competitors have websites that look like they were built in 2010.

3. **Bilingual Reach**: Proper English + Arabic content opens doors to international partners, Gulf market tenders, and foreign investment projects that Arabic-only competitors cannot access.

4. **Cross-Discipline Storytelling**: The brand can tell a unified story: "We design the water system, build the plant, install the HVAC that keeps it running, and construct the building around it." No competitor can make this claim credibly.

5. **Future-Proofing**: The tech-forward brand positions Infeworks to naturally extend into Smart Water Management (IoT monitoring, predictive maintenance, digital twins) as the market demands — without needing a second rebrand.

---

## 5. Appendix: Technical Implementation Notes

### Recommended Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Framework** | Next.js 14+ (App Router) | SSR for SEO, i18n routing for Arabic/English, static generation for project pages |
| **Styling** | Tailwind CSS v4 | Design tokens map directly to config; rapid iteration; consistent output |
| **Components** | shadcn/ui (base) + Custom components | Production-ready primitives; fully customizable to match brand tokens |
| **Animations** | Framer Motion | Page transitions, scroll-triggered animations, card hover effects |
| **Icons** | Lucide React | Consistent icon style, tree-shakeable, 1000+ icons |
| **Forms** | React Hook Form + Zod | Type-safe form validation for the enhanced contact form |
| **Email** | Resend or Nodemailer | Transactional emails from the contact form |
| **i18n** | next-intl or next-i18next | Structured message files for Arabic/English |
| **CMS** | Sanity.io (optional) | If the client wants to edit project content without code changes |
| **Analytics** | Vercel Analytics or Plausible | Privacy-first, lightweight, no cookie banner needed |
| **Hosting** | Vercel | Automatic deployments, edge functions, image optimization |
| **Map** | Google Maps Embed API | Contact page location map |

### Performance Budget

| Metric | Target | Rationale |
|---|---|---|
| **Lighthouse Performance** | ≥ 95 | Critical for B2B credibility; slow sites lose enterprise prospects |
| **First Contentful Paint** | < 1.5s | Users must see content immediately on 3G connections common in Egypt |
| **Largest Contentful Paint** | < 2.5s | Hero image + headline must load fast |
| **Cumulative Layout Shift** | < 0.05 | No jarring layout shifts during loading |
| **Total JS Bundle** | < 150KB (gzipped) | Keep it lean — this is a corporate site, not a web app |
| **Image Format** | WebP/AVIF with fallbacks | Use Next.js `<Image>` component for automatic optimization |

### SEO Strategy

- **Primary Keywords** (English): "water treatment Egypt", "sewage treatment plant contractor Cairo", "HVAC fire fighting systems Egypt", "electromechanical works Egypt", "EPC contractor Egypt water"
- **Primary Keywords** (Arabic): "محطات معالجة المياه مصر", "شركة مقاولات صرف صحي", "أعمال كهروميكانيكية مصر", "أنظمة إطفاء الحريق"
- **Local SEO**: Google Business Profile optimization, Google Maps listing, schema markup for `LocalBusiness`, `Organization`, and `Service` structured data
- **Blog Strategy** (future): Monthly articles on water treatment technology, Egypt water regulations, case studies — drives organic traffic from engineers and procurement officers researching solutions

### Accessibility Requirements

- WCAG 2.1 AA compliance minimum
- All images must have descriptive `alt` text
- Color contrast ratio ≥ 4.5:1 for body text, ≥ 3:1 for large text
- All interactive elements must be keyboard-navigable
- Focus indicators must be visible (brand accent color ring)
- Form fields must have associated `<label>` elements
- Mobile touch targets ≥ 44x44px
- Arabic RTL support must be complete (layout mirrors, text alignment, reading direction)

### Image Guidelines

- **Project Photography**: Real on-site photos only — no stock images. Minimum resolution: 1200x800px. Format: WebP with JPEG fallback.
- **Hero/Background**: Use CSS gradients and abstract water-tech visuals (CSS/SVG) as primary, with real photography as secondary overlay at reduced opacity.
- **Team Photos**: Professional headshots on neutral backgrounds, consistent lighting.
- **Client Logos**: SVG preferred, PNG with transparent background as fallback. Display in monochrome/grayscale by default, color on hover.
- **File Naming**: lowercase, hyphenated, descriptive. Example: `project-water-treatment-sharqia-01.webp`

---

> **Document Maintained By**: Infeworks Brand & Product Team
> **Last Updated**: July 2026
> **Next Review**: October 2026
> **Distribution**: AI coding agents, frontend developers, design team, stakeholders
