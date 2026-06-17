'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Nav from '../../components/Nav'

export default function ChangelogPage() {
  const [loading, setLoading] = useState(true)
  const [changelog, setChangelog] = useState([])
  const [expanded, setExpanded] = useState(null)
  const router = useRouter()

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/login'); return }
      const { data } = await supabase
        .from('changelog')
        .select('*')
        .order('created_at', { ascending: false })
      if (data) setChangelog(data)
      setLoading(false)
    }
    init()
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
        <h1 className="font-black text-4xl mb-2">PATCH CHANGELOG</h1>
        <p className="text-gray-500 text-sm mb-2">Official patch notes plus Rdyoda's honest reaction — what actually matters, what changed in the meta, and whether any loadouts shifted.</p>
        <div className="text-xs text-[#1BBFA0] font-mono mb-8">Updated by Rdyoda after every patch</div>

        {changelog.length === 0 ? (
          <div className="text-center py-20 text-gray-600">
            <div className="text-4xl mb-4">📋</div>
            <div className="font-semibold mb-2">No entries yet</div>
            <div className="text-sm">Check back after the next patch drops.</div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {changelog.map((entry, i) => (
              <div key={entry.id}
                className={`bg-[#0D1219] border rounded-2xl overflow-hidden transition-colors ${expanded === entry.id ? 'border-[#1BBFA0]/30' : 'border-white/5 hover:border-white/10'}`}>

                {/* Header */}
                <div className="px-6 py-5 flex items-center justify-between cursor-pointer"
                  onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}>
                  <div className="flex items-center gap-4">
                    {i === 0 && (
                      <span className="text-xs bg-[#1BBFA0] text-black font-bold px-2 py-0.5 rounded font-mono">LATEST</span>
                    )}
                    <div>
                      <div className="font-black text-xl text-[#1BBFA0]">{entry.patch}</div>
                      <div className="text-xs text-gray-600 font-mono mt-0.5">
                        {new Date(entry.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                  <span className={`text-gray-500 text-xs transition-transform ${expanded === entry.id ? 'rotate-180' : ''}`}>▼</span>
                </div>

                {/* Expanded content */}
                {expanded === entry.id && (
                  <div className="px-6 pb-6 border-t border-white/5">

                    {/* Official notes */}
                    {entry.official_notes && (
                      <div className="mt-5 mb-5">
                        <div className="text-xs text-gray-600 uppercase tracking-widest font-mono mb-3">Official patch notes</div>
                        <div className="bg-white/3 rounded-xl p-4 text-sm text-gray-400 leading-relaxed whitespace-pre-wrap border border-white/5">
                          {entry.official_notes}
                        </div>
                      </div>
                    )}

                    {/* Rdyoda's reaction */}
                    {entry.rdyoda_reaction && (
                      <div className="mb-5">
                        <div className="text-xs text-[#1BBFA0] uppercase tracking-widest font-mono mb-3">Rdyoda's take</div>
                        <div className="pl-4 border-l-2 border-[#1BBFA0]">
                          <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{entry.rdyoda_reaction}</p>
                        </div>
                      </div>
                    )}

                    {/* Loadout changes */}
                    {entry.loadout_changes && (
                      <div>
                        <div className="text-xs text-yellow-400 uppercase tracking-widest font-mono mb-3">Loadout impact</div>
                        <div className="bg-yellow-400/5 border border-yellow-400/10 rounded-xl p-4">
                          <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-wrap">{entry.loadout_changes}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}