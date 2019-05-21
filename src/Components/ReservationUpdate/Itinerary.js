import React, {useState, useEffect} from 'react'
import {db} from '../../firebase.js'
import {to12From} from '../../util'

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
      <div
        style={{
          height: '40vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          fontSize: '100px',
          color: 'white',
          fontWeight: 'bold',
        }}>
        dmyk.
      </div>
      <div style={{fontSize: '30px', fontWeight: 'bold'}}>Completed!</div>
      <div style={{paddingTop: '5%', fontSize: '30px'}}>Your Itinerary</div>
      <div style={{fontSize: '25px', paddingTop: '5%'}}>
        <div>check-in</div>
        <div>
          {`${reservation.checkInDate}  ${to12From(reservation.checkInTime)}`}{' '}
        </div>
        <div>check-out</div>
        <div>
          {`${reservation.checkOutDate}  ${to12From(reservation.checkOutTime)}`}{' '}
        </div>
      </div>
    </div>
  ) : null
}
