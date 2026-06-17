'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Nav() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const links = [
    { href: '/home', label: 'Home' },
    { href: '/guns', label: 'Guns' },
    { href: '/guides', label: 'Guides' },
    { href: '/credits', label: 'Credits' },
    { href: '/attachments', label: 'Attachments' },
    { href: '/changelog', label: 'Changelog' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-[#07090D]/90 backdrop-blur border-b border-white/5 px-8 py-4 flex items-center justify-between">
      <Link href="/home" className="font-black text-2xl tracking-widest">
        RDYODA<span className="text-[#1BBFA0]">.</span>GG
      </Link>
      <div className="flex items-center gap-6">
        {links.map(link => (
          <Link key={link.href} href={link.href}
            className={`text-sm transition ${pathname === link.href ? 'text-[#1BBFA0]' : 'text-gray-400 hover:text-white'}`}>
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <a href="https://youtube.com/@Rdyoda9" target="_blank"
          className="text-xs text-yellow-400 border border-yellow-400/20 px-3 py-1.5 rounded-lg hover:bg-yellow-400/10 transition">
          ▶ @Rdyoda9
        </a>
        <button onClick={handleSignOut}
          className="text-xs text-gray-500 hover:text-white transition px-3 py-1.5 border border-white/10 rounded-lg">
          Sign out
        </button>
      </div>
    </nav>
  )
}