'use client'

import { useState, useCallback, useEffect, useContext, useSyncExternalStore } from 'react'
import { useTranslations, useLocale, useDir, I18nContext } from '@/lib/i18n-client'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Droplets,
  Sun,
  Moon,
  Menu,
  ArrowRight,
  Languages,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface NavItem {
  labelKey: string
  href: string
}

const NAV_ITEMS: NavItem[] = [
  { labelKey: 'services', href: '#services' },
  { labelKey: 'about', href: '#about' },
  { labelKey: 'projects', href: '#projects' },
  { labelKey: 'testimonials', href: '#testimonials' },
  { labelKey: 'clients', href: '#clients' },
  { labelKey: 'contact', href: '#contact' },
]

const emptySubscribe = () => () => {}
function useIsMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false)
}

export function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const dir = useDir()
  const { setLocale } = useContext(I18nContext)
  const { theme, setTheme } = useTheme()
  const isRTL = dir === 'rtl'
  const isMounted = useIsMounted()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      const targetId = href.replace('#', '')
      const el = document.getElementById(targetId)
      if (el) {
        const navHeight = scrolled ? 56 : 64
        const top = el.getBoundingClientRect().top + window.scrollY - navHeight
        window.scrollTo({ top, behavior: 'smooth' })
      }
      setMobileOpen(false)
    },
    [scrolled]
  )

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) {
      const navHeight = scrolled ? 56 : 64
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setMobileOpen(false)
  }

  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'ar' : 'en')
  }

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-40 transition-all duration-300',
        scrolled
          ? 'h-14 border-b border-border/50 bg-background/80 backdrop-blur-xl shadow-sm'
          : 'h-16 bg-transparent'
      )}
    >
      <nav
        className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
            <Droplets className="h-5 w-5 text-primary" strokeWidth={2.2} />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Infeworks
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(item.labelKey)}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5">
          {/* Language Toggle */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Toggle language"
          >
            <Languages className="h-4 w-4" />
            <span className="hidden sm:inline">{t('language')}</span>
          </button>

          {/* Theme Toggle */}
          {isMounted && (
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="h-4 w-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          )}

          {/* CTA Button — Desktop only */}
          <Button
            className="hidden h-9 gap-2 rounded-lg px-4 text-sm font-semibold md:inline-flex"
            onClick={scrollToContact}
          >
            <span>{t('getStarted')}</span>
            <ArrowRight className={cn('h-4 w-4', isRTL && 'rotate-180')} />
          </Button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile Slide-in Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: isRTL ? 300 : -300 }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? 300 : -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={cn(
                'fixed top-0 z-50 h-full w-80 bg-background border-border/50 shadow-2xl md:hidden',
                isRTL ? 'right-0' : 'left-0'
              )}
            >
              <div className="flex items-center justify-between p-4 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                    <Droplets className="h-5 w-5 text-primary" strokeWidth={2.2} />
                  </div>
                  <span className="font-bold text-foreground">Infeworks</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col gap-1 p-4">
                {NAV_ITEMS.map((item, idx) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.3 }}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {t(item.labelKey)}
                  </motion.a>
                ))}
              </div>

              <div className="absolute bottom-0 left-0 right-0 border-t border-border/50 p-4">
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 h-11 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/80"
                  onClick={scrollToContact}
                >
                  {t('getStarted')}
                  <ArrowRight className={cn('h-4 w-4', isRTL && 'rotate-180')} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}