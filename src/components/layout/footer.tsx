'use client'

import { useTranslations } from '@/lib/i18n-client'
import { Droplets, Phone, Mail, MapPin, Send, Globe } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const QUICK_LINKS = [
  { key: 'services', href: '#services' },
  { key: 'projects', href: '#projects' },
  { key: 'about', href: '#about' },
  { key: 'contact', href: '#contact' },
] as const

const SERVICE_AREAS = ['Cairo', 'Delta', 'New Administrative Capital', 'Red Sea', 'MENA'] as const

export function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')
  const tContact = useTranslations('contact')
  const currentYear = new Date().getFullYear()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const el = document.getElementById(targetId)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <footer className="mt-auto border-t border-border/50" style={{ backgroundColor: '#0B1120' }}>
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Column 1: Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                <Droplets className="h-5 w-5 text-primary" strokeWidth={2.2} />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                Infeworks
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t('description')}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://facebook.com/infeworks"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Facebook"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com/company/infeworks"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {tNav(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Service Areas */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground">
              {t('serviceAreas')}
            </h3>
            <ul className="space-y-2.5">
              {SERVICE_AREAS.map((area) => (
                <li key={area} className="text-sm text-muted-foreground">
                  {area}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground">
              {t('contactInfo')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">{tContact('info.address')}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <div className="space-y-0.5">
                  <a href="tel:+201006249420" className="block text-sm text-muted-foreground transition-colors hover:text-foreground">{tContact('info.phone1')}</a>
                  <a href="tel:+201118660042" className="block text-sm text-muted-foreground transition-colors hover:text-foreground">{tContact('info.phone2')}</a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:info@infeworks.com" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {tContact('info.email')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-10 rounded-xl border border-border/50 p-6" style={{ backgroundColor: 'rgba(26,35,50,0.5)' }}>
          <h3 className="mb-2 text-sm font-semibold text-foreground">{t('newsletter')}</h3>
          <p className="mb-4 text-xs text-muted-foreground">{t('newsletterPlaceholder')}</p>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder={t('newsletterPlaceholder')}
              className="h-9 flex-1 bg-background text-sm border-border"
              readOnly
            />
            <Button size="default" className="h-9 gap-2 px-4 text-sm">
              <Send className="h-3.5 w-3.5" />
              {t('subscribe')}
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <Separator className="bg-border/50" />
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-xs text-muted-foreground">{t('copyright', { year: currentYear })}</p>
        <div className="flex items-center gap-4">
          <a href="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground">{t('privacy')}</a>
          <a href="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground">{t('terms')}</a>
        </div>
      </div>
    </footer>
  )
}