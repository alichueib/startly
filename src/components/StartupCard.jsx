import { useNavigate } from 'react-router-dom'

const stageLabels = {
  idea: 'Idea',
  mvp: 'MVP',
  early_revenue: 'Early Revenue',
  scaling: 'Scaling',
}

function StartupCard({ startup }) {
  const navigate = useNavigate()

  return (
    <article className="startup-card">
      <h2>{startup.name}</h2>
      <div className="startup-card__tags">
        <span className="tag-chip tag-chip--muted">{stageLabels[startup.stage]}</span>
      </div>
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
      <div className="startup-card__actions">
        <button
          className="button-primary"
          type="button"
          onClick={() => navigate(`/startup/${startup.id}`)}
        >
          View Startup
        </button>
        {typeof startup.isSelectedForCompare === 'boolean' ? (
          <button
            className={`button-secondary ${
              startup.isSelectedForCompare ? 'button-secondary--active' : ''
            }`}
            type="button"
            onClick={() => startup.onToggleCompare(startup.id)}
            disabled={!startup.isSelectedForCompare && startup.compareDisabled}
          >
            {startup.isSelectedForCompare ? 'Selected' : 'Compare'}
          </button>
        ) : null}
        {typeof startup.isSaved === 'boolean' ? (
          <button
            className={`save-button ${startup.isSaved ? 'save-button--active' : ''}`}
            type="button"
            onClick={() => startup.onToggleSave(startup.id)}
          >
            {startup.isSaved ? 'Saved' : 'Save'}
          </button>
        ) : null}
      </div>
    </article>
  )
}

export default StartupCard
