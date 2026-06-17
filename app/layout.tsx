import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Rdyoda.GG — BRM5 Loadout Hub',
  description: 'Real stats, real loadouts, real opinions. Built by a Platinum 5 BRM5 creator.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ background: '#07090D' }}>
        {children}
      </body>
    </html>
  )
}