import { useState } from 'react'
import startups from '../data/startups.js'

const MEETING_REQUESTS_KEY = 'meetingRequests'

const getMeetingRequests = () => {
  const storedRequests = localStorage.getItem(MEETING_REQUESTS_KEY)

  if (!storedRequests) {
    return []
  }

  try {
    return JSON.parse(storedRequests)
  } catch {
    return []
  }
}

const saveMeetingRequests = (requests) => {
  localStorage.setItem(MEETING_REQUESTS_KEY, JSON.stringify(requests))
  window.dispatchEvent(new Event('meetingRequestsChanged'))
}

function MeetingRequests() {
  const [requests, setRequests] = useState(getMeetingRequests())

  const updateRequestStatus = (requestId, status) => {
    const nextRequests = requests.map((request) =>
      request.id === requestId ? { ...request, status } : request,
    )

    setRequests(nextRequests)
    saveMeetingRequests(nextRequests)
  }

  return (
    <main className="page">
      <header className="page__header">
        <span className="eyebrow">Founder Inbox</span>
        <h1>Meeting Requests</h1>
      </header>

      {requests.length > 0 ? (
        <section className="request-list">
          {requests.map((request) => {
            const startupName =
              startups.find((startup) => startup.id === request.startupId)?.name ||
              'Unknown Startup'

            return (
              <article key={request.id} className="panel request-card">
                <div className="request-card__header">
                  <div>
                    <h2>{startupName}</h2>
                    <p>{request.investorName}</p>
                  </div>
                  <span className={`status-badge status-badge--${request.status}`}>
                    {request.status}
                  </span>
                </div>

                <div className="request-card__body">
                  <p>
                    <strong>Message:</strong> {request.message}
                  </p>
                  <p>
                    <strong>Preferred time:</strong> {request.time}
                  </p>
                </div>

                <div className="request-card__actions">
                  <button
                    className="button-primary"
                    type="button"
                    onClick={() => updateRequestStatus(request.id, 'accepted')}
                  >
                    Accept
                  </button>
                  <button
                    className="button-secondary"
                    type="button"
                    onClick={() => updateRequestStatus(request.id, 'rejected')}
                  >
                    Reject
                  </button>
                </div>
              </article>
            )
          })}
        </section>
      ) : (
        <section className="panel empty-state">
          <h2>No meeting requests yet</h2>
        </section>
      )}
    </main>
  )
}

export default MeetingRequests
