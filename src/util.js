import {DateTime} from 'luxon'
export const formatDate = date => date.toISO().substring(0, 10)

const now = DateTime.utc().setZone('Asia/Seoul')
const tmr = now.plus({days: 1})

export const formattedNow = now.toFormat('yyyy-MM-dd')
export const formattedTmr = tmr.toFormat('yyyy-MM-dd')

export const compare = (a, b) => {
  if (a.roomNumber < b.roomNumber) return -1
  if (a.roomNumber > b.roomNumber) return 1
  return 0
}

export const platformColor = {
  airbnb: '#ed3b85',
  expedia: '#3b53ed',
  agoda: '#873f92',
  ctrip: '#baed3b',
  cash: '#37d664',
}
