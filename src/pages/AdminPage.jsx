import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

// ── Login screen ──────────────────────────────────────────────────────────────
function LoginGate({ onAuth }) {
  const [pwd, setPwd] = useState('')
  const [shake, setShake] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (pwd === '12345') {
      onAuth()
    } else {
      setShake(true)
      setPwd('')
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-sm flex flex-col gap-4 ${shake ? 'animate-shake' : ''}`}
      >
        <p className="text-foreground font-black uppercase text-2xl tracking-tight mb-2">
          Admin Access
        </p>
        <input
          type="password"
          placeholder="Password"
          value={pwd}
          onChange={e => setPwd(e.target.value)}
          autoFocus
          className="w-full bg-surface text-foreground text-sm px-4 py-3 rounded-sm border border-surface focus:border-muted focus:outline-none transition-colors placeholder:text-muted"
        />
        <button
          type="submit"
          className="bg-primary text-black font-bold text-xs uppercase tracking-widest px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
        >
          Enter
        </button>
      </form>

      {/* One-off shake animation */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-6px); }
          80%       { transform: translateX(6px); }
        }
        .animate-shake { animation: shake 0.45s ease-in-out; }
      `}</style>
    </div>
  )
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchMessages() {
      const { data, error } = await supabase
        .from('mensajes')
        .select('*, usuarios(nombre, email)')
        .order('creado_en', { ascending: false })

      if (error) {
        setError(error.message)
      } else {
        setRows(data)
      }
      setLoading(false)
    }
    fetchMessages()
  }, [])

  function formatDate(iso) {
    if (!iso) return '—'
    return new Date(iso).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="min-h-screen bg-black text-foreground px-6 py-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-muted text-xs uppercase tracking-widest mb-1">Admin</p>
          <h1 className="text-foreground font-black uppercase text-3xl md:text-4xl tracking-tight">
            Mensajes recibidos
          </h1>
        </div>
        <span className="text-muted text-xs tabular-nums">
          {!loading && `${rows.length} mensaje${rows.length !== 1 ? 's' : ''}`}
        </span>
      </div>

      <div className="max-w-7xl mx-auto">
        {loading && (
          <p className="text-muted text-sm">Cargando...</p>
        )}

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        {!loading && !error && rows.length === 0 && (
          <p className="text-muted text-sm">No hay mensajes todavía.</p>
        )}

        {!loading && !error && rows.length > 0 && (
          <div className="overflow-x-auto rounded-xl border border-surface">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-surface">
                  <th className="text-muted text-xs uppercase tracking-widest font-medium text-left px-5 py-3 whitespace-nowrap">Nombre</th>
                  <th className="text-muted text-xs uppercase tracking-widest font-medium text-left px-5 py-3 whitespace-nowrap">Email</th>
                  <th className="text-muted text-xs uppercase tracking-widest font-medium text-left px-5 py-3 whitespace-nowrap">Concepto</th>
                  <th className="text-muted text-xs uppercase tracking-widest font-medium text-left px-5 py-3 whitespace-nowrap">Mensaje</th>
                  <th className="text-muted text-xs uppercase tracking-widest font-medium text-left px-5 py-3 whitespace-nowrap">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.id}
                    className={`border-b border-surface last:border-0 ${
                      i % 2 === 0 ? 'bg-black' : 'bg-surface/30'
                    }`}
                  >
                    <td className="px-5 py-4 text-foreground font-medium whitespace-nowrap">
                      {row.usuarios?.nombre ?? '—'}
                    </td>
                    <td className="px-5 py-4 text-muted whitespace-nowrap">
                      {row.usuarios?.email ?? '—'}
                    </td>
                    <td className="px-5 py-4 text-primary font-semibold whitespace-nowrap">
                      {row.concepto}
                    </td>
                    <td className="px-5 py-4 text-muted max-w-xs">
                      <span className="line-clamp-2">{row.mensaje}</span>
                    </td>
                    <td className="px-5 py-4 text-muted whitespace-nowrap tabular-nums text-xs">
                      {formatDate(row.creado_en)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  if (!isAuthenticated) {
    return <LoginGate onAuth={() => setIsAuthenticated(true)} />
  }

  return <Dashboard />
}
