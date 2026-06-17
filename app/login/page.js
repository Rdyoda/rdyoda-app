'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push('/home')
    })
  }, [])

  async function handleLogin() {
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) { setError(error.message); return }
    router.push('/home')
  }

  return (
    <div className="min-h-screen bg-[#07090D] flex flex-col items-center justify-center">
      <div className="text-center mb-12">
        <div className="font-black text-5xl tracking-widest text-white mb-2">
          RDYODA<span className="text-[#1BBFA0]">.</span>GG
        </div>
        <div className="text-xs text-gray-500 tracking-widest uppercase">BRM5 Loadout Hub · Early Access</div>
      </div>

      <div className="text-center mb-10 px-6">
        <div className="text-4xl font-black text-white tracking-wide mb-3">SOMETHING IS COMING</div>
        <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
          A community hub for BRM5 — loadout builder, gun database, guides, and more. Built by a Platinum 5 creator for players who want to actually get better.
        </p>
      </div>

      <div className="flex gap-3 mb-16">
        <a href="https://youtube.com/@Rdyoda9" target="_blank"
          className="px-6 py-3 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-sm font-semibold rounded-xl hover:bg-yellow-400/20 transition">
          ▶ Follow @Rdyoda9
        </a>
        <a href="https://discord.gg" target="_blank"
          className="px-6 py-3 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm font-semibold rounded-xl hover:bg-indigo-500/20 transition">
          💬 Join the Discord
        </a>
      </div>

      <div id="admin-modal" className="w-full max-w-sm px-6">
        <div className="bg-[#0D1219] border border-purple-500/20 rounded-2xl p-8">
          <div className="text-2xl font-black text-white tracking-wide mb-1">ADMIN LOGIN</div>
          <div className="text-xs text-gray-500 font-mono tracking-widest mb-6">Authorized personnel only</div>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm mb-3 outline-none focus:border-purple-500/50 transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm mb-3 outline-none focus:border-purple-500/50 transition"
          />
          {error && <div className="text-red-400 text-xs font-mono mb-3">{error}</div>}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-purple-500/20 border border-purple-500/30 text-purple-300 font-semibold py-3 rounded-xl hover:bg-purple-500/30 transition disabled:opacity-50">
            {loading ? 'Logging in...' : 'Log in →'}
          </button>
        </div>
      </div>
    </div>
  )
}