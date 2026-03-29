import { useNavigate, useParams } from 'react-router-dom'
import startups from '../data/startups.js'

const stageLabels = {
  idea: 'Idea',
  mvp: 'MVP',
  early_revenue: 'Early Revenue',
  scaling: 'Scaling',
}

function StartupProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const startup = startups.find((s) => s.id === parseInt(id, 10))

  if (!startup) {
    return (
      <main className="page page--narrow empty-state">
        <h1>Startup not found</h1>
      </main>
    )
  }

  return (
    <main className="page page--narrow">
      <section className="profile-layout">
        <header className="panel startup-hero">
          <span className="eyebrow">Startup Profile</span>
          <h1>{startup.name}</h1>
          <p className="startup-hero__tagline">{startup.tagline}</p>
          <div className="startup-meta-grid">
            <div className="info-item">
              <span>Stage</span>
              <strong>{stageLabels[startup.stage] || startup.stage}</strong>
            </div>
            <div className="info-item">
              <span>Funding</span>
              <strong>{startup.financials?.funding_needed || startup.funding}</strong>
            </div>
            <div className="info-item">
              <span>Location</span>
              <strong>{startup.location}</strong>
            </div>
            <div className="info-item">
              <span>Industry</span>
              <strong>{startup.industry}</strong>
            </div>
          </div>
        </header>

        <section className="panel startup-section">
          <h2>Problem</h2>
          <p>{startup.problem}</p>
        </section>

        <section className="panel startup-section">
          <h2>Solution</h2>
          <p>{startup.solution}</p>
        </section>

        <section className="panel startup-section">
          <h2>Market</h2>
          <div className="tag-list">
            {Array.isArray(startup.market) ? (
              startup.market.map((marketTag) => (
                <span key={marketTag} className="tag-chip">
                  {marketTag}
                </span>
              ))
            ) : (
              <p>{startup.market}</p>
            )}
          </div>
        </section>

        <section className="panel startup-section">
          <h2>Traction</h2>
          <div className="info-grid">
            <div className="info-item">
              <span>Users</span>
              <strong>{startup.traction?.users}</strong>
            </div>
            <div className="info-item">
              <span>Revenue</span>
              <strong>{startup.traction?.revenue}</strong>
            </div>
            <div className="info-item">
              <span>Growth</span>
              <strong>{startup.traction?.growth}</strong>
            </div>
          </div>
        </section>

        <section className="panel startup-section">
          <h2>Team</h2>
          <div className="team-grid">
            {startup.team?.map((member) => (
              <article key={`${member.name}-${member.role}`} className="subpanel">
                <h3>{member.name}</h3>
                <p className="team-member__role">{member.role}</p>
                <p>{member.bio}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel startup-section">
          <h2>Financials</h2>
          <div className="info-grid">
            <div className="info-item">
              <span>Funding Needed</span>
              <strong>{startup.financials?.funding_needed}</strong>
            </div>
            <div className="info-item">
              <span>Revenue</span>
              <strong>{startup.financials?.revenue}</strong>
            </div>
            <div className="info-item">
              <span>Burn Rate</span>
              <strong>{startup.financials?.burn_rate}</strong>
            </div>
            <div className="info-item">
              <span>Runway</span>
              <strong>{startup.financials?.runway}</strong>
            </div>
          </div>
        </section>

        <section className="panel startup-section">
          <h2>Competitors</h2>
          <div className="tag-list">
            {startup.competitors?.map((competitor) => {
              const competitorName =
                typeof competitor === 'string' ? competitor : competitor.name

              return (
                <span key={competitorName} className="tag-chip tag-chip--muted">
                  {competitorName}
                </span>
              )
            })}
          </div>
        </section>

        <div>
          <button
            className="button-primary"
            type="button"
            onClick={() => navigate('/messages')}
          >
            Contact Founder
          </button>
        </div>
      </section>
    </main>
  )
}

export default StartupProfile
