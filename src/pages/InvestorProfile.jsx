import TeamManagement from '../components/TeamManagement.jsx'
import startups from '../data/startups.js'

function InvestorProfile() {
  const role = localStorage.getItem('role')
  const founderStartupId = localStorage.getItem('founderStartupId')
  const founderStartup = startups.find(
    (startup) => startup.id === Number(founderStartupId),
  )

  if (role === 'founder') {
    return (
      <main className="page page--narrow">
        <section className="profile-layout">
          <header className="panel">
            <span className="eyebrow">Founder Profile</span>
            <h1>Your Startup</h1>
          </header>

          {founderStartup ? (
            <>
              <section className="panel">
                <h2>{founderStartup.name}</h2>
                <div className="info-grid">
                  <div className="info-item">
                    <span>Industry</span>
                    <strong>{founderStartup.industry}</strong>
                  </div>
                  <div className="info-item">
                    <span>Location</span>
                    <strong>{founderStartup.location}</strong>
                  </div>
                  <div className="info-item">
                    <span>Funding Needed</span>
                    <strong>{founderStartup.funding}</strong>
                  </div>
                </div>
              </section>

              <section className="panel">
                <h2>Description</h2>
                <p>{founderStartup.description}</p>
              </section>

              <section className="panel startup-section">
                <TeamManagement
                  title="Team"
                  description="Your current founding team and key contributors."
                  members={founderStartup.team || []}
                />
              </section>
            </>
          ) : (
            <section className="panel">
              <p>No startup published yet.</p>
            </section>
          )}
        </section>
      </main>
    )
  }

  return (
    <main className="page page--narrow">
      <section className="profile-layout">
        <header className="panel">
          <span className="eyebrow">Investor Profile</span>
          <h1>Claire Martin</h1>
        </header>

        <section className="panel">
          <h2>Preferences</h2>
          <div className="info-grid">
            <div className="info-item">
              <span>Name</span>
              <strong>Claire Martin</strong>
            </div>
            <div className="info-item">
              <span>Investment interests</span>
              <strong>Seed-stage B2B startups with strong product traction</strong>
            </div>
            <div className="info-item">
              <span>Preferred industries</span>
              <strong>FinTech, HealthTech, Climate Tech</strong>
            </div>
            <div className="info-item">
              <span>Investment range</span>
              <strong>$100k - $750k</strong>
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}

export default InvestorProfile
