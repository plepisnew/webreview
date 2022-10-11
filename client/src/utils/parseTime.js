/**
 * Returns time passed since the provided date in the format `x units ago`
 * @param {string} isoString Date string in ISO format
 * @returns Time passed string
 */
const timePassed = (isoString, ago = true) => {
  const dt = Date.now() - new Date(isoString).getTime()
  const seconds = Math.floor(dt / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  if (seconds < 60) {
    return `${seconds} second${seconds === 1 ? '' : 's'} ${ago ? 'ago' : ''}`
  }
  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ${ago ? 'ago' : ''}`
  }
  if (hours < 24) {
    return `${hours} hour${hours === 1 ? '' : 's'} ${ago ? 'ago' : ''}`
  }
  return `${days} day${days === 1 ? '' : 's'} ${ago ? 'ago' : ''}`
}

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

/**
 * Returns the date of the provided date string in the format `Date th Month, YYYY`
 * @param {string} isoString Date string in ISO format
 * @returns Time passed string
 */
const date = isoString => {
  const obj = new Date(isoString)
  const date = obj.getDate() + 1
  const suffix =
    date === 1 ? 'st' : date === 2 ? '2nd' : date === 3 ? '3rd' : 'th'
  return `${date + suffix} ${monthNames[obj.getMonth()]}, ${obj.getFullYear()}`
}

/**
 * Calculates the (absolute) time passed between two dates
 * @param {string} isoString1 first date
 * @param {string} isoString2 second date
 * @param {string} unit time unit in which to return the result (`second`, `minute`, `hour`, `day`)
 * @returns time passed between two dates in the provided unit
 */
const dt = (isoString1, isoString2, unit = 'second') => {
  const millis1 = new Date(isoString1).getTime()
  const millis2 = new Date(isoString2).getTime()
  const dtMillis = millis1 - millis2
  //   const dtMillis = Math.abs(millis1 - millis2)
  const dtSeconds = dtMillis / 1000
  const dtMinutes = dtSeconds / 60
  const dtHours = dtMinutes / 60
  const dtDays = dtHours / 24
  switch (unit.toLowerCase()) {
    case 'milisecond':
      return dtMillis
    case 'second':
      return dtSeconds
    case 'minute':
      return dtMinutes
    case 'hour':
      return dtHours
    case 'day':
      return dtDays
    default:
      return dtSeconds
  }
}

const timeUntil = isoString => {
  const currentTime = new Date().toISOString()
  const secondsLeft = dt(isoString, currentTime)
  if (secondsLeft < 0) {
    return {
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0
    }
  }
  const days = Math.floor(secondsLeft / 86400)
  const hours = Math.floor(secondsLeft / 3600 - days * 24)
  const minutes = Math.floor(secondsLeft / 60 - days * 1440 - hours * 60)
  const seconds = Math.floor(
    secondsLeft - days * 86400 - hours * 3600 - minutes * 60
  )
  return {
    seconds,
    minutes,
    hours,
    days
  }
}

export { timePassed, date, dt, timeUntil }
