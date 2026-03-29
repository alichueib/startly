import { useNavigate } from 'react-router-dom'

function StartupCard({ startup }) {
  const navigate = useNavigate()

  return (
    <article className="startup-card">
      <h2>{startup.name}</h2>
      <p className="startup-card__industry">{startup.industry}</p>
      <p className="startup-card__description">{startup.description}</p>
      <div className="startup-card__meta">
        <p>
          <span>Funding</span> {startup.funding}
        </p>
        <p>
          <span>Location</span> {startup.location}
        </p>
      </div>
      <button
        className="button-primary"
        type="button"
        onClick={() => navigate(`/startup/${startup.id}`)}
      >
        View Startup
      </button>
    </article>
  )
}

export default StartupCard
