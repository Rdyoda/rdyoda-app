'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const ATT_DATA = {
  optics: {
    label: 'Optics',
    desc: 'Red dots, holographic sights, and iron sights. Weight directly affects recoil — lighter optics mean less total gun weight and better handling.',
    items: [
      { name: 'ECHO P-2', variants: [{ config: 'Nominal', weight: 96 }, { config: 'Low mount', weight: 76 }] },
      { name: 'HWS 552', variants: [{ config: 'Default', weight: 327 }] },
      { name: 'HWS EXPS3-0', variants: [{ config: 'Default', weight: 295 }] },
      { name: 'HWS XPS3', variants: [{ config: 'Default', weight: 317 }] },
      { name: 'M68 CCO', variants: [{ config: 'Nominal', weight: 369 }, { config: 'Low mount', weight: 280 }] },
      { name: 'SU-231/PEQ', variants: [{ config: 'Default', weight: 349 }] },
      { name: 'SU-231A/PEQ', variants: [{ config: 'Default', weight: 295 }] },
      { name: 'OKP-7', variants: [{ config: 'Default', weight: 317 }] },
      { name: 'MCS', variants: [{ config: 'Default', weight: 317 }] },
      { name: '1P76', variants: [{ config: 'Default', weight: 317 }] },
      { name: '1P87', variants: [{ config: 'Default', weight: 317 }] },
    ]
  },
  magnification: {
    label: 'Magnification',
    desc: 'Scopes and magnified optics. Significantly heavier than red dots — expect 600g+ for most options. Best for Open World.',
    items: [
      { name: 'PM II G28 BUND', variants: [{ config: 'None', weight: 1002 }, { config: 'Micro T1 Aft', weight: 1002 }] },
      { name: 'PM II ShortDot Dual CC', variants: [{ config: 'None', weight: 810 }, { config: 'ECHO P-2 + AOR', weight: 810 }] },
      { name: 'IMPACT 1-8x24mm F1', variants: [{ config: 'Duty mount', weight: 738 }, { config: 'Nominal', weight: 768 }] },
      { name: 'Mark 4 ER/T 6.5-20x50 M5A2', variants: [{ config: 'Default', weight: 595 }] },
      { name: 'SU-230/PVS', variants: [{ config: 'Default', weight: 658 }] },
      { name: 'TX8 2.5-25x50MM F1', variants: [{ config: 'Default', weight: 1002 }] },
      { name: 'C79A2', variants: [{ config: 'Default', weight: 317 }] },
      { name: 'M150', variants: [{ config: 'Default', weight: 317 }] },
    ]
  },
  flip_sight: {
    label: 'Flip Sights',
    desc: 'Magnifiers and flip-to-side sights. Add weight on top of your primary optic.',
    items: [
      { name: 'G33', variants: [{ config: 'No spacer', weight: 300 }, { config: '7mm spacer', weight: 300 }] },
      { name: 'G45', variants: [{ config: 'No spacer', weight: 300 }, { config: '7mm spacer', weight: 300 }] },
      { name: 'G33 3x SWIFT FTC', variants: [{ config: 'Default', weight: 360 }] },
      { name: 'G45 5x SWIFT FTC', variants: [{ config: 'Default', weight: 360 }] },
      { name: '1P90', variants: [{ config: 'Default', weight: 330 }] },
    ]
  },
  laser: {
    label: 'Laser Modules',
    desc: 'Laser aiming modules. The AN/PEQ-15 is the most common pick at 215g and widely compatible.',
    items: [
      { name: 'AN/PEQ-15', variants: [{ config: 'Default', weight: 215 }] },
      { name: 'AN/PEQ-15A', variants: [{ config: 'Default', weight: 227 }] },
      { name: 'AN/PEQ-2A', variants: [{ config: 'Default', weight: 280 }] },
      { name: 'LA-5B/PEQ', variants: [{ config: 'Default', weight: 200 }] },
      { name: 'LA-5E/PEQ', variants: [{ config: 'Default', weight: 215 }] },
      { name: 'CLAM-3', variants: [{ config: 'Default', weight: 335 }] },
      { name: 'CLAM-4', variants: [{ config: 'Default', weight: 220 }] },
      { name: 'LLM Mk 3', variants: [{ config: 'Default', weight: 240 }] },
    ]
  },
  foregrip: {
    label: 'Foregrips',
    desc: 'Foregrips reduce recoil but add weight. Lighter grips keep your build nimble.',
    items: [
      { name: 'BGV-MK46', variants: [{ config: 'Default', weight: 104 }] },
      { name: 'BGV-MK46K', variants: [{ config: 'Default', weight: 75 }] },
      { name: 'Handbrake Picatinny', variants: [{ config: 'Default', weight: 36 }] },
      { name: 'Finger Stop', variants: [{ config: 'Default', weight: 22 }] },
      { name: 'PVG', variants: [{ config: 'Default', weight: 76 }] },
      { name: 'RK-2', variants: [{ config: 'Default', weight: 145 }] },
      { name: 'RK-4', variants: [{ config: 'Default', weight: 132 }] },
      { name: 'SFG-2', variants: [{ config: 'Default', weight: 75 }] },
      { name: 'IGS.02', variants: [{ config: 'Default', weight: 198 }] },
      { name: 'Folding Foregrip', variants: [{ config: 'Default', weight: 92 }] },
      { name: 'Forward Pistol Grip', variants: [{ config: 'Default', weight: 150 }] },
    ]
  },
  flashlight: {
    label: 'Flashlights',
    desc: 'Weapon-mounted lights. Several are massless in-game.',
    items: [
      { name: 'M300C', variants: [{ config: 'Default', weight: 0 }] },
      { name: 'M600U', variants: [{ config: 'Default', weight: 0 }] },
      { name: 'M340C', variants: [{ config: 'Default', weight: 116 }] },
      { name: 'M600V', variants: [{ config: 'Default', weight: 128 }] },
      { name: 'M952V', variants: [{ config: 'Default', weight: 282 }] },
      { name: 'X300U-B', variants: [{ config: 'Default', weight: 111 }] },
      { name: 'RML-1', variants: [{ config: 'Default', weight: 118 }] },
    ]
  },
  rail: {
    label: 'Rail & Panels',
    desc: 'Rail interface adapters and cover panels. Mostly lightweight filler.',
    items: [
      { name: '3 Slot Rail', variants: [{ config: 'Default', weight: 20 }] },
      { name: '5 Slot Rail', variants: [{ config: 'Default', weight: 20 }] },
      { name: '9 Slot Rail', variants: [{ config: 'Default', weight: 20 }] },
      { name: '11 Slot Rail', variants: [{ config: 'Default', weight: 20 }] },
      { name: 'Latter Panel 3 Slot', variants: [{ config: 'Default', weight: 3 }] },
      { name: 'Latter Panel 7 Slot', variants: [{ config: 'Default', weight: 11 }] },
      { name: 'Latter Panel 14 Slot', variants: [{ config: 'Default', weight: 15 }] },
    ]
  },
  remote: {
    label: 'Remote Switches',
    desc: 'Pressure switches for activating lights and lasers. Minimal weight impact.',
    items: [
      { name: 'Remote Pressure Switch', variants: [{ config: 'Default', weight: 10 }] },
      { name: 'SR', variants: [{ config: 'Default', weight: 30 }] },
      { name: 'Fast Tap', variants: [{ config: 'Default', weight: 36 }] },
      { name: 'RMT-400-A8', variants: [{ config: 'Default', weight: 40 }] },
      { name: 'KV-5P', variants: [{ config: 'Default', weight: 58 }] },
    ]
  }
}

const MAX_WEIGHT = 1002

function weightColor(w) {
  if (w === 0) return '#6E8099'
  if (w <= 100) return '#1BBFA0'
  if (w <= 400) return '#F5D547'
  return '#F08080'
}

export default function AttachmentsPage() {
  const [loading, setLoading] = useState(true)
  const [cat, setCat] = useState('optics')
  const [sort, setSort] = useState('name')
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

  const current = ATT_DATA[cat]
  const sorted = [...current.items].sort((a, b) => {
    if (sort === 'name') return a.name.localeCompare(b.name)
    const minA = Math.min(...a.variants.map(v => v.weight))
    const minB = Math.min(...b.variants.map(v => v.weight))
    if (sort === 'weight-asc') return minA - minB
    return Math.max(...b.variants.map(v => v.weight)) - Math.max(...a.variants.map(v => v.weight))
  })

  return (
    <div className="min-h-screen bg-[#07090D] text-white">
      <Nav />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="font-black text-4xl mb-2">ATTACHMENTS</h1>
        <p className="text-gray-500 text-sm mb-3">Every attachment with real weight data. Weight affects total gun weight which directly impacts recoil.</p>

        <div className="bg-[#1BBFA0]/5 border border-[#1BBFA0]/15 border-l-2 border-l-[#1BBFA0] rounded-xl p-4 mb-8 text-sm text-gray-400 leading-relaxed">
          <span className="text-[#1BBFA0] font-semibold">How weight affects recoil: </span>
          Every gram added increases total weapon weight. Heavier weapons absorb more recoil but handle slower. Lighter builds are snappier but kick more. Balance based on your playstyle.
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(ATT_DATA).map(([key, val]) => (
            <button key={key} onClick={() => setCat(key)}
              className={`text-xs px-3 py-1.5 rounded-full border transition font-medium ${cat === key ? 'bg-[#1BBFA0] text-black border-[#1BBFA0] font-semibold' : 'border-white/10 text-gray-500 hover:text-white'}`}>
              {val.label}
            </button>
          ))}
        </div>

        {/* Category header */}
        <div className="mb-4">
          <div className="font-black text-2xl mb-1">{current.label}</div>
          <div className="text-sm text-gray-500">{current.desc}</div>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-gray-600 uppercase tracking-widest font-mono">Sort:</span>
          {[['name', 'A-Z'], ['weight-asc', 'Lightest first'], ['weight-desc', 'Heaviest first']].map(([s, label]) => (
            <button key={s} onClick={() => setSort(s)}
              className={`text-xs px-3 py-1 rounded-lg border transition ${sort === s ? 'bg-[#1BBFA0]/10 border-[#1BBFA0]/30 text-[#1BBFA0]' : 'border-white/10 text-gray-500 hover:text-white'}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="flex flex-col gap-3">
          {sorted.map(item => {
            const minW = Math.min(...item.variants.map(v => v.weight))
            const maxW = Math.max(...item.variants.map(v => v.weight))
            const wLabel = minW === maxW ? minW + 'g' : minW + '–' + maxW + 'g'
            const wc = weightColor(minW)
            return (
              <div key={item.name} className="bg-[#0D1219] border border-white/5 rounded-xl p-4 hover:border-white/10 transition">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-white text-sm">{item.name}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded border"
                    style={{ color: wc, borderColor: wc + '33', background: wc + '11' }}>
                    {wLabel}
                  </span>
                </div>
                {item.variants.map((v, i) => (
                  <div key={i} className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs text-gray-500 w-32 flex-shrink-0 truncate">
                      {item.variants.length > 1 ? v.config : 'Weight'}
                    </span>
                    <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-1 rounded-full transition-all"
                        style={{ width: (v.weight / MAX_WEIGHT * 100) + '%', background: weightColor(v.weight) }} />
                    </div>
                    <span className="text-xs font-mono text-gray-400 w-10 text-right">{v.weight}g</span>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}