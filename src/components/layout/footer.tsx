'use client'

import { useTranslations } from '@/lib/i18n-client'
import Image from 'next/image'
import { Phone, Mail, MapPin, Send } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'

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
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const el = document.getElementById(targetId)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  return (
    <footer className="mt-auto border-t border-border/50 bg-background">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Column 1: Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="Infeworks" width={32} height={32} className="rounded-lg" />
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
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href="https://linkedin.com/company/infeworks"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
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
        <div className="mt-10 rounded-xl border border-border p-6 bg-muted/50">
          <h3 className="mb-2 text-sm font-semibold text-foreground">{t('newsletter')}</h3>
          <p className="mb-4 text-xs text-muted-foreground">{t('newsletterPlaceholder')}</p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('newsletterPlaceholder')}
              className="h-9 flex-1 bg-card text-sm border-border"
              required
            />
            <Button type="submit" size="default" className="h-9 gap-2 px-4 text-sm" disabled={subscribed}>
              {subscribed ? (
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              ) : (
                <Send className="h-3.5 w-3.5" />
              )}
              {subscribed ? '✓' : t('subscribe')}
            </Button>
          </form>
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