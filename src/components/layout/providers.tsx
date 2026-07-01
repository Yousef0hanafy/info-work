'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { I18nProvider } from '@/lib/i18n-client'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <I18nProvider>
        {children}
      </I18nProvider>
    </NextThemesProvider>
  )
}