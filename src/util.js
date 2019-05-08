import {DateTime} from 'luxon'
export const formatDate = date => date.toISO().substring(0, 10)

export const now = DateTime.utc().setZone('Asia/Seoul')
const tmr = now.plus({days: 1})
const yesterday = now.minus({days: 1})

export const formattedNow = now.toFormat('yyyy-MM-dd')
export const formattedTmr = tmr.toFormat('yyyy-MM-dd')
export const formattedYesterday = yesterday.toFormat('yyyy-MM-dd')

export const fromISOtoString = dateFromCalendar =>
  DateTime.fromISO(dateFromCalendar, {zone: 'Asia/Seoul'}).toFormat(
    'yyyy-MM-dd',
  )

export const compare = (a, b) => {
  if (a.roomNumber < b.roomNumber) return -1
  if (a.roomNumber > b.roomNumber) return 1
  return 0
}

export const compareCheckInDate = (a, b) => {
  if (a.checkInDate < b.checkInDate) return -1
  if (a.checkInDate > b.checkInDate) return 1
  return 0
}

export const platformColor = {
  airbnb: '#ed3b85',
  expedia: '#3b53ed',
  agoda: '#873f92',
  ctrip: '#baed3b',
  cash: '#37d664',
}

export const getDaysArray = (start, end) => {
  const arr = []
  const dt = start
  for (dt; dt <= end; dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt))
  }
  return arr.map(v => v.toISOString().slice(0, 10))
}

export const filterGuestHouse = (guestHouseName, filter) => {
  if (filter) {
    return filter === guestHouseName
  }
  // empty string will return everything
  return true
}

export const numOfGuests = guests => {
  return guests === 1 ? 2 : guests
}

export const numOfTowels = (guests, nights) => {
  const num = Math.round(guests * nights * 1.5)
  if (num > 10) {
    return 10
  } else {
    return num
  }
}
