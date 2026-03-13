'use client'

import Link from 'next/link'
import { createBrowserClient } from '@/lib/supabase/browser'
import { checkSupabaseReadiness } from '@/lib/supabase/browser'
import { logger } from '@/lib/logger'

export default function HomePage() {
  const handleCheckSupabase = async () => {
    const client = createBrowserClient()
    const status = await checkSupabaseReadiness()

    if (!status.ok) {
      logger.warn('Supabase readiness check returned error', {
        error: status.error,
        elapsedMs: status.elapsedMs,
      })
    } else {
      logger.info('Supabase Browser Client ready', { elapsedMs: status.elapsedMs })
    }

    // Keep the reference in place to ensure browser client initializes.
    void client
  }

  return (
    <main className="page-container stack">
      <header>
        <h1 className="page-title">S Vote</h1>
        <p className="page-subtitle">Create anonymous polls and share result links with token access.</p>
      </header>

      <section className="card stack" aria-label="Primary actions">
        <h2 className="card-title">Start quickly</h2>
        <div className="btn-row">
          <Link className="btn" href="/votes/create">
            Create a vote
          </Link>
          <button className="btn-secondary" type="button" onClick={handleCheckSupabase}>
            Check Supabase connection
          </button>
        </div>
      </section>

      <section className="card stack" aria-label="How it works">
        <h2 className="card-title">How token result URL works</h2>
        <p className="muted">1. Create vote without login.</p>
        <p className="muted">2. Copy the generated token result URL.</p>
        <p className="muted">3. Open that URL from any browser to view live results.</p>
      </section>
    </main>
  )
}
