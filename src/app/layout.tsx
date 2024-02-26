import './globals.scss'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import Head from 'next/head'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Budget Brews',
  description: 'Budget Brews is here to help you find the most affordable pubs in town. No signup required. Search and submit your local pub prices.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
      <html lang="en">
        <Head>
        <link href='https://api.mapbox.com/mapbox-gl-js/v3.1.2/mapbox-gl.css' rel='stylesheet' />
        </Head>
        <body className={inter.className}>{children}</body>
      </html>
    )
  }
