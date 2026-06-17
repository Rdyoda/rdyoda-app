'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function HomePage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push('/login'); return }
      setUser(session.user)
      setLoading(false)
    })
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) return (
    <div className="min-h-screen bg-[#07090D] flex items-center justify-center">
      <div className="text-[#1BBFA0] font-mono text-sm">Loading...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#07090D] text-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#07090D]/90 backdrop-blur border-b border-white/5 px-8 py-4 flex items-center justify-between">
        <Link href="/home" className="font-black text-2xl tracking-widest">
          RDYODA<span className="text-[#1BBFA0]">.</span>GG
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/home" className="text-sm text-gray-400 hover:text-white transition">Home</Link>
          <Link href="/guns" className="text-sm text-gray-400 hover:text-white transition">Guns</Link>
          <Link href="/guides" className="text-sm text-gray-400 hover:text-white transition">Guides</Link>
          <Link href="/credits" className="text-sm text-gray-400 hover:text-white transition">Credits</Link>
          <Link href="/attachments" className="text-sm text-gray-400 hover:text-white transition">Attachments</Link>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">{user?.email}</span>
          <button onClick={handleSignOut}
            className="text-xs text-gray-500 hover:text-white transition px-3 py-1 border border-white/10 rounded-lg">
            Sign out
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="px-8 py-20 max-w-5xl mx-auto">
        <div className="mb-4 text-xs font-mono text-[#1BBFA0] tracking-widest uppercase">BRM5 Loadout Hub · Early Access</div>
        <h1 className="text-6xl font-black tracking-tight mb-6">
          PLAY BETTER.<br />
          <span className="text-[#1BBFA0]">KNOW MORE.</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl leading-relaxed mb-10">
          Real stats, real loadouts, real opinions. Built by a Platinum 5 creator for players who actually want to improve.
        </p>
        <div className="flex gap-4">
          <Link href="/guns"
            className="px-8 py-4 bg-[#1BBFA0] text-black font-bold rounded-xl hover:bg-[#1BBFA0]/90 transition">
            Gun Database
          </Link>
          <Link href="/guides"
            className="px-8 py-4 border border-white/10 text-white font-semibold rounded-xl hover:border-white/20 transition">
            Guides
          </Link>
        </div>
      </div>

      {/* Feature grid */}
      <div className="px-8 pb-20 max-w-5xl mx-auto grid grid-cols-3 gap-4">
        {[
          { title: 'Gun Database', desc: '73 weapons with real stats — damage by hit zone, recoil, muzzle velocity, reload times.', href: '/guns', icon: '🔫' },
          { title: 'Loadout Builder', desc: 'Answer a few questions and get a loadout recommendation built around your playstyle.', href: '/loadout', icon: '⚙️' },
          { title: 'Guides', desc: 'Written and video guides from the community, vetted for quality.', href: '/guides', icon: '📖' },
          { title: 'Attachments', desc: 'Every attachment with real weight data. See how each one affects your recoil.', href: '/attachments', icon: '🔧' },
          { title: 'Credits Roadmap', desc: 'How to spend your credits at every stage of the game.', href: '/credits', icon: '💰' },
          { title: 'Pro Access', desc: 'TTK calculator, attachment try-on, loadout profiles, and more.', href: '/pro', icon: '⭐' },
        ].map(f => (
          <Link key={f.title} href={f.href}
            className="bg-[#0D1219] border border-white/5 rounded-2xl p-6 hover:border-[#1BBFA0]/30 transition group">
            <div className="text-2xl mb-3">{f.icon}</div>
            <div className="font-bold text-white mb-2 group-hover:text-[#1BBFA0] transition">{f.title}</div>
            <div className="text-sm text-gray-500 leading-relaxed">{f.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}