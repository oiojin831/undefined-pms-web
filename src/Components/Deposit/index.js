import React, {useState, useEffect} from 'react'

import {db} from '../../firebase'

import {formattedNow} from '../../util'

export default () => {
  const [reservations, setReservations] = useState([])
  async function fetchDeposits() {
    const docs = []
    try {
      const query = await db
        .collection('reservations')
        .where('checkOutDate', '>=', formattedNow)
        .where('platform', '==', 'cash')
        .get()
      query.forEach(doc => {
        docs.push({...doc.data(), id: doc.id})
      })
      setReservations(docs)
    } catch (error) {
      console.log('error', error.toString())
    }
  }

  useEffect(() => {
    fetchDeposits()
  }, [])
  console.log('de', reservations)
  return (
    <div>
      {reservations.map(res => {
        return (
          <div key={res.id}>
            <div>{res.checkOutDate}</div>
            <div>{res.roomNumber}</div>
            <div>{res.deposit}</div>
          </div>
        )
      })}
    </div>
  )
}
