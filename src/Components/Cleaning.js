import React, {useState, useEffect} from 'react'

import {db} from '../firebase'
import {compare, filterGuestHouse, numOfGuests, numOfTowels, now} from '../util'

import './Cleaning.css'

export default () => {
  const [filter, setFilter] = useState('')
  const [date, setDate] = useState(now)
  const [reservations, setReservations] = useState([])

  async function fetchDocs() {
    const docs = []
    const query = await db
      .collection('reservations')
      .where('stayingDates', 'array-contains', date.toFormat('yyyy-MM-dd'))
      .get()
    query.forEach(doc => {
      docs.push({...doc.data(), id: doc.id})
    })
    setReservations(docs)
  }

  useEffect(() => {
    fetchDocs()
  }, [date])

  return (
    <div>
      <span onClick={() => setDate(date.minus({days: 1}))}>{'<<<<'}</span>
      <span>{date.toFormat('yyyy-MM-dd')}</span>
      <span onClick={() => setDate(date.plus({days: 1}))}>{'>>>>'}</span>
      <div>
        <span onClick={() => setFilter('sinsa')}>sinsa**</span>
        <span onClick={() => setFilter('')}>**ALL**</span>
        <span onClick={() => setFilter('dmyk')}>**dmyk</span>
      </div>

      {reservations
        .sort(compare)
        .filter(res => filterGuestHouse(res.guestHouseName, filter))
        .filter(res => res.checkOutDate === date.toFormat('yyyy-MM-dd'))
        .map(outRes => {
          // reservation of tmr with same room
          // list is based on out but the data except out time are in data
          const inSameRoomRes = reservations
            .filter(allRes => allRes.roomNumber === outRes.roomNumber)
            .filter(
              sameRoom => sameRoom.checkInDate === date.toFormat('yyyy-MM-dd'),
            )
            .filter(Boolean)[0]

          if (inSameRoomRes) {
            const guests = numOfGuests(parseInt(inSameRoomRes.guests))
            const cleaningMemo = inSameRoomRes.cleaningMemo

            return (
              <div key={outRes.reservationCode} className="box">
                <h1>{outRes.roomNumber}</h1>
                <div>{`Check Out: ${outRes.checkOutTime}`}</div>
                <div>{`Check In: ${inSameRoomRes.checkInTime}`}</div>
                <div>{`# of guests: ${guests}`}</div>
                <div>{`towels: ${numOfTowels(
                  guests,
                  inSameRoomRes.nights,
                )}`}</div>
                <div>{`*${inSameRoomRes.platform} - ${
                  inSameRoomRes.reservationCode
                }*`}</div>
                {cleaningMemo && (
                  <div style={{color: 'red'}}>
                    {`Cleaning Memo: ${cleaningMemo}`}
                  </div>
                )}
              </div>
            )
          } else {
            return (
              <div key={outRes.reservationCode} className="box">
                <h1>{outRes.roomNumber}</h1>
                <div>{`Check Out: ${outRes.checkOutTime}`}</div>
                <div>{'N/A'}</div>
              </div>
            )
          }
        })}
    </div>
  )
}
