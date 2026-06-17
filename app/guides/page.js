'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const GUIDES = [
  { id: 1, cat: 'beginner', title: 'Your First Hour in BRM5', author: 'Rdyoda', date: 'May 2026', read: '8 min', desc: 'Everything you need to know before you spend a single credit. Loadout basics, gamemode breakdown, and the first gun you should buy.', pro: false },
  { id: 2, cat: 'pvp', title: 'Winning 2v2 on Every Map', author: 'Rdyoda', date: 'May 2026', read: '12 min', desc: 'Map control, communication callouts, and which loadouts actually win gunfights at each range.', pro: false },
  { id: 3, cat: 'openworld', title: 'Open World Survival Guide', author: 'Rdyoda', date: 'May 2026', read: '10 min', desc: 'How to stay alive, manage your loadout, and actually complete objectives without getting wiped.', pro: false },
  { id: 4, cat: 'zombies', title: 'Zombies Beginner Guide', author: 'Rdyoda', date: 'May 2026', read: '6 min', desc: 'Wave management, the best budget loadout for zombies, and how to survive long enough to actually enjoy it.', pro: false },
  { id: 5, cat: 'loadout', title: 'Budget MX-R Build Guide', author: 'Rdyoda', date: 'May 2026', read: '7 min', desc: 'How to run the MX-R Vigor on a tight credit budget and still be competitive in both PvP and open world.', pro: false },
  { id: 6, cat: 'pvp', title: 'Advanced PvP Loadout Theory', author: 'Rdyoda', date: 'June 2026', read: '15 min', desc: 'Weight optimization, attachment synergy, and the math behind why certain builds feel better than others.', pro: true },
]

const CAT_LABELS = {
  beginner: 'Beginner',
  pvp: 'PvP',
  openworld: 'Open World',
  zombies: 'Zombies',
  loadout: 'Loadout',
}

const CAT_COLORS = {
  beginner: 'text-[#1BBFA0] bg-[#1BBFA0]/10 border-[#1BBFA0]/20',
  pvp: 'text-purple-300 bg-purple-500/10 border-purple-500/20',
  openworld: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  zombies: 'text-red-400 bg-red-500/10 border-red-500/20',
  loadout: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
}

export default function GuidesPage() {
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('articles')
  const [cat, setCat] = useState('all')
  const [submitOpen, setSubmitOpen] = useState(false)
  const [submitType, setSubmitType] = useState('article')
  const [form, setForm] = useState({ title: '', content: '', video_url: '', cat: 'beginner' })
  const [submitMsg, setSubmitMsg] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [tosChecked, setTosChecked] = useState(false)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push('/login'); return }
      setLoading(false)
    })
  }, [])

  async function handleSubmit() {
    if (!tosChecked) return
    if (!form.title.trim()) { setSubmitMsg('Title is required.'); return }
    setSubmitting(true)
    const { data: { session } } = await supabase.auth.getSession()
    const { error } = await supabase.from('guide_submissions').insert({
      user_id: session?.user?.id,
      type: submitType,
      title: form.title,
      cat: form.cat,
      content: form.content,
      video_url: form.video_url,
      status: 'pending'
    })
    setSubmitting(false)
    if (error) { setSubmitMsg('Something went wrong. Try again.'); return }
    setSubmitMsg('Submitted! Your guide is pending review.')
    setForm({ title: '', content: '', video_url: '', cat: 'beginner' })
    setTosChecked(false)
  }

  if (loading) return <div className="min-h-screen bg-[#07090D] flex items-center justify-center"><div className="text-[#1BBFA0] font-mono text-sm">Loading...</div></div>

  const filtered = GUIDES.filter(g => cat === 'all' || g.cat === cat)

  return (
    <div className="min-h-screen bg-[#07090D] text-white">
      <nav className="sticky top-0 z-50 bg-[#07090D]/90 backdrop-blur border-b border-white/5 px-8 py-4 flex items-center justify-between">
        <Link href="/home" className="font-black text-2xl tracking-widest">RDYODA<span className="text-[#1BBFA0]">.</span>GG</Link>
        <div className="flex items-center gap-6">
          <Link href="/home" className="text-sm text-gray-400 hover:text-white transition">Home</Link>
          <Link href="/guns" className="text-sm text-gray-400 hover:text-white transition">Guns</Link>
          <Link href="/guides" className="text-sm text-[#1BBFA0]">Guides</Link>
          <Link href="/credits" className="text-sm text-gray-400 hover:text-white transition">Credits</Link>
          <Link href="/attachments" className="text-sm text-gray-400 hover:text-white transition">Attachments</Link>
        </div>
        <a href="https://youtube.com/@Rdyoda9" target="_blank" className="text-xs text-yellow-400 border border-yellow-400/20 px-3 py-1.5 rounded-lg hover:bg-yellow-400/10 transition">▶ @Rdyoda9</a>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="font-black text-4xl mb-2">GUIDES</h1>
        <p className="text-gray-500 text-sm mb-8">Written and video guides from Rdyoda and the community.</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/5 pb-4">
          {[['articles', '◆ Articles'], ['videos', '▶ Videos']].map(([t, label]) => (
            <button key={t} onClick={() => setTab(t)}
              className={`text-sm font-semibold px-4 py-2 rounded-lg transition ${tab === t ? 'bg-[#1BBFA0]/10 text-[#1BBFA0] border border-[#1BBFA0]/30' : 'text-gray-500 hover:text-white'}`}>
              {label}
            </button>
          ))}
          <button onClick={() => { setSubmitOpen(true); setSubmitType(tab === 'videos' ? 'video' : 'article') }}
            className="ml-auto text-sm font-semibold px-4 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition">
            + Submit {tab === 'videos' ? 'Video' : 'Guide'}
          </button>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button onClick={() => setCat('all')}
            className={`text-xs px-3 py-1.5 rounded-full border transition ${cat === 'all' ? 'bg-[#1BBFA0] text-black border-[#1BBFA0] font-semibold' : 'border-white/10 text-gray-500 hover:text-white'}`}>
            All
          </button>
          {Object.entries(CAT_LABELS).map(([key, label]) => (
            <button key={key} onClick={() => setCat(key)}
              className={`text-xs px-3 py-1.5 rounded-full border transition ${cat === key ? 'bg-[#1BBFA0] text-black border-[#1BBFA0] font-semibold' : 'border-white/10 text-gray-500 hover:text-white'}`}>
              {label}
            </button>
          ))}
        </div>

        {tab === 'articles' && (
          <div className="flex flex-col gap-4">
            {filtered.map(g => (
              <div key={g.id} className={`bg-[#0D1219] border rounded-2xl p-6 transition ${g.pro ? 'border-purple-500/20' : 'border-white/5 hover:border-white/10'}`}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs font-mono px-2 py-0.5 rounded border ${CAT_COLORS[g.cat]}`}>{CAT_LABELS[g.cat]}</span>
                    {g.pro && <span className="text-xs font-mono px-2 py-0.5 rounded border text-purple-300 bg-purple-500/10 border-purple-500/20">PRO</span>}
                  </div>
                  <span className="text-xs text-gray-600 font-mono flex-shrink-0">{g.read} read</span>
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{g.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{g.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">By {g.author} · {g.date}</span>
                  {g.pro
                    ? <button className="text-xs text-purple-300 border border-purple-500/30 px-3 py-1.5 rounded-lg hover:bg-purple-500/10 transition">Unlock with Pro</button>
                    : <button className="text-xs text-[#1BBFA0] border border-[#1BBFA0]/30 px-3 py-1.5 rounded-lg hover:bg-[#1BBFA0]/10 transition">Read guide →</button>
                  }
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'videos' && (
          <div className="text-center py-16 text-gray-600">
            <div className="text-4xl mb-4">▶</div>
            <div className="font-semibold mb-2">Video guides coming soon</div>
            <div className="text-sm">Submit your own video guide using the button above.</div>
          </div>
        )}
      </div>

      {/* Submit modal */}
      {submitOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0D1219] border border-white/10 rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="font-black text-xl">SUBMIT {submitType === 'video' ? 'VIDEO' : 'GUIDE'}</div>
              <button onClick={() => { setSubmitOpen(false); setSubmitMsg('') }} className="text-gray-500 hover:text-white text-xl">×</button>
            </div>

            <div className="flex gap-2 mb-4">
              {[['article', 'Article'], ['video', 'Video']].map(([t, label]) => (
                <button key={t} onClick={() => setSubmitType(t)}
                  className={`flex-1 py-2 rounded-lg border text-sm font-semibold transition ${submitType === t ? 'bg-[#1BBFA0]/10 border-[#1BBFA0]/40 text-[#1BBFA0]' : 'border-white/10 text-gray-500'}`}>
                  {label}
                </button>
              ))}
            </div>

            <input value={form.title} onChange={e => setForm({...form, title: e.target.value})}
              placeholder="Guide title"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm mb-3 outline-none focus:border-[#1BBFA0]/40 transition" />

            <select value={form.cat} onChange={e => setForm({...form, cat: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm mb-3 outline-none focus:border-[#1BBFA0]/40 transition">
              {Object.entries(CAT_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>

            {submitType === 'video'
              ? <input value={form.video_url} onChange={e => setForm({...form, video_url: e.target.value})}
                  placeholder="YouTube video URL"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm mb-3 outline-none focus:border-[#1BBFA0]/40 transition" />
              : <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})}
                  placeholder="Write your guide here..."
                  rows={6}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm mb-3 outline-none focus:border-[#1BBFA0]/40 transition resize-none" />
            }

            <div className="bg-white/3 border border-white/8 rounded-xl p-4 mb-4 text-xs text-gray-500 leading-relaxed max-h-32 overflow-y-auto">
              <div className="font-semibold text-gray-400 mb-2">Submission Guidelines</div>
              By submitting you agree that your content is original, accurate, and not copied from other sources. Rdyoda reserves the right to reject any submission for any reason. Approved guides may be edited for clarity.
            </div>

            <label className="flex items-center gap-3 mb-4 cursor-pointer">
              <input type="checkbox" checked={tosChecked} onChange={e => setTosChecked(e.target.checked)} className="w-4 h-4" />
              <span className="text-xs text-gray-400">I agree to the submission guidelines</span>
            </label>

            {submitMsg && <div className="text-xs font-mono text-[#1BBFA0] mb-3">{submitMsg}</div>}

            <button onClick={handleSubmit} disabled={!tosChecked || submitting}
              className="w-full bg-[#1BBFA0]/20 border border-[#1BBFA0]/40 text-[#1BBFA0] font-semibold py-3 rounded-xl hover:bg-[#1BBFA0]/30 transition disabled:opacity-40 disabled:cursor-not-allowed">
              {submitting ? 'Submitting...' : 'Submit for review →'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}