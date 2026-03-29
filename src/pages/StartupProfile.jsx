import { useNavigate, useParams } from 'react-router-dom'
import startups from '../data/startups.js'

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
        <header className="panel">
          <span className="eyebrow">Startup Profile</span>
          <h1>{startup.name}</h1>
        </header>

        <section className="panel">
          <h2>Overview</h2>
          <div className="info-grid">
            <div className="info-item">
              <span>Industry</span>
              <strong>{startup.industry}</strong>
            </div>
            <div className="info-item">
              <span>Location</span>
              <strong>{startup.location}</strong>
            </div>
            <div className="info-item">
              <span>Funding</span>
              <strong>{startup.funding}</strong>
            </div>
          </div>
        </section>

        <section className="panel">
          <h2>Description</h2>
          <p>{startup.description}</p>
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
