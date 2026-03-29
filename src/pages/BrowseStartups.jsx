import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StartupCard from '../components/StartupCard.jsx'
import { getSavedStartupIds, toggleSavedStartup } from '../data/savedStartups.js'
import startups from '../data/startups.js'

const stageLabels = {
  idea: 'Idea',
  mvp: 'MVP',
  early_revenue: 'Early Revenue',
  scaling: 'Scaling',
}

const getFundingValue = (value) => {
  const match = String(value).match(/[\d.]+/)

  if (!match) {
    return 0
  }

  const numericValue = Number(match[0])
  const normalized = String(value).toLowerCase()

  if (normalized.includes('m')) {
    return numericValue * 1000000
  }

  if (normalized.includes('k')) {
    return numericValue * 1000
  }

  return numericValue
}

const formatFundingValue = (value) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1)}M`
  }

  if (value >= 1000) {
    return `$${Math.round(value / 1000)}k`
  }

  return `$${value}`
}

const toggleValue = (values, value) =>
  values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value]

function BrowseStartups() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndustries, setSelectedIndustries] = useState([])
  const [selectedStages, setSelectedStages] = useState([])
  const [selectedMarkets, setSelectedMarkets] = useState([])
  const [selectedLocation, setSelectedLocation] = useState('')
  const [comparisonIds, setComparisonIds] = useState([])
  const [savedIds, setSavedIds] = useState(getSavedStartupIds())

  const fundingValues = startups.map((startup) =>
    getFundingValue(startup.financials?.funding_needed || startup.funding),
  )
  const maxFunding = Math.max(...fundingValues)

  const [fundingRange, setFundingRange] = useState([0, maxFunding])

  useEffect(() => {
    const handleSavedChange = () => {
      setSavedIds(getSavedStartupIds())
    }

    window.addEventListener('savedStartupsChanged', handleSavedChange)

    return () => {
      window.removeEventListener('savedStartupsChanged', handleSavedChange)
    }
  }, [])

  const industries = [...new Set(startups.map((startup) => startup.industry))]
  const stages = [...new Set(startups.map((startup) => startup.stage))]
  const markets = [...new Set(startups.flatMap((startup) => startup.market || []))]
  const locations = [...new Set(startups.map((startup) => startup.location))]

  const filteredStartups = startups.filter((startup) => {
    const fundingValue = getFundingValue(
      startup.financials?.funding_needed || startup.funding,
    )
    const matchesSearch =
      startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup.tagline.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesIndustry =
      selectedIndustries.length === 0 ||
      selectedIndustries.includes(startup.industry)
    const matchesStage =
      selectedStages.length === 0 || selectedStages.includes(startup.stage)
    const matchesMarket =
      selectedMarkets.length === 0 ||
      selectedMarkets.some((market) => startup.market?.includes(market))
    const matchesLocation =
      !selectedLocation || startup.location === selectedLocation
    const matchesFunding =
      fundingValue >= fundingRange[0] && fundingValue <= fundingRange[1]

    return (
      matchesSearch &&
      matchesIndustry &&
      matchesStage &&
      matchesMarket &&
      matchesLocation &&
      matchesFunding
    )
  })

  const activeFilters = [
    ...selectedIndustries.map((industry) => ({ label: industry, type: 'industry' })),
    ...selectedStages.map((stage) => ({
      label: stageLabels[stage] || stage,
      type: 'stage',
    })),
    ...selectedMarkets.map((market) => ({ label: market, type: 'market' })),
    ...(selectedLocation ? [{ label: selectedLocation, type: 'location' }] : []),
    ...(fundingRange[0] > 0 || fundingRange[1] < maxFunding
      ? [
          {
            label: `${formatFundingValue(fundingRange[0])} - ${formatFundingValue(
              fundingRange[1],
            )}`,
            type: 'funding',
          },
        ]
      : []),
  ]

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedIndustries([])
    setSelectedStages([])
    setSelectedMarkets([])
    setSelectedLocation('')
    setFundingRange([0, maxFunding])
  }

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
      <header className="page__header">
        <span className="eyebrow">Investor Discovery</span>
        <h1>Browse Startups</h1>
      </header>

      <section className="panel discovery-filters">
        <div className="filter-bar filter-bar--advanced">
          <input
            className="filter-control filter-control--search"
            type="text"
            placeholder="Search startups..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />

          <select
            className="filter-control"
            value={selectedLocation}
            onChange={(event) => setSelectedLocation(event.target.value)}
          >
            <option value="">All locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <span className="filter-group__label">Industry</span>
          <div className="filter-chip-row">
            {industries.map((industry) => (
              <button
                key={industry}
                className={`filter-chip ${
                  selectedIndustries.includes(industry) ? 'filter-chip--active' : ''
                }`}
                type="button"
                onClick={() =>
                  setSelectedIndustries((current) => toggleValue(current, industry))
                }
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-group__label">Stage</span>
          <div className="filter-chip-row">
            {stages.map((stage) => (
              <button
                key={stage}
                className={`filter-chip ${
                  selectedStages.includes(stage) ? 'filter-chip--active' : ''
                }`}
                type="button"
                onClick={() =>
                  setSelectedStages((current) => toggleValue(current, stage))
                }
              >
                {stageLabels[stage] || stage}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-group__label">Market Domain</span>
          <div className="filter-chip-row">
            {markets.map((market) => (
              <button
                key={market}
                className={`filter-chip ${
                  selectedMarkets.includes(market) ? 'filter-chip--active' : ''
                }`}
                type="button"
                onClick={() =>
                  setSelectedMarkets((current) => toggleValue(current, market))
                }
              >
                {market}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <div className="filter-group__header">
            <span className="filter-group__label">Funding Range</span>
            <span className="filter-group__value">
              {formatFundingValue(fundingRange[0])} - {formatFundingValue(fundingRange[1])}
            </span>
          </div>
          <div className="range-group">
            <input
              className="range-slider"
              type="range"
              min="0"
              max={maxFunding}
              step="50000"
              value={fundingRange[0]}
              onChange={(event) =>
                setFundingRange(([_, max]) => [
                  Math.min(Number(event.target.value), max),
                  max,
                ])
              }
            />
            <input
              className="range-slider"
              type="range"
              min="0"
              max={maxFunding}
              step="50000"
              value={fundingRange[1]}
              onChange={(event) =>
                setFundingRange(([min]) => [
                  min,
                  Math.max(Number(event.target.value), min),
                ])
              }
            />
          </div>
        </div>

        <div className="filter-toolbar">
          <div className="active-filters">
            {activeFilters.map((filter) => (
              <span key={`${filter.type}-${filter.label}`} className="tag-chip">
                {filter.label}
              </span>
            ))}
          </div>

          <div className="filter-toolbar__actions">
            <button className="button-secondary" type="button" onClick={clearFilters}>
              Clear Filters
            </button>
            <button
              className="button-primary"
              type="button"
              disabled={comparisonIds.length < 2}
              onClick={() => navigate(`/compare?ids=${comparisonIds.join(',')}`)}
            >
              Compare ({comparisonIds.length}/3)
            </button>
          </div>
        </div>
      </section>

      {filteredStartups.length > 0 ? (
        <section className="card-grid">
          {filteredStartups.map((startup) => (
            <StartupCard
              key={startup.id}
              startup={{
                ...startup,
                isSelectedForCompare: comparisonIds.includes(startup.id),
                compareDisabled:
                  comparisonIds.length >= 3 && !comparisonIds.includes(startup.id),
                onToggleCompare: handleToggleCompare,
                isSaved: savedIds.includes(startup.id),
                onToggleSave: () => toggleSavedStartup(startup.id),
              }}
            />
          ))}
        </section>
      ) : (
        <section className="panel empty-state">
          <h2>No startups found</h2>
        </section>
      )}
    </main>
  )
}

export default BrowseStartups
