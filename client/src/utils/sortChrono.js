/**
 * Sorts array of Reviews (first index is the newest review)
 * @param {Review[]} arr array of Review objects
 * @returns copy of the input array sorted by the creation date descendingly
 */
const descending = arr => {
  return arr.sort((r1, r2) => {
    const firstDate = new Date(r1.createdAt)
    const secondDate = new Date(r2.createdAt)
    if (firstDate > secondDate) return -1
    if (firstDate < secondDate) return 1
    return 0
  })
}

/**
 * Sorts array of Reviews (first index is the oldest review)
 * @param {Review[]} arr array of Review objects
 * @returns copy of the input array sorted by the creation date ascendingly
 */
const ascending = arr => {
  return arr.sort((r1, r2) => {
    const firstDate = new Date(r1.createdAt)
    const secondDate = new Date(r2.createdAt)
    if (firstDate > secondDate) return 1
    if (firstDate < secondDate) return -1
    return 0
  })
}

export { descending, ascending }
