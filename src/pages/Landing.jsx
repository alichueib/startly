import { useNavigate } from 'react-router-dom'

function Landing({ setRole }) {
  const navigate = useNavigate()

  const handleRoleSelect = (role) => {
    localStorage.setItem('role', role)
    setRole(role)
    navigate(role === 'investor' ? '/browse' : '/create', { replace: true })
  }

  return (
    <main className="page page--narrow">
      <section className="panel landing-panel">
        <span className="eyebrow">Startly</span>
        <h1>Choose how you want to continue</h1>
        <p>
          Explore startups as an investor or continue as a founder to create your
          company profile.
        </p>
        <div className="landing-actions">
          <button
            className="button-primary"
            type="button"
            onClick={() => handleRoleSelect('investor')}
          >
            Continue as Investor
          </button>
          <button
            className="button-secondary"
            type="button"
            onClick={() => handleRoleSelect('founder')}
          >
            Continue as Founder
          </button>
        </div>
      </section>
    </main>
  )
}

export default Landing
