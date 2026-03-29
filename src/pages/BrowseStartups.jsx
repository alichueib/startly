import { useState } from 'react'
import StartupCard from '../components/StartupCard.jsx'
import startups from '../data/startups.js'

function BrowseStartups() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')

  const industries = [...new Set(startups.map((startup) => startup.industry))]
  const locations = [...new Set(startups.map((startup) => startup.location))]

  const filteredStartups = startups.filter((startup) => {
    const matchesSearch = startup.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesIndustry =
      !selectedIndustry || startup.industry === selectedIndustry
    const matchesLocation =
      !selectedLocation || startup.location === selectedLocation

    return matchesSearch && matchesIndustry && matchesLocation
  })

  return (
    <main className="page">
      <header className="page__header">
        <span className="eyebrow">Investor Discovery</span>
        <h1>Browse Startups</h1>
      </header>

      <section className="filter-bar">
        <input
          className="filter-control filter-control--search"
          type="text"
          placeholder="Search startups..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />

        <select
          className="filter-control"
          value={selectedIndustry}
          onChange={(event) => setSelectedIndustry(event.target.value)}
        >
          <option value="">All industries</option>
          {industries.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>

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
      </section>

      {filteredStartups.length > 0 ? (
        <section className="card-grid">
          {filteredStartups.map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
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
