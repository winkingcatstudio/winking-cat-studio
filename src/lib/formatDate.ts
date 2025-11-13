export function parseDateInput(input?: string | Date | null): Date | null {
  if (!input) return null
  if (input instanceof Date) {
    return Number.isNaN(input.getTime()) ? null : input
  }

  const s = String(input).trim()
  if (s === '') return null

  // handle plain YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    const iso = s + 'T00:00:00Z'
    const d = new Date(iso)
    return Number.isNaN(d.getTime()) ? null : d
  }

  const d = new Date(s)
  return Number.isNaN(d.getTime()) ? null : d
}

export function formatDate(dateInput: string | Date | null | undefined) {
  const d = parseDateInput(dateInput)
  if (!d) return '(Invalid date)'
  return d.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
