const startups = [
  {
    id: 1,
    name: 'GreenAI',
    industry: 'AI / Agriculture',
    description: 'AI platform optimizing crop yields for sustainable farming.',
    funding: '$500k',
    location: 'France',
  },
  {
    id: 2,
    name: 'MediLink',
    industry: 'HealthTech',
    description: 'Digital platform connecting patients with remote specialists.',
    funding: '$1.2M',
    location: 'Germany',
  },
  {
    id: 3,
    name: 'VoltRoute',
    industry: 'Mobility / Energy',
    description: 'Smart charging and routing tools for electric vehicle fleets.',
    funding: '$850k',
    location: 'Netherlands',
  },
  {
    id: 4,
    name: 'FinPilot',
    industry: 'FinTech',
    description: 'Financial planning tools tailored for freelancers and creators.',
    funding: '$2M',
    location: 'United Kingdom',
  },
  {
    id: 5,
    name: 'BuildSense',
    industry: 'PropTech / SaaS',
    description: 'Construction analytics dashboard for tracking project risk.',
    funding: '$650k',
    location: 'Spain',
  },
]

export function addStartup(startup) {
  const newStartup = {
    ...startup,
    id: startups.length + 1,
  }

  startups.push(newStartup)

  return newStartup
}

export default startups
