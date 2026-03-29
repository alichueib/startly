import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TeamManagement from '../components/TeamManagement.jsx'
import { addStartup } from '../data/startups.js'

const initialFormState = {
  name: '',
  tagline: '',
  industry: '',
  location: '',
  stage: 'idea',
  problem: '',
  solution: '',
  market: '',
  competitors: '',
  team: [{ name: '', role: '', bio: '' }],
  funding_needed: '',
  revenue: '',
  burn_rate: '',
  use_of_funds: '',
}

const steps = [
  { id: 1, title: 'Basics' },
  { id: 2, title: 'Product & Market' },
  { id: 3, title: 'Team' },
  { id: 4, title: 'Financials' },
]

function CreateStartup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialFormState)
  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }))
  }

  const handleTeamChange = (index, field, value) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      team: currentFormData.team.map((member, memberIndex) =>
        memberIndex === index ? { ...member, [field]: value } : member,
      ),
    }))
  }

  const handleAddTeamMember = () => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      team: [...currentFormData.team, { name: '', role: '', bio: '' }],
    }))
  }

  const handleRemoveTeamMember = (index) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      team:
        currentFormData.team.length === 1
          ? currentFormData.team
          : currentFormData.team.filter((_, memberIndex) => memberIndex !== index),
    }))
  }

  const validateStep = (step) => {
    const nextErrors = {}

    if (step === 1) {
      if (!formData.name.trim()) nextErrors.name = 'Startup name is required.'
      if (!formData.tagline.trim()) nextErrors.tagline = 'Tagline is required.'
      if (!formData.industry.trim()) nextErrors.industry = 'Industry is required.'
      if (!formData.location.trim()) nextErrors.location = 'Location is required.'
      if (!formData.stage) nextErrors.stage = 'Stage is required.'
    }

    if (step === 2) {
      if (!formData.problem.trim()) nextErrors.problem = 'Problem is required.'
      if (!formData.solution.trim()) nextErrors.solution = 'Solution is required.'
      if (!formData.market.trim()) nextErrors.market = 'Market is required.'
    }

    if (step === 3) {
      const hasValidMember = formData.team.some(
        (member) =>
          member.name.trim() && member.role.trim() && member.bio.trim(),
      )

      if (!hasValidMember) {
        nextErrors.team =
          'Add at least one team member with name, role, and short description.'
      }
    }

    if (step === 4) {
      if (!formData.funding_needed.trim()) {
        nextErrors.funding_needed = 'Funding needed is required.'
      }
      if (!formData.use_of_funds.trim()) {
        nextErrors.use_of_funds = 'Use of funds is required.'
      }
    }

    setErrors(nextErrors)

    return Object.keys(nextErrors).length === 0
  }

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      return
    }

    setCurrentStep((step) => Math.min(step + 1, steps.length))
  }

  const handleBack = () => {
    setErrors({})
    setCurrentStep((step) => Math.max(step - 1, 1))
  }

  const handlePublish = (event) => {
    event.preventDefault()

    if (!validateStep(currentStep)) {
      return
    }

    const team = formData.team
      .filter((member) => member.name.trim() || member.role.trim() || member.bio.trim())
      .map((member) => ({
        name: member.name.trim(),
        role: member.role.trim(),
        bio: member.bio.trim(),
      }))

    const newStartup = addStartup({
      name: formData.name.trim(),
      tagline: formData.tagline.trim(),
      industry: formData.industry.trim(),
      location: formData.location.trim(),
      stage: formData.stage,
      problem: formData.problem.trim(),
      solution: formData.solution.trim(),
      description: formData.solution.trim(),
      market: formData.market
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      competitors: formData.competitors
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      team,
      funding: formData.funding_needed.trim(),
      financials: {
        funding_needed: formData.funding_needed.trim(),
        revenue: formData.revenue.trim() || 'Pre-revenue',
        burn_rate: formData.burn_rate.trim() || 'Not disclosed',
        use_of_funds: formData.use_of_funds.trim(),
      },
    })

    localStorage.setItem('founderStartupId', String(newStartup.id))
    setFormData(initialFormState)
    setCurrentStep(1)
    setErrors({})
    navigate('/profile')
  }

  return (
    <main className="page page--narrow">
      <section className="panel">
        <span className="eyebrow">Founder Workspace</span>
        <h1>Create Startup</h1>
        <p>Complete the profile in four fast steps and publish when ready.</p>

        <div className="wizard-steps" aria-label="Startup creation steps">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`wizard-step ${
                step.id === currentStep
                  ? 'wizard-step--active'
                  : step.id < currentStep
                    ? 'wizard-step--complete'
                    : ''
              }`}
            >
              <span className="wizard-step__index">{step.id}</span>
              <span>{step.title}</span>
            </div>
          ))}
        </div>

        <form className="startup-form" onSubmit={handlePublish}>
          {currentStep === 1 && (
            <div className="wizard-panel">
              <label className="form-field">
                <span>Startup Name</span>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <small className="form-error">{errors.name}</small>}
              </label>

              <label className="form-field">
                <span>Tagline</span>
                <input
                  className="form-control"
                  type="text"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                />
                {errors.tagline && (
                  <small className="form-error">{errors.tagline}</small>
                )}
              </label>

              <div className="form-row">
                <label className="form-field">
                  <span>Industry</span>
                  <input
                    className="form-control"
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                  />
                  {errors.industry && (
                    <small className="form-error">{errors.industry}</small>
                  )}
                </label>

                <label className="form-field">
                  <span>Location</span>
                  <input
                    className="form-control"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                  {errors.location && (
                    <small className="form-error">{errors.location}</small>
                  )}
                </label>
              </div>

              <label className="form-field">
                <span>Stage</span>
                <select
                  className="form-control"
                  name="stage"
                  value={formData.stage}
                  onChange={handleChange}
                >
                  <option value="idea">Idea</option>
                  <option value="mvp">MVP</option>
                  <option value="early_revenue">Early Revenue</option>
                  <option value="scaling">Scaling</option>
                </select>
                {errors.stage && <small className="form-error">{errors.stage}</small>}
              </label>
            </div>
          )}

          {currentStep === 2 && (
            <div className="wizard-panel">
              <label className="form-field">
                <span>Problem</span>
                <textarea
                  className="form-control form-control--textarea"
                  name="problem"
                  value={formData.problem}
                  onChange={handleChange}
                  rows="4"
                />
                {errors.problem && (
                  <small className="form-error">{errors.problem}</small>
                )}
              </label>

              <label className="form-field">
                <span>Solution</span>
                <textarea
                  className="form-control form-control--textarea"
                  name="solution"
                  value={formData.solution}
                  onChange={handleChange}
                  rows="4"
                />
                {errors.solution && (
                  <small className="form-error">{errors.solution}</small>
                )}
              </label>

              <label className="form-field">
                <span>Market</span>
                <input
                  className="form-control"
                  type="text"
                  name="market"
                  placeholder="Comma-separated segments or tags"
                  value={formData.market}
                  onChange={handleChange}
                />
                {errors.market && <small className="form-error">{errors.market}</small>}
              </label>

              <label className="form-field">
                <span>Competitors (optional)</span>
                <input
                  className="form-control"
                  type="text"
                  name="competitors"
                  placeholder="Comma-separated"
                  value={formData.competitors}
                  onChange={handleChange}
                />
              </label>
            </div>
          )}

          {currentStep === 3 && (
            <div className="wizard-panel">
              <TeamManagement
                editable
                title="Team"
                description="Add the core people investors should evaluate first."
                members={formData.team}
                onAddMember={handleAddTeamMember}
                onRemoveMember={handleRemoveTeamMember}
                onChangeMember={handleTeamChange}
                error={errors.team}
              />
            </div>
          )}

          {currentStep === 4 && (
            <div className="wizard-panel">
              <label className="form-field">
                <span>Funding Needed</span>
                <input
                  className="form-control"
                  type="text"
                  name="funding_needed"
                  value={formData.funding_needed}
                  onChange={handleChange}
                />
                {errors.funding_needed && (
                  <small className="form-error">{errors.funding_needed}</small>
                )}
              </label>

              <div className="form-row">
                <label className="form-field">
                  <span>Revenue (optional)</span>
                  <input
                    className="form-control"
                    type="text"
                    name="revenue"
                    value={formData.revenue}
                    onChange={handleChange}
                  />
                </label>

                <label className="form-field">
                  <span>Burn Rate (optional)</span>
                  <input
                    className="form-control"
                    type="text"
                    name="burn_rate"
                    value={formData.burn_rate}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <label className="form-field">
                <span>Use of Funds</span>
                <textarea
                  className="form-control form-control--textarea"
                  name="use_of_funds"
                  value={formData.use_of_funds}
                  onChange={handleChange}
                  rows="4"
                />
                {errors.use_of_funds && (
                  <small className="form-error">{errors.use_of_funds}</small>
                )}
              </label>
            </div>
          )}

          <div className="wizard-actions">
            <button
              className="button-secondary"
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Back
            </button>

            {currentStep < steps.length ? (
              <button className="button-primary" type="button" onClick={handleNext}>
                Next Step
              </button>
            ) : (
              <button className="button-primary" type="submit">
                Publish Startup
              </button>
            )}
          </div>
        </form>
      </section>
    </main>
  )
}

export default CreateStartup
