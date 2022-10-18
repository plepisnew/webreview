/**
 * Maps a float to another float whose decimal places after the `places`th one are truncated
 * @param {number} number Float number to be rounded
 * @param {number} places Number of decimal places to which truncate a float
 * @returns Truncated float number
 */
const roundFloat = (number, places = 1) => {
  const multiplier = Math.pow(10, places)
  return Math.floor(number * multiplier) / multiplier
}

export default roundFloat
