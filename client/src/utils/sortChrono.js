const descending = arr => {
  return arr.sort((r1, r2) => {
    const firstDate = new Date(r1.createdAt)
    const secondDate = new Date(r2.createdAt)
    if (firstDate > secondDate) return -1
    if (firstDate < secondDate) return 1
    return 0
  })
}

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
