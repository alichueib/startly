import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StartupCard from '../components/StartupCard.jsx'
import startups from '../data/startups.js'
import { getSavedStartupIds, toggleSavedStartup } from '../data/savedStartups.js'

function SavedStartups() {
  const navigate = useNavigate()
  const [savedIds, setSavedIds] = useState(getSavedStartupIds())
  const [comparisonIds, setComparisonIds] = useState([])

  useEffect(() => {
    const handleSavedChange = () => {
      setSavedIds(getSavedStartupIds())
    }

    window.addEventListener('savedStartupsChanged', handleSavedChange)

    return () => {
      window.removeEventListener('savedStartupsChanged', handleSavedChange)
    }
  }, [])

  const savedStartups = startups.filter((startup) => savedIds.includes(startup.id))

  const handleToggleCompare = (startupId) => {
    setComparisonIds((currentIds) =>
      currentIds.includes(startupId)
        ? currentIds.filter((id) => id !== startupId)
        : currentIds.length < 3
          ? [...currentIds, startupId]
          : currentIds,
    )
  }

  return (
    <main className="page">
      <header className="page__header saved-header">
        <div>
          <span className="eyebrow">Investor Workspace</span>
          <h1>Saved Startups</h1>
        </div>
        <button
          className="button-primary"
          type="button"
          disabled={comparisonIds.length < 2}
          onClick={() => navigate(`/compare?ids=${comparisonIds.join(',')}&from=saved`)}
        >
          Compare ({comparisonIds.length}/3)
        </button>
      </header>

      {savedStartups.length > 0 ? (
        <section className="card-grid">
          {savedStartups.map((startup) => (
            <StartupCard
              key={startup.id}
              startup={{
                ...startup,
                isSaved: true,
                onToggleSave: () => toggleSavedStartup(startup.id),
                isSelectedForCompare: comparisonIds.includes(startup.id),
                compareDisabled:
                  comparisonIds.length >= 3 && !comparisonIds.includes(startup.id),
                onToggleCompare: handleToggleCompare,
              }}
            />
          ))}
        </section>
      ) : (
        <section className="panel empty-state">
          <h2>No saved startups yet</h2>
        </section>
      )}
    </main>
  )
}

export default SavedStartups
