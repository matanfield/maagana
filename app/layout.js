import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://maagana.co.il'

export const metadata = {
  title: 'מעגנה - בית משלנו על המים',
  description: 'מקימים יחד כפר נופש קואופרטיבי בכנרת. טבע, פשטות, קהילה.',
  keywords: ['קואופרטיב', 'כנרת', 'כפר נופש', 'קהילה', 'טבע', 'מעגנה'],
  authors: [{ name: 'קואופרטיב מעגנה' }],
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    url: siteUrl,
    siteName: 'מעגנה',
    title: 'מעגנה - בית משלנו על המים',
    description: 'מקימים יחד כפר נופש קואופרטיבי בכנרת. טבע, פשטות, קהילה.',
    images: [
      {
        url: `${siteUrl}/og-image?v=2`,
        width: 1200,
        height: 630,
        alt: 'מעגנה - בית משלנו על המים',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'מעגנה - בית משלנו על המים',
    description: 'מקימים יחד כפר נופש קואופרטיבי בכנרת. טבע, פשטות, קהילה.',
    images: [`${siteUrl}/og-image?v=2`],
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  )
}



