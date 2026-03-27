import type { Metadata } from 'next'
import { Providers } from '@/components/providers'
import { APP_DESCRIPTION, APP_NAME, BASE_APP_ID, TALENTAPP_VERIFICATION } from '@/lib/appConfig'
import './globals.css'

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  metadataBase: new URL('https://openpoll-miniapp.vercel.app'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content={BASE_APP_ID} />
        <meta
          name="talentapp:project_verification"
          content={TALENTAPP_VERIFICATION}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
