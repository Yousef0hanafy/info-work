'use client'

import { useState, useCallback, useSyncExternalStore } from 'react'
import { useTranslations, useLocale } from '@/lib/i18n-client'
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
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet'
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

export function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const { theme, setTheme } = useTheme()
  const isRTL = locale === 'ar'

  const scrolled = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener('scroll', onStoreChange, { passive: true })
      return () => window.removeEventListener('scroll', onStoreChange)
    },
    () => window.scrollY > 100,
    () => false
  )
  const [mobileOpen, setMobileOpen] = useState(false)

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

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

  const toggleLocale = () => {
    return
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
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
          href={`/${locale}`}
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <Droplets className="h-7 w-7 text-primary" strokeWidth={2.2} />
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
              className={cn(
                'relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
                isRTL ? 'text-right' : 'text-left'
              )}
            >
              {t(item.labelKey)}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLocale}
            className="h-9 w-9 text-muted-foreground hover:text-foreground"
            aria-label="Toggle language"
          >
            <Languages className="h-4 w-4" />
          </Button>

          {/* Theme Toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
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
            </Button>
          )}

          {/* CTA Button — Desktop only */}
          <Button
            asChild
            className="hidden h-9 gap-2 rounded-lg px-4 text-sm font-semibold md:inline-flex"
            onClick={(e) => {
              e.preventDefault()
              const el = document.getElementById('contact')
              if (el) {
                const navHeight = scrolled ? 56 : 64
                const top =
                  el.getBoundingClientRect().top + window.scrollY - navHeight
                window.scrollTo({ top, behavior: 'smooth' })
              }
            }}
          >
            <span>{t('getStarted')}</span>
            {!isRTL && <ArrowRight className="h-4 w-4" />}
            {isRTL && <ArrowRight className="h-4 w-4 rotate-180" />}
          </Button>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-muted-foreground hover:text-foreground md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side={isRTL ? 'right' : 'left'}
              className="w-80 border-border/50 bg-background/95 backdrop-blur-xl"
            >
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-primary" />
                  <span className="font-bold">Infeworks</span>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-1 px-4 pt-4">
                {NAV_ITEMS.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {t(item.labelKey)}
                    </a>
                  </SheetClose>
                ))}
              </div>

              <div className="mt-auto border-t border-border/50 p-4">
                <SheetClose asChild>
                  <Button className="w-full gap-2" asChild>
                    <a
                      href="#contact"
                      onClick={(e) => handleNavClick(e, '#contact')}
                    >
                      {t('getStarted')}
                      {!isRTL && <ArrowRight className="h-4 w-4" />}
                      {isRTL && <ArrowRight className="h-4 w-4 rotate-180" />}
                    </a>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}