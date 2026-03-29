import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addStartup } from '../data/startups.js'

const initialFormState = {
  name: '',
  industry: '',
  location: '',
  funding: '',
  description: '',
}

function CreateStartup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialFormState)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }))
  }

  const handlePublish = (event) => {
    event.preventDefault()

    const newStartup = addStartup(formData)
    localStorage.setItem('founderStartupId', String(newStartup.id))
    setFormData(initialFormState)
    navigate('/profile')
  }

  return (
    <main className="page page--narrow">
      <section className="panel">
        <span className="eyebrow">Founder Workspace</span>
        <h1>Create Startup</h1>
        <p>Publish a startup profile so investors can discover your company.</p>

        <form className="startup-form" onSubmit={handlePublish}>
          <label className="form-field">
            <span>Startup Name</span>
            <input
              className="form-control"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-field">
            <span>Industry</span>
            <input
              className="form-control"
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-field">
            <span>Location</span>
            <input
              className="form-control"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-field">
            <span>Funding Needed</span>
            <input
              className="form-control"
              type="text"
              name="funding"
              value={formData.funding}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-field">
            <span>Description</span>
            <textarea
              className="form-control form-control--textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              required
            />
          </label>

          <button className="button-primary" type="submit">
            Publish Startup
          </button>
        </form>
      </section>
    </main>
  )
}

export default CreateStartup
