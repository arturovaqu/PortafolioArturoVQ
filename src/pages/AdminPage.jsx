import { useState, useEffect, useMemo } from 'react'
import { Search, Mail, Calendar, Users } from 'lucide-react'
import { supabase } from '../lib/supabase'

// ── Helpers ───────────────────────────────────────────────────────────────────
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

function startOf(unit) {
  const d = new Date()
  if (unit === 'today') {
    d.setHours(0, 0, 0, 0)
  } else if (unit === 'week') {
    const day = d.getDay()
    d.setDate(d.getDate() - day)
    d.setHours(0, 0, 0, 0)
  }
  return d
}

const controlCls =
  'bg-surface text-foreground text-xs border border-surface ' +
  'focus:border-muted focus:outline-none transition-colors rounded-sm px-3 py-2'

// ── Login ─────────────────────────────────────────────────────────────────────
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
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
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
  const [rows, setRows]           = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState('')
  const [searchQuery, setSearch]  = useState('')
  const [sortOrder, setSortOrder] = useState('desc')
  const [dateFilter, setDate]     = useState('all')

  useEffect(() => {
    async function fetchMessages() {
      const { data, error } = await supabase
        .from('mensajes')
        .select('*, usuarios(nombre, email)')

      if (error) setError(error.message)
      else setRows(data)
      setLoading(false)
    }
    fetchMessages()
  }, [])

  // Unique user count
  const uniqueUsersCount = useMemo(() => {
    const emails = rows
      .map(r => r.usuarios?.email)
      .filter(Boolean)
    return new Set(emails).size
  }, [rows])

  // Filtered + sorted messages
  const filtered = useMemo(() => {
    let result = [...rows]

    // Text search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(r =>
        r.usuarios?.nombre?.toLowerCase().includes(q) ||
        r.usuarios?.email?.toLowerCase().includes(q)  ||
        r.concepto?.toLowerCase().includes(q)          ||
        r.mensaje?.toLowerCase().includes(q)
      )
    }

    // Date filter
    if (dateFilter !== 'all') {
      const since = startOf(dateFilter)
      result = result.filter(r => r.creado_en && new Date(r.creado_en) >= since)
    }

    // Sort
    result.sort((a, b) => {
      const ta = a.creado_en ? new Date(a.creado_en).getTime() : 0
      const tb = b.creado_en ? new Date(b.creado_en).getTime() : 0
      return sortOrder === 'desc' ? tb - ta : ta - tb
    })

    return result
  }, [rows, searchQuery, sortOrder, dateFilter])

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-muted text-xs uppercase tracking-widest mb-1">Admin</p>
            <h1 className="text-foreground font-black uppercase text-3xl md:text-4xl tracking-tight">
              Mensajes recibidos
            </h1>
          </div>

          {/* Metric card */}
          <div className="flex items-center gap-3 bg-surface border border-surface rounded-xl px-5 py-4 self-start sm:self-auto">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Users size={15} className="text-primary" />
            </div>
            <div>
              <p className="text-muted text-xs uppercase tracking-widest leading-none mb-1">
                Usuarios únicos
              </p>
              <p className="text-foreground font-black text-2xl tabular-nums leading-none">
                {loading ? '—' : uniqueUsersCount}
              </p>
            </div>
          </div>
        </div>

        {/* ── Controls ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar por nombre, email, concepto o mensaje…"
              value={searchQuery}
              onChange={e => setSearch(e.target.value)}
              className={`${controlCls} w-full pl-8`}
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <Calendar size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            <select
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
              className={`${controlCls} pl-8 pr-6 appearance-none cursor-pointer`}
            >
              <option value="desc">Más recientes primero</option>
              <option value="asc">Más antiguos primero</option>
            </select>
          </div>

          {/* Date filter */}
          <select
            value={dateFilter}
            onChange={e => setDate(e.target.value)}
            className={`${controlCls} cursor-pointer`}
          >
            <option value="all">Todas las fechas</option>
            <option value="today">Hoy</option>
            <option value="week">Esta semana</option>
          </select>
        </div>

        {/* ── States ── */}
        {loading && <p className="text-muted text-sm">Cargando...</p>}
        {error   && <p className="text-red-400 text-sm">{error}</p>}
        {!loading && !error && filtered.length === 0 && (
          <p className="text-muted text-sm">
            {rows.length === 0 ? 'No hay mensajes todavía.' : 'Ningún mensaje coincide con los filtros.'}
          </p>
        )}

        {/* ── Message cards ── */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(row => (
              <div
                key={row.id}
                className="bg-surface border border-surface rounded-xl p-5 flex flex-col gap-4 hover:border-muted transition-colors"
              >
                {/* Date */}
                <div className="flex items-center gap-1.5 text-muted text-xs tabular-nums">
                  <Calendar size={11} />
                  {formatDate(row.creado_en)}
                </div>

                {/* Sender */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Users size={14} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-foreground font-semibold text-sm truncate">
                      {row.usuarios?.nombre ?? '—'}
                    </p>
                    <p className="text-muted text-xs truncate">
                      {row.usuarios?.email ?? '—'}
                    </p>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <p className="text-muted text-xs uppercase tracking-widest mb-1">Concepto</p>
                  <p className="text-primary font-semibold text-sm">{row.concepto}</p>
                </div>

                {/* Message */}
                <div className="flex-1">
                  <p className="text-muted text-xs uppercase tracking-widest mb-1">Mensaje</p>
                  <p className="text-foreground text-sm leading-relaxed line-clamp-4">{row.mensaje}</p>
                </div>

                {/* Reply button */}
                <a
                  href={`mailto:${row.usuarios?.email ?? ''}?subject=Re: ${encodeURIComponent(row.concepto ?? '')}`}
                  className="inline-flex items-center gap-2 self-start bg-primary text-black font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-full hover:opacity-90 transition-opacity mt-auto"
                >
                  <Mail size={11} />
                  Responder
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Result count */}
        {!loading && !error && rows.length > 0 && (
          <p className="text-muted text-xs mt-6 tabular-nums">
            Mostrando {filtered.length} de {rows.length} mensaje{rows.length !== 1 ? 's' : ''}
          </p>
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
