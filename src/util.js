export const formatDate = date => date.toISO().substring(0, 10)

export const compare = (a, b) => {
  if (a.roomNumber < b.roomNumber) return -1
  if (a.roomNumber > b.roomNumber) return 1
  return 0
}
