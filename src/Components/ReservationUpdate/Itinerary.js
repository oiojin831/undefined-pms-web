import React, {useState, useEffect} from 'react'
import {db} from '../../firebase.js'

export default props => {
  const [reservation, setReservation] = useState(null)

  useEffect(() => {
    db.collection('reservations')
      .doc(props.id)
      .get()
      .then(doc => {
        setReservation({...doc.data(), id: doc.id})
      })
  }, [])
  return reservation ? (
    <div>
      <div>{`check-in: ${reservation.checkInTime} ${
        reservation.checkInDate
      }`}</div>
      <div>{`check-out: ${reservation.checkOutTime} ${
        reservation.checkOutDate
      }`}</div>
    </div>
  ) : null
}
