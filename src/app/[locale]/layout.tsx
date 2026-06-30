import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { LocaleUpdater } from '@/components/layout/locale-updater'

const locales = ['en', 'ar'] as const

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'hero' })

  return {
    title: `${t('title')} — Infeworks`,
    description: t('subtitle'),
  }
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!hasLocale(locale) || !locales.includes(locale as (typeof locales)[number])) {
    notFound()
  }

  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  // Dynamically import messages for the current locale
  let messages: Record<string, unknown>
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch {
    notFound()
  }


  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleUpdater locale={locale} />
      <div dir={dir} className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <WhatsAppButton />
      </div>
    </NextIntlClientProvider>
  )
}