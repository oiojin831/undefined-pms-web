import React, {useState, useEffect} from 'react'
import UpdateRes from './UpdateRes'

import {db} from '../../firebase.js'

export default props => {
  const [reservation, setReservation] = useState(null)

  useEffect(() => {
    db.collection('reservations')
      .doc(props.id)
      .get()
      .then(doc => {
        console.log('doc', doc)
        setReservation({...doc.data(), id: doc.id})
      })
  }, [])

  return reservation && <UpdateRes {...reservation} />
}
