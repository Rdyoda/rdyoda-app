'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const ROADMAP = [
  {
    range: '0 – 2,000 credits',
    label: 'Just Starting',
    color: '#1BBFA0',
    guns: [
      { name: 'M16A2', cost: 'Free', note: 'Your starting gun. It works. Don\'t spend money on attachments yet.' },
      { name: 'M9 Pistol', cost: 'Free', note: 'Default sidearm. Replace it with a G17 Gen 3 when you can.' },
    ],
    tips: [
      'Don\'t buy attachments for the M16A2 — you\'ll replace it soon.',
      'Focus on learning the maps and gamemodes before spending credits.',
      'Save everything you earn in your first few hours.',
    ]
  },
  {
    range: '2,000 – 5,000 credits',
    label: 'Getting Started',
    color: '#F5D547',
    guns: [
      { name: 'AK-74M', cost: '2,220', note: 'Best beginner gun in the game. Solid in every gamemode. Buy this first.' },
      { name: 'M16A4', cost: '2,019', note: 'If you prefer AR platform over AK, this is your pick.' },
      { name: 'G17 Gen 3', cost: '810', note: 'Replace the M9 with this. Better in every way.' },
    ],
    tips: [
      'The AK-74M is your priority purchase. Don\'t skip it.',
      'Don\'t blow your credits on pistols — one good one is enough.',
      'Start learning one gamemode deeply rather than all of them.',
    ]
  },
  {
    range: '5,000 – 10,000 credits',
    label: 'Mid Game',
    color: '#9B5FD4',
    guns: [
      { name: 'L85A2', cost: '4,005', note: 'Best PvP AR right now. No suppressor limits open world use.' },
      { name: 'MX-R Vigor 5.56', cost: '3,647', note: 'Versatile carbine. Great all-rounder before you can afford the 300 KO.' },
      { name: 'VSS Vintorez', cost: '2,735', note: 'Great for PvP players who want something different.' },
    ],
    tips: [
      'This is where you start specializing — pick PvP or open world and invest there.',
      'Don\'t buy every gun you see. Pick 2-3 and learn them deeply.',
      'Start saving for your main attachment loadout — it\'s expensive.',
    ]
  },
  {
    range: '10,000+ credits',
    label: 'Established',
    color: '#F08080',
    guns: [
      { name: 'MX-R Vigor 300 KO', cost: '4,999', note: 'The best versatile rifle in the game with 110gr supersonics. This is the endgame.' },
      { name: 'G22A2', cost: '7,523', note: 'Best sniper in the game. Worth every credit.' },
      { name: 'M249', cost: '14,496', note: 'If you want an LMG, this is the one. Expensive but worth it for support players.' },
    ],
    tips: [
      'At this point you should be investing in attachments as much as guns.',
      'The MX-R Vigor 300 KO with 110gr supersonics is the best all-around rifle in the game right now.',
      'Don\'t neglect your sidearm — a good pistol wins gunfights when you run dry.',
    ]
  },
]

export default function CreditsPage() {
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('roadmap')
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push('/login'); return }
      setLoading(false)
    })
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-[#07090D] flex items-center justify-center">
      <div className="text-[#1BBFA0] font-mono text-sm">Loading...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#07090D] text-white">
      <Nav />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="font-black text-4xl mb-2">CREDITS & ATTACHMENTS</h1>
        <p className="text-gray-500 text-sm mb-8">How to spend your credits at every stage of the game, plus attachment weight data.</p>

        <div className="flex gap-2 mb-8 border-b border-white/5 pb-4">
          {[['roadmap', '💰 Credit Roadmap'], ['attachments', '🔧 Attachments']].map(([t, label]) => (
            <button key={t} onClick={() => setTab(t)}
              className={`text-sm font-semibold px-4 py-2 rounded-lg transition ${tab === t ? 'bg-[#1BBFA0]/10 text-[#1BBFA0] border border-[#1BBFA0]/30' : 'text-gray-500 hover:text-white'}`}>
              {label}
            </button>
          ))}
        </div>

        {tab === 'roadmap' && (
          <div className="flex flex-col gap-6">
            {ROADMAP.map((tier, i) => (
              <div key={i} className="bg-[#0D1219] border border-white/5 rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5 flex items-center gap-4"
                  style={{ borderLeftColor: tier.color, borderLeftWidth: 3 }}>
                  <div>
                    <div className="font-black text-lg" style={{ color: tier.color }}>{tier.range}</div>
                    <div className="text-xs text-gray-500 font-mono uppercase tracking-widest">{tier.label}</div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-xs text-gray-600 uppercase tracking-widest mb-3 font-mono">Recommended purchases</div>
                  <div className="flex flex-col gap-3 mb-6">
                    {tier.guns.map((g, j) => (
                      <div key={j} className="flex items-start gap-4 bg-white/3 rounded-xl p-4">
                        <div className="flex-1">
                          <div className="font-semibold text-white mb-1">{g.name}</div>
                          <div className="text-xs text-gray-500 leading-relaxed">{g.note}</div>
                        </div>
                        <div className="text-sm font-mono flex-shrink-0" style={{ color: tier.color }}>
                          {g.cost === 'Free' ? 'Free' : g.cost + 'cr'}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-xs text-gray-600 uppercase tracking-widest mb-3 font-mono">Rdyoda's tips</div>
                  <div className="flex flex-col gap-2">
                    {tier.tips.map((tip, j) => (
                      <div key={j} className="flex items-start gap-3 text-sm text-gray-400">
                        <span style={{ color: tier.color }} className="flex-shrink-0 mt-0.5">◆</span>
                        {tip}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'attachments' && (
          <div className="text-center py-16 text-gray-600">
            <div className="text-4xl mb-4">🔧</div>
            <div className="font-semibold mb-2">Attachments section coming soon</div>
            <div className="text-sm">Full attachment weight data and try-on feature in development.</div>
          </div>
        )}
      </div>
    </div>
  )
}