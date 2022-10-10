const timePassed = isoString => {
  const dt = Date.now() - new Date(isoString).getTime()
  const seconds = Math.floor(dt / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  if (seconds < 60) {
    return `${seconds} second${seconds === 1 ? '' : 's'} ago`
  }
  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
  }
  if (hours < 24) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`
  }
  return `${days} day${days === 1 ? '' : 's'} ago`
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

const date = isoString => {
  const obj = new Date(isoString)
  const date = obj.getDate() + 1
  const suffix =
    date === 1 ? 'st' : date === 2 ? '2nd' : date === 3 ? '3rd' : 'th'
  return `${date + suffix} ${monthNames[obj.getMonth()]}, ${obj.getFullYear()}`
}

export { timePassed, date }
