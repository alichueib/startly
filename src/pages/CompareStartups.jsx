import { Link, useSearchParams } from 'react-router-dom'
import startups from '../data/startups.js'

const stageLabels = {
  idea: 'Idea',
  mvp: 'MVP',
  early_revenue: 'Early Revenue',
  scaling: 'Scaling',
}

function CompareStartups() {
  const [searchParams] = useSearchParams()
  const source = searchParams.get('from') || 'browse'
  const selectedIds =
    searchParams
      .get('ids')
      ?.split(',')
      .map((id) => Number(id))
      .filter(Boolean) || []

  const selectedStartups = startups.filter((startup) =>
    selectedIds.includes(startup.id),
  )

  if (selectedStartups.length === 0) {
    return (
      <main className="page">
        <section className="panel empty-state">
          <h1>No startups selected</h1>
          <Link className="button-secondary" to={source === 'saved' ? '/saved' : '/browse'}>
            Back
          </Link>
        </section>
      </main>
    )
  }

  const comparisonRows = [
    { label: 'Name', render: (startup) => startup.name },
    { label: 'Tagline', render: (startup) => startup.tagline },
    {
      label: 'Stage',
      render: (startup) => stageLabels[startup.stage] || startup.stage,
    },
    {
      label: 'Market',
      render: (startup) => startup.market?.join(', '),
    },
    {
      label: 'Traction',
      render: (startup) =>
        `${startup.traction?.users} | ${startup.traction?.revenue} | ${startup.traction?.growth}`,
    },
    {
      label: 'Funding Needed',
      render: (startup) => startup.financials?.funding_needed || startup.funding,
    },
    {
      label: 'Team Size',
      render: (startup) => `${startup.team?.length || 0} members`,
    },
    {
      label: 'Location',
      render: (startup) => startup.location,
    },
  ]

  return (
    <main className="page">
      <header className="page__header compare-header">
        <div>
          <span className="eyebrow">Investor Comparison</span>
          <h1>Compare Startups</h1>
        </div>
        <Link className="button-secondary" to={source === 'saved' ? '/saved' : '/browse'}>
          Back
        </Link>
      </header>

      <section className="panel compare-table-wrap">
        <table className="compare-table">
          <thead>
            <tr>
              <th>Criteria</th>
              {selectedStartups.map((startup) => (
                <th key={startup.id}>{startup.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.label}>
                <th>{row.label}</th>
                {selectedStartups.map((startup) => (
                  <td key={`${startup.id}-${row.label}`}>{row.render(startup)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default CompareStartups
