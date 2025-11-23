import './globals.css'

export const metadata = {
  title: 'מעגנה - בית משלנו על המים',
  description: 'מקימים יחד כפר נופש קואופרטיבי בכנרת',
}

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  )
}


