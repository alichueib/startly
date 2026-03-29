const SAVED_STARTUPS_KEY = 'savedStartups_investor'

export function getSavedStartupIds() {
  const savedValue = localStorage.getItem(SAVED_STARTUPS_KEY)

  if (!savedValue) {
    return []
  }

  try {
    return JSON.parse(savedValue)
  } catch {
    return []
  }
}

export function isStartupSaved(startupId) {
  return getSavedStartupIds().includes(startupId)
}

export function toggleSavedStartup(startupId) {
  const currentIds = getSavedStartupIds()
  const nextIds = currentIds.includes(startupId)
    ? currentIds.filter((id) => id !== startupId)
    : [...currentIds, startupId]

  localStorage.setItem(SAVED_STARTUPS_KEY, JSON.stringify(nextIds))
  window.dispatchEvent(new Event('savedStartupsChanged'))

  return nextIds
}
