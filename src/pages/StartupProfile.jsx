import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  getSavedStartupIds,
  toggleSavedStartup,
} from '../data/savedStartups.js'
import startups from '../data/startups.js'

const MEETING_REQUESTS_KEY = 'meetingRequests'
const defaultContactMessage =
  "Hi, I'm interested in your startup. Can we discuss further?"

const stageLabels = {
  idea: 'Idea',
  mvp: 'MVP',
  early_revenue: 'Early Revenue',
  scaling: 'Scaling',
}

function StartupProfile() {
  const { id } = useParams()
  const startup = startups.find((s) => s.id === parseInt(id, 10))
  const [savedIds, setSavedIds] = useState(getSavedStartupIds())
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [messageDraft, setMessageDraft] = useState(defaultContactMessage)
  const [meetingTime, setMeetingTime] = useState('')
  const [showRequestConfirmation, setShowRequestConfirmation] = useState(false)

  useEffect(() => {
    const handleSavedChange = () => {
      setSavedIds(getSavedStartupIds())
    }

    window.addEventListener('savedStartupsChanged', handleSavedChange)

    return () => {
      window.removeEventListener('savedStartupsChanged', handleSavedChange)
    }
  }, [])

  const openContactModal = () => {
    setMessageDraft(defaultContactMessage)
    setMeetingTime('')
    setIsContactModalOpen(true)
  }

  const handleSendRequest = () => {
    const currentRequests = JSON.parse(
      localStorage.getItem(MEETING_REQUESTS_KEY) || '[]',
    )

    const nextRequests = [
      ...currentRequests,
      {
        id: Date.now(),
        startupId: startup.id,
        investorName: 'Investor (mock)',
        message: messageDraft,
        time: meetingTime,
        status: 'pending',
      },
    ]

    localStorage.setItem(MEETING_REQUESTS_KEY, JSON.stringify(nextRequests))
    window.dispatchEvent(new Event('meetingRequestsChanged'))
    setShowRequestConfirmation(true)
    setIsContactModalOpen(false)
  }

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
          <div className="startup-hero__actions">
            <button
              className="button-primary"
              type="button"
              onClick={openContactModal}
            >
              Contact Founder
            </button>
            <button
              className={`save-button ${savedIds.includes(startup.id) ? 'save-button--active' : ''}`}
              type="button"
              onClick={() => toggleSavedStartup(startup.id)}
            >
              {savedIds.includes(startup.id) ? 'Saved' : 'Save Startup'}
            </button>
          </div>
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

        {showRequestConfirmation ? (
          <section className="panel confirmation-banner">
            <p>Meeting request sent successfully</p>
          </section>
        ) : null}

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
      </section>

      {isContactModalOpen ? (
        <div className="modal-backdrop" role="presentation">
          <div
            className="modal-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-founder-title"
          >
            <div className="modal-panel__header">
              <div>
                <span className="eyebrow">Investor Outreach</span>
                <h2 id="contact-founder-title">Contact Founder</h2>
              </div>
              <button
                className="button-secondary"
                type="button"
                onClick={() => setIsContactModalOpen(false)}
              >
                Close
              </button>
            </div>

            <label className="form-field">
              <span>Message</span>
              <textarea
                className="form-control form-control--textarea"
                value={messageDraft}
                onChange={(event) => setMessageDraft(event.target.value)}
                rows="5"
              />
            </label>

            <label className="form-field">
              <span>Preferred meeting time</span>
              <input
                className="form-control"
                type="datetime-local"
                value={meetingTime}
                onChange={(event) => setMeetingTime(event.target.value)}
              />
            </label>

            <div className="modal-panel__actions">
              <button
                className="button-primary"
                type="button"
                onClick={handleSendRequest}
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}

export default StartupProfile
