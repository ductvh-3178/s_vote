import Link from 'next/link'
import { createVoteAction } from './actions'
import { CopyResultUrlButton } from './copy-result-url-button'

interface CreateVotePageProps {
  searchParams: Promise<{ error?: string; created?: string; resultUrl?: string; tokenExpiresAt?: string }>
}

export default async function CreateVotePage({ searchParams }: CreateVotePageProps) {
  const { error, created, resultUrl, tokenExpiresAt } = await searchParams
  const hasResultUrl = created === '1' && Boolean(resultUrl)

  return (
    <main className="page-container stack">
      <header>
        <h1 className="page-title">Create a vote</h1>
        <p className="page-subtitle">Anonymous flow: create poll, get token URL, share and track results.</p>
      </header>

      {hasResultUrl ? (
        <section className="card stack notice-success" aria-label="Vote created successfully">
          <p role="status">Vote created successfully.</p>
          <div className="field">
            <label htmlFor="resultUrl">Result URL</label>
            <input id="resultUrl" value={resultUrl} readOnly />
          </div>
          <div className="btn-row">
            <Link className="btn-secondary" href={resultUrl!}>
              Open result page
            </Link>
            <CopyResultUrlButton resultUrl={resultUrl!} />
          </div>
          {tokenExpiresAt ? <p className="muted">Token expires at: {new Date(tokenExpiresAt).toISOString()}</p> : null}
        </section>
      ) : null}

      {error ? (
        <section className="card notice-error" role="alert">
          Unable to create vote. Please verify your input.
        </section>
      ) : null}

      <form className="card form-grid" action={createVoteAction}>
        <div className="field">
          <label htmlFor="question">Question</label>
          <input id="question" name="question" required minLength={3} maxLength={1000} />
        </div>

        <div className="field">
          <label htmlFor="options">Options (one per line)</label>
          <textarea id="options" name="options" required rows={6} />
        </div>

        <div className="field">
          <label htmlFor="openTime">Open time (optional)</label>
          <input id="openTime" name="openTime" type="datetime-local" />
        </div>

        <div className="field">
          <label htmlFor="closeTime">Close time (optional)</label>
          <input id="closeTime" name="closeTime" type="datetime-local" />
        </div>

        <div className="field">
          <label htmlFor="expirationDays">Expiration days (1-30)</label>
          <input
            id="expirationDays"
            name="expirationDays"
            type="number"
            min={1}
            max={30}
            defaultValue={30}
          />
        </div>

        <div className="inline-field">
          <label className="inline-field">
            <input name="allowMultiple" type="checkbox" />
            Allow multiple selections
          </label>
        </div>

        <div className="inline-field">
          <label className="inline-field">
            <input name="requiresPassword" type="checkbox" />
            Require password for voters
          </label>
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" maxLength={255} />
        </div>

        <div className="btn-row">
          <button className="btn" type="submit">
            Create vote
          </button>
          <Link className="btn-secondary" href="/">
            Back to home
          </Link>
        </div>
      </form>
    </main>
  )
}
