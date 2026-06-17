'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Nav from '../../components/Nav'

const QUESTIONS = [
  {
    id: 'mode',
    question: 'What do you mainly play?',
    options: [
      { label: 'PvP', value: 'pvp', desc: 'Player vs player combat' },
      { label: 'Open World', value: 'pve', desc: 'AI enemies, objectives, survival' },
      { label: 'Zombies', value: 'zombies', desc: 'Wave-based zombie survival' },
      { label: 'All of them', value: 'all', desc: 'I play everything' },
    ]
  },
  {
    id: 'experience',
    question: 'How long have you been playing BRM5?',
    options: [
      { label: 'Brand new', value: 'new', desc: 'Just started or under level 10' },
      { label: 'Getting started', value: 'beginner', desc: 'Level 10-30, still learning' },
      { label: 'Intermediate', value: 'mid', desc: 'Comfortable but want to improve' },
      { label: 'Experienced', value: 'exp', desc: 'High level, know the game well' },
    ]
  },
  {
    id: 'budget',
    question: 'What\'s your credit budget?',
    options: [
      { label: 'Under 2,000', value: 'low', desc: 'Just starting out' },
      { label: '2,000 – 5,000', value: 'mid', desc: 'Some credits to spend' },
      { label: '5,000 – 10,000', value: 'high', desc: 'Good amount saved up' },
      { label: '10,000+', value: 'rich', desc: 'Money isn\'t the issue' },
    ]
  },
  {
    id: 'style',
    question: 'How do you like to play?',
    options: [
      { label: 'Aggressive', value: 'aggressive', desc: 'Push hard, close range, fast' },
      { label: 'Balanced', value: 'balanced', desc: 'Adapt to the situation' },
      { label: 'Support', value: 'support', desc: 'Hold positions, cover teammates' },
      { label: 'Sniper', value: 'sniper', desc: 'Long range, precision shots' },
    ]
  },
]

const RECOMMENDATIONS = {
  // New players
  new_low: { gun: 'M16A2', note: 'Start with the free M16A2. Learn the game before spending credits. Save everything.', attachments: 'No attachments yet — learn first.' },
  new_mid: { gun: 'AK-74M', note: 'Buy the AK-74M (2,220cr). Best beginner gun in the game. Works in every gamemode.', attachments: 'AN/PEQ-15 laser, basic iron sights to start.' },
  new_high: { gun: 'AK-74M', note: 'Buy the AK-74M first, then save the rest. Don\'t overspend early.', attachments: 'AN/PEQ-15, basic optic. Build from there.' },
  new_rich: { gun: 'AK-74M', note: 'Still start with the AK-74M. Credits don\'t buy experience.', attachments: 'AN/PEQ-15, M68 CCO. Keep it simple.' },
  // PvP focused
  pvp_exp_high: { gun: 'L85A2', note: 'Best PvP AR right now. Low recoil, high fire rate. No suppressor limits open world but dominates PvP.', attachments: 'BGV-MK46K foregrip, M68 CCO, AN/PEQ-15.' },
  pvp_exp_rich: { gun: 'L85A2 or MP9-N', note: 'L85A2 for longer ranges, MP9-N for aggressive close-quarters. Both are current meta.', attachments: 'L85: BGV-MK46K, M68 CCO, AN/PEQ-15. MP9: Keep it light.' },
  // Open world
  pve_exp_rich: { gun: 'MX-R Vigor 300 KO', note: 'Best all-around open world rifle right now. Run 110gr supersonics for maximum range and velocity.', attachments: 'Sierra 762 suppressor, Raider Gen II-E scope, AN/PEQ-15, BGV-MK46 foregrip.' },
  // Sniper
  sniper_rich: { gun: 'G22A2', note: 'Best sniper in the game in my opinion. Fun to use, great all around.', attachments: 'High magnification scope, AN/PEQ-15, bipod if available.' },
  // Default fallback
  default: { gun: 'AK-74M', note: 'When in doubt, the AK-74M is the answer. Solid in every gamemode, forgiving to learn, affordable.', attachments: 'AN/PEQ-15 laser, M68 CCO optic. Add foregrip when you can afford it.' },
}

function getRecommendation(answers) {
  const { mode, experience, budget, style } = answers
  if (experience === 'new') return RECOMMENDATIONS[`new_${budget}`] || RECOMMENDATIONS.new_mid
  if (style === 'sniper' && budget === 'rich') return RECOMMENDATIONS.sniper_rich
  if (mode === 'pvp' && experience === 'exp' && budget === 'rich') return RECOMMENDATIONS.pvp_exp_rich
  if (mode === 'pvp' && experience === 'exp') return RECOMMENDATIONS.pvp_exp_high
  if ((mode === 'pve' || mode === 'all') && experience === 'exp' && budget === 'rich') return RECOMMENDATIONS.pve_exp_rich
  return RECOMMENDATIONS.default
}

export default function LoadoutPage() {
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push('/login'); return }
      setLoading(false)
    })
  }, [])

  function handleAnswer(questionId, value) {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1)
    } else {
      setResult(getRecommendation(newAnswers))
    }
  }

  function reset() {
    setStep(0)
    setAnswers({})
    setResult(null)
  }

  if (loading) return (
    <div className="min-h-screen bg-[#07090D] flex items-center justify-center">
      <div className="text-[#1BBFA0] font-mono text-sm">Loading...</div>
    </div>
  )

  const current = QUESTIONS[step]
  const progress = (step / QUESTIONS.length) * 100

  return (
    <div className="min-h-screen bg-[#07090D] text-white">
      <Nav />

      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="font-black text-4xl mb-2">BUILD YOUR LOADOUT</h1>
        <p className="text-gray-500 text-sm mb-10">Answer a few questions and get a loadout recommendation built around your playstyle.</p>

        {!result ? (
          <>
            {/* Progress bar */}
            <div className="w-full h-1 bg-white/5 rounded-full mb-10 overflow-hidden">
              <div className="h-1 bg-[#1BBFA0] rounded-full transition-all duration-500"
                style={{ width: progress + '%' }} />
            </div>

            <div className="text-xs text-gray-600 font-mono uppercase tracking-widest mb-3">
              Question {step + 1} of {QUESTIONS.length}
            </div>
            <h2 className="font-black text-2xl mb-8">{current.question}</h2>

            <div className="grid grid-cols-2 gap-3">
              {current.options.map(opt => (
                <button key={opt.value} onClick={() => handleAnswer(current.id, opt.value)}
                  className="bg-[#0D1219] border border-white/5 rounded-2xl p-5 text-left hover:border-[#1BBFA0]/40 hover:bg-[#1BBFA0]/5 transition group">
                  <div className="font-bold text-white mb-1 group-hover:text-[#1BBFA0] transition">{opt.label}</div>
                  <div className="text-xs text-gray-500">{opt.desc}</div>
                </button>
              ))}
            </div>

            {step > 0 && (
              <button onClick={() => setStep(step - 1)}
                className="mt-6 text-xs text-gray-600 hover:text-white transition">
                ← Back
              </button>
            )}
          </>
        ) : (
          <div className="bg-[#0D1219] border border-[#1BBFA0]/20 rounded-2xl p-8">
            <div className="text-xs text-[#1BBFA0] font-mono uppercase tracking-widest mb-2">Rdyoda recommends</div>
            <div className="font-black text-3xl text-white mb-6">{result.gun}</div>

            <div className="pl-4 border-l-2 border-[#1BBFA0] mb-6">
              <p className="text-gray-400 text-sm leading-relaxed">{result.note}</p>
            </div>

            <div className="bg-white/3 rounded-xl p-4 mb-6">
              <div className="text-xs text-gray-600 uppercase tracking-widest font-mono mb-2">Suggested attachments</div>
              <p className="text-sm text-gray-400">{result.attachments}</p>
            </div>

            <div className="flex gap-3">
              <Link href="/guns"
                className="flex-1 text-center py-3 bg-[#1BBFA0]/10 border border-[#1BBFA0]/30 text-[#1BBFA0] text-sm font-semibold rounded-xl hover:bg-[#1BBFA0]/20 transition">
                View in Gun Database →
              </Link>
              <button onClick={reset}
                className="px-6 py-3 border border-white/10 text-gray-400 text-sm font-semibold rounded-xl hover:text-white hover:border-white/20 transition">
                Start over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}