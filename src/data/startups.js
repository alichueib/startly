const startups = [
  {
    id: 1,
    name: 'GreenAI',
    tagline: 'Precision intelligence for climate-resilient farming.',
    industry: 'AI / Agriculture',
    stage: 'early_revenue',
    description: 'AI platform optimizing crop yields for sustainable farming.',
    problem:
      'Mid-size farms still rely on fragmented sensor data and manual planning, which leads to lower yields, water waste, and delayed interventions.',
    solution:
      'GreenAI combines satellite imagery, field sensors, and predictive models to recommend irrigation, fertilization, and harvest decisions in a single dashboard.',
    market: ['AgriTech', 'Precision Farming', 'Climate Adaptation'],
    traction: {
      users: '120 farms onboarded',
      revenue: '$32k MRR',
      growth: '14% MoM pipeline expansion',
    },
    team: [
      {
        name: 'Camille Roche',
        role: 'CEO',
        bio: 'Former agronomy consultant focused on European greenhouse operators.',
      },
      {
        name: 'Hugo Bernard',
        role: 'CTO',
        bio: 'Machine learning engineer with experience in geospatial prediction systems.',
      },
    ],
    financials: {
      funding_needed: '$500k',
      revenue: '$32k MRR',
      burn_rate: '$22k / month',
      runway: '11 months',
      use_of_funds:
        'Expand go-to-market, complete product integrations, and grow agronomy support.',
    },
    competitors: ['CropX', 'Prospera', 'Climate FieldView'],
    funding: '$500k',
    location: 'France',
  },
  {
    id: 2,
    name: 'MediLink',
    tagline: 'Remote specialty care for underserved patient journeys.',
    industry: 'HealthTech',
    stage: 'mvp',
    description: 'Digital platform connecting patients with remote specialists.',
    problem:
      'Patients in regional areas wait weeks for specialist appointments and hospitals struggle to coordinate remote follow-up care.',
    solution:
      'MediLink offers teleconsultation workflows, triage, and document sharing tailored for specialist referrals and chronic care follow-up.',
    market: ['Telehealth', 'Hospital SaaS', 'Care Coordination'],
    traction: {
      users: '8 pilot clinics',
      revenue: '$6k MRR',
      growth: '3 new clinics in last quarter',
    },
    team: [
      {
        name: 'Lea Hoffman',
        role: 'CEO',
        bio: 'Health systems operator with a background in outpatient care networks.',
      },
      {
        name: 'Jonas Weber',
        role: 'Product Lead',
        bio: 'Built patient-facing workflows for digital therapeutics products.',
      },
    ],
    financials: {
      funding_needed: '$1.2M',
      revenue: '$6k MRR',
      burn_rate: '$48k / month',
      runway: '9 months',
      use_of_funds: 'Clinical compliance, pilot expansion, and specialist onboarding.',
    },
    competitors: ['Doctolib', 'Teladoc', 'Amwell'],
    funding: '$1.2M',
    location: 'Germany',
  },
  {
    id: 3,
    name: 'VoltRoute',
    tagline: 'Fleet charging orchestration that cuts EV downtime.',
    industry: 'Mobility / Energy',
    stage: 'scaling',
    description: 'Smart charging and routing tools for electric vehicle fleets.',
    problem:
      'Fleet operators waste time and money managing charging availability, route planning, and energy pricing across multiple depots.',
    solution:
      'VoltRoute optimizes fleet schedules in real time by combining battery state, charging windows, route demand, and grid pricing.',
    market: ['Fleet Management', 'EV Infrastructure', 'Energy Software'],
    traction: {
      users: '24 fleet operators',
      revenue: '$78k MRR',
      growth: '21% QoQ revenue growth',
    },
    team: [
      {
        name: 'Nora van Dijk',
        role: 'CEO',
        bio: 'Former mobility strategy lead for large logistics networks.',
      },
      {
        name: 'Felix Janssen',
        role: 'COO',
        bio: 'Operations expert specialized in electric fleet deployments.',
      },
      {
        name: 'Amir Singh',
        role: 'CTO',
        bio: 'Built dispatch optimization systems for on-demand transport products.',
      },
    ],
    financials: {
      funding_needed: '$850k',
      revenue: '$78k MRR',
      burn_rate: '$55k / month',
      runway: '16 months',
      use_of_funds: 'Sales hiring, deployment support, and energy optimization R&D.',
    },
    competitors: ['Samsara', 'AMPECO', 'Optibus'],
    funding: '$850k',
    location: 'Netherlands',
  },
  {
    id: 4,
    name: 'FinPilot',
    tagline: 'Finance ops for independent workers with unpredictable income.',
    industry: 'FinTech',
    stage: 'early_revenue',
    description: 'Financial planning tools tailored for freelancers and creators.',
    problem:
      'Freelancers struggle with cash flow visibility, tax planning, and separating business decisions from personal finance noise.',
    solution:
      'FinPilot automates budgeting, tax set-asides, invoice forecasting, and savings goals through a unified financial cockpit.',
    market: ['Creator Economy', 'Personal Finance', 'Freelancer SaaS'],
    traction: {
      users: '6,400 active accounts',
      revenue: '$44k MRR',
      growth: '9% MoM user growth',
    },
    team: [
      {
        name: 'Amelia Brooks',
        role: 'CEO',
        bio: 'Former fintech growth lead with expertise in SME financial behavior.',
      },
      {
        name: 'Marco Silva',
        role: 'Head of Design',
        bio: 'Product designer focused on consumer trust and financial clarity.',
      },
    ],
    financials: {
      funding_needed: '$2M',
      revenue: '$44k MRR',
      burn_rate: '$61k / month',
      runway: '13 months',
      use_of_funds:
        'Consumer acquisition, compliance, and product expansion for tax workflows.',
    },
    competitors: ['Karakuri', 'QuickBooks', 'Xolo'],
    funding: '$2M',
    location: 'United Kingdom',
  },
  {
    id: 5,
    name: 'BuildSense',
    tagline: 'Project risk intelligence for modern construction teams.',
    industry: 'PropTech / SaaS',
    stage: 'idea',
    description: 'Construction analytics dashboard for tracking project risk.',
    problem:
      'Construction stakeholders lack a live view of project delays, budget overruns, and supplier risk across distributed teams.',
    solution:
      'BuildSense centralizes site updates, budget tracking, and risk indicators so project leaders can intervene earlier.',
    market: ['Construction Tech', 'Project Controls', 'B2B SaaS'],
    traction: {
      users: '3 paid design partners',
      revenue: '$0',
      growth: '2 enterprise pilots starting next month',
    },
    team: [
      {
        name: 'Sofia Alvarez',
        role: 'CEO',
        bio: 'Previously led digital transformation initiatives for large contractors.',
      },
      {
        name: 'Ethan Cole',
        role: 'Technical Advisor',
        bio: 'Construction data specialist with experience in BIM and scheduling tools.',
      },
    ],
    financials: {
      funding_needed: '$650k',
      revenue: '$0',
      burn_rate: '$18k / month',
      runway: '8 months',
      use_of_funds: 'Pilot delivery, integrations, and first sales engineering hires.',
    },
    competitors: ['Procore', 'OpenSpace', 'Buildots'],
    funding: '$650k',
    location: 'Spain',
  },
]

function normalizeStartup(startup) {
  const fundingNeeded =
    startup.financials?.funding_needed || startup.funding || 'Not specified'

  return {
    id: startup.id,
    name: startup.name,
    tagline: startup.tagline || 'Building a focused solution for a growing market.',
    industry: startup.industry || 'General',
    stage: startup.stage || 'idea',
    description: startup.description || '',
    problem:
      startup.problem ||
      'The founding team is refining the core problem statement and early customer pain points.',
    solution:
      startup.solution ||
      startup.description ||
      'The team is defining how the product uniquely addresses the problem.',
    market: startup.market || ['Emerging market opportunity'],
    traction: {
      users: startup.traction?.users || 'Early user discovery',
      revenue: startup.traction?.revenue || 'Pre-revenue',
      growth: startup.traction?.growth || 'Early validation stage',
    },
    team:
      startup.team || [
        {
          name: 'Founding Team',
          role: 'Founders',
          bio: 'Founder details will be expanded as the company profile evolves.',
        },
      ],
    financials: {
      funding_needed: fundingNeeded,
      revenue: startup.financials?.revenue || 'Not disclosed',
      burn_rate: startup.financials?.burn_rate || 'Not disclosed',
      runway: startup.financials?.runway || 'Not disclosed',
      use_of_funds:
        startup.financials?.use_of_funds ||
        'Detailed allocation of capital will be shared during diligence.',
    },
    competitors: startup.competitors || ['Competitive landscape to be defined'],
    funding: startup.funding || fundingNeeded,
    location: startup.location || 'Remote',
  }
}

export function addStartup(startup) {
  const newStartup = normalizeStartup({
    ...startup,
    id: startups.length + 1,
  })

  startups.push(newStartup)

  return newStartup
}

export default startups
