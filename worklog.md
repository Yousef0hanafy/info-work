---
Task ID: 1
Agent: Main Agent
Task: Build Infeworks corporate website — fix i18n system, EN/AR switching, RTL support, verify with Agent Browser

Work Log:
- Read existing project structure: Next.js 16 + Tailwind v4 + shadcn/ui + Framer Motion already initialized
- Found critical bug: i18n system was non-functional — useLocale() always returned 'en', toggleLocale was a no-op
- Found broken locale detection in projects-section and testimonials-section (used useSyncExternalStore on pathname, but only / route exists)
- Fixed RTL styling issue in testimonials (borderLeftWidth → borderInlineStartWidth)
- Renamed i18n-client.ts → i18n-client.tsx to support JSX (I18nProvider)
- Rewrote I18nProvider with React Context, localStorage persistence, and automatic html dir/lang updates
- Updated Providers to wrap children with I18nProvider
- Fixed Navbar language toggle to use context's setLocale
- Fixed Navbar to use useSyncExternalStore for mounted state (avoiding React 19 lint rule)
- Added 5 more fallback projects (9 total) covering all 6 filter categories
- Verified with Agent Browser: all sections render, EN/AR switch works, dir=rtl set correctly, nav scrolling works, project filters work, theme toggle works, footer is at bottom

Stage Summary:
- Infeworks corporate website is fully functional at / route with 7 sections
- Complete EN/AR bilingual support with working language toggle
- RTL/LTR direction switching via HTML attributes
- 9 projects across 6 categories with working filter
- Dark/light theme toggle
- Contact form with validation
- Screenshots saved to /download/infeworks-preview-en.png and infeworks-preview-ar.png
- Known non-critical warnings: shadcn asChild prop in React 19 (framework-level, no user impact)