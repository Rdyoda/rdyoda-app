'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminPage() {
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const [tab, setTab] = useState('guides')
  const [guides, setGuides] = useState([])
  const [pending, setPending] = useState([])
  const [users, setUsers] = useState([])
  const [changelog, setChangelog] = useState([])
  const [newEntry, setNewEntry] = useState({ patch: '', official: '', reaction: '', loadout_changes: '' })
  const [newGuide, setNewGuide] = useState({ title: '', cat: 'beginner', content: '', pro: false })
  const [editingGuide, setEditingGuide] = useState(null)
  const [toast, setToast] = useState('')
  const router = useRouter()

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/login'); return }
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
      if (!profile?.is_pro) { router.push('/home'); return }
      setAuthorized(true)
      loadData()
      setLoading(false)
    }
    init()
  }, [])

  async function loadData() {
    const { data: subs } = await supabase.from('guide_submissions').select('*').order('submitted_at', { ascending: false })
    if (subs) setPending(subs.filter(s => s.status === 'pending'))
    const { data: profiles } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })
    if (profiles) setUsers(profiles)
    const { data: cl } = await supabase.from('changelog').select('*').order('created_at', { ascending: false })
    if (cl) setChangelog(cl)
  }

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  async function approveSubmission(id) {
    await supabase.from('guide_submissions').update({ status: 'approved' }).eq('id', id)
    setPending(pending.filter(p => p.id !== id))
    showToast('Guide approved')
  }

  async function rejectSubmission(id) {
    await supabase.from('guide_submissions').update({ status: 'rejected' }).eq('id', id)
    setPending(pending.filter(p => p.id !== id))
    showToast('Guide rejected')
  }

  async function togglePro(userId, current) {
    await supabase.from('profiles').update({ is_pro: !current }).eq('id', userId)
    setUsers(users.map(u => u.id === userId ? { ...u, is_pro: !current } : u))
    showToast(!current ? 'Pro granted' : 'Pro revoked')
  }

  async function publishChangelog() {
    if (!newEntry.patch.trim() || !newEntry.reaction.trim()) {
      showToast('Patch version and your reaction are required')
      return
    }
    const { error } = await supabase.from('changelog').insert({
      patch: newEntry.patch,
      official_notes: newEntry.official,
      rdyoda_reaction: newEntry.reaction,
      loadout_changes: newEntry.loadout_changes,
    })
    if (error) { showToast('Error: ' + error.message); return }
    setNewEntry({ patch: '', official: '', reaction: '', loadout_changes: '' })
    loadData()
    showToast('Changelog entry published')
  }

  async function deleteChangelog(id) {
    await supabase.from('changelog').delete().eq('id', id)
    setChangelog(changelog.filter(c => c.id !== id))
    showToast('Entry deleted')
  }

  if (loading) return (
    <div className="min-h-screen bg-[#07090D] flex items-center justify-center">
      <div className="text-[#1BBFA0] font-mono text-sm">Loading...</div>
    </div>
  )

  if (!authorized) return null

  return (
    <div className="min-h-screen bg-[#07090D] text-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#07090D]/90 backdrop-blur border-b border-white/5 px-8 py-4 flex items-center justify-between">
        <Link href="/home" className="font-black text-2xl tracking-widest">RDYODA<span className="text-[#1BBFA0]">.</span>GG</Link>
        <div className="flex items-center gap-2">
          <span className="text-xs text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-lg font-mono">⚙ ADMIN</span>
          <Link href="/home" className="text-sm text-gray-400 hover:text-white transition ml-4">← Back to site</Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="font-black text-4xl mb-2">ADMIN PANEL</h1>
        <p className="text-gray-500 text-sm mb-8">Manage site content, users, and submissions.</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/5 pb-4 flex-wrap">
          {[
            ['guides', '📖 Guides'],
            ['pending', `📥 Pending ${pending.length > 0 ? `(${pending.length})` : ''}`],
            ['changelog', '📋 Changelog'],
            ['users', '👥 Users'],
          ].map(([t, label]) => (
            <button key={t} onClick={() => setTab(t)}
              className={`text-sm font-semibold px-4 py-2 rounded-lg transition ${tab === t ? 'bg-[#1BBFA0]/10 text-[#1BBFA0] border border-[#1BBFA0]/30' : 'text-gray-500 hover:text-white'}`}>
              {label}
            </button>
          ))}
        </div>

        {/* GUIDES TAB */}
        {tab === 'guides' && (
          <div>
            <div className="bg-[#0D1219] border border-white/5 rounded-2xl p-6 mb-6">
              <div className="font-bold text-lg mb-4">Add New Guide</div>
              <input value={newGuide.title} onChange={e => setNewGuide({...newGuide, title: e.target.value})}
                placeholder="Guide title"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm mb-3 outline-none focus:border-[#1BBFA0]/40 transition" />
              <div className="flex gap-3 mb-3">
                <select value={newGuide.cat} onChange={e => setNewGuide({...newGuide, cat: e.target.value})}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none">
                  {['beginner','pvp','openworld','zombies','loadout'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                  <input type="checkbox" checked={newGuide.pro} onChange={e => setNewGuide({...newGuide, pro: e.target.checked})} />
                  Pro only
                </label>
              </div>
              <textarea value={newGuide.content} onChange={e => setNewGuide({...newGuide, content: e.target.value})}
                placeholder="Write your guide content here..."
                rows={8}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm mb-3 outline-none focus:border-[#1BBFA0]/40 transition resize-none" />
              <button onClick={async () => {
                if (!newGuide.title.trim()) { showToast('Title required'); return }
                const { data: { session } } = await supabase.auth.getSession()
                const { error } = await supabase.from('guide_submissions').insert({
                  user_id: session.user.id,
                  type: 'article',
                  title: newGuide.title,
                  cat: newGuide.cat,
                  content: newGuide.content,
                  status: 'approved',
                })
                if (error) { showToast('Error: ' + error.message); return }
                setNewGuide({ title: '', cat: 'beginner', content: '', pro: false })
                showToast('Guide published')
              }}
                className="px-6 py-3 bg-[#1BBFA0]/20 border border-[#1BBFA0]/40 text-[#1BBFA0] font-semibold rounded-xl hover:bg-[#1BBFA0]/30 transition text-sm">
                Publish Guide →
              </button>
            </div>
          </div>
        )}

        {/* PENDING TAB */}
        {tab === 'pending' && (
          <div>
            {pending.length === 0 ? (
              <div className="text-center py-16 text-gray-600">
                <div className="text-4xl mb-3">📥</div>
                <div className="font-semibold">No pending submissions</div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {pending.map(sub => (
                  <div key={sub.id} className="bg-[#0D1219] border border-white/5 rounded-2xl p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="font-bold text-white mb-1">{sub.title}</div>
                        <div className="text-xs text-gray-500 font-mono">{sub.type} · {sub.cat} · {new Date(sub.submitted_at).toLocaleDateString()}</div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button onClick={() => approveSubmission(sub.id)}
                          className="text-xs px-3 py-1.5 bg-[#1BBFA0]/20 border border-[#1BBFA0]/40 text-[#1BBFA0] rounded-lg hover:bg-[#1BBFA0]/30 transition font-semibold">
                          Approve
                        </button>
                        <button onClick={() => rejectSubmission(sub.id)}
                          className="text-xs px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20 transition font-semibold">
                          Reject
                        </button>
                      </div>
                    </div>
                    {sub.content && (
                      <div className="text-sm text-gray-500 leading-relaxed max-h-32 overflow-y-auto bg-white/3 rounded-xl p-3">
                        {sub.content}
                      </div>
                    )}
                    {sub.video_url && (
                      <a href={sub.video_url} target="_blank" className="text-xs text-[#1BBFA0] hover:underline">{sub.video_url}</a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CHANGELOG TAB */}
        {tab === 'changelog' && (
          <div>
            <div className="bg-[#0D1219] border border-white/5 rounded-2xl p-6 mb-6">
              <div className="font-bold text-lg mb-4">New Patch Entry</div>
              <input value={newEntry.patch} onChange={e => setNewEntry({...newEntry, patch: e.target.value})}
                placeholder="Patch version (e.g. v2.4.1)"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm mb-3 outline-none focus:border-[#1BBFA0]/40 transition" />
              <textarea value={newEntry.official} onChange={e => setNewEntry({...newEntry, official: e.target.value})}
                placeholder="Official patch notes (paste from devs)..."
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm mb-3 outline-none focus:border-[#1BBFA0]/40 transition resize-none" />
              <textarea value={newEntry.reaction} onChange={e => setNewEntry({...newEntry, reaction: e.target.value})}
                placeholder="Your reaction — what actually matters, what's overblown, your honest take..."
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm mb-3 outline-none focus:border-[#1BBFA0]/40 transition resize-none" />
              <textarea value={newEntry.loadout_changes} onChange={e => setNewEntry({...newEntry, loadout_changes: e.target.value})}
                placeholder="Did any of your loadouts change because of this patch? If yes, what and why. If no, why you're staying put."
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm mb-3 outline-none focus:border-[#1BBFA0]/40 transition resize-none" />
              <button onClick={publishChangelog}
                className="px-6 py-3 bg-[#1BBFA0]/20 border border-[#1BBFA0]/40 text-[#1BBFA0] font-semibold rounded-xl hover:bg-[#1BBFA0]/30 transition text-sm">
                Publish Entry →
              </button>
            </div>

            {changelog.length > 0 && (
              <div className="flex flex-col gap-4">
                <div className="text-xs text-gray-600 uppercase tracking-widest font-mono">Published entries</div>
                {changelog.map(entry => (
                  <div key={entry.id} className="bg-[#0D1219] border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-bold text-[#1BBFA0]">{entry.patch}</div>
                      <button onClick={() => deleteChangelog(entry.id)}
                        className="text-xs text-red-400 hover:text-red-300 transition">Delete</button>
                    </div>
                    <div className="text-sm text-gray-500">{entry.rdyoda_reaction?.slice(0, 150)}...</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* USERS TAB */}
        {tab === 'users' && (
          <div>
            {users.length === 0 ? (
              <div className="text-center py-16 text-gray-600">No users yet</div>
            ) : (
              <div className="flex flex-col gap-3">
                {users.map(u => (
                  <div key={u.id} className="bg-[#0D1219] border border-white/5 rounded-xl px-5 py-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white text-sm">{u.username || 'No username'}</div>
                      <div className="text-xs text-gray-600 font-mono">{u.id.slice(0, 8)}...</div>
                    </div>
                    <div className="flex items-center gap-3">
                      {u.is_pro && <span className="text-xs text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded font-mono">PRO</span>}
                      <button onClick={() => togglePro(u.id, u.is_pro)}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition ${u.is_pro ? 'border-red-500/30 text-red-400 hover:bg-red-500/10' : 'border-[#1BBFA0]/30 text-[#1BBFA0] hover:bg-[#1BBFA0]/10'}`}>
                        {u.is_pro ? 'Revoke Pro' : 'Grant Pro'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#0D1219] border border-[#1BBFA0]/30 text-[#1BBFA0] text-sm font-mono px-4 py-3 rounded-xl shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  )
}