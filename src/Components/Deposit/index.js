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
  return (
    <div style={{marginTop: '50px'}}>
      {reservations.map(res => {
        return (
          <div
            key={res.id}
            style={{padding: '10px', borderBottom: '1px solid black'}}>
            <div>{`Check Out Date: ${res.checkOutDate}`}</div>
            <div>{`Room Number: ${res.roomNumber}`}</div>
            <div>{`Deposit: ${res.deposit}`}</div>
          </div>
        )
      })}
    </div>
  )
}
