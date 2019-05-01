import React, {useState, useEffect} from 'react'
import {db} from '../../firebase.js'
import {Button} from 'antd'

const inOutTime = {
  dmyk: {in: 16, out: 10},
  sinsa: {in: 15, out: 11},
}

export default props => {
  const [inTime, setInTime] = useState(0)
  const [outTime, setOutTime] = useState(0)
  const [timeCount, setTimeCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [reservation, setReservation] = useState(null)
  const [extraFee, setExtraFee] = useState(0)

  const payHandler = async () => {
    setLoading(true)
    const query = db.collection('reservations').doc(reservation.id)
    try {
      await query.update({
        checkInTime: inTime,
        checkOutTime: outTime,
        extraFee: extraFee + timeCount * 5000,
      })
      setLoading(false)
    } catch (error) {
      console.log('error', error.toString())
    }
  }

  const adjustInTime = (op, inOut, guestHouse) => {
    const time = inOutTime[guestHouse]
    if (op === 'inc') {
      if (inOut === 'in') {
        if (inTime < time.in) {
          setInTime(inTime + 1)
          setTimeCount(timeCount - 1)
          return
        }
      } else {
        if (outTime < time.in - 1) {
          setOutTime(outTime + 1)
          setTimeCount(timeCount + 1)
          return
        }
      }
    }
    if (op === 'dec') {
      if (inOut === 'in') {
        if (inTime > time.out + 1) {
          setInTime(inTime - 1)
          setTimeCount(timeCount + 1)
          return
        }
      }
      if (outTime > time.out) {
        setOutTime(outTime - 1)
        setTimeCount(timeCount - 1)
        return
      }
    }
  }

  useEffect(() => {
    db.collection('reservations')
      .doc(props.id)
      .get()
      .then(doc => {
        console.log('doc', doc)
        setReservation({...doc.data(), id: doc.id})
        setInTime(doc.data().checkInTime)
        setOutTime(doc.data().checkOutTime)
        setExtraFee(doc.data().extraFee || 0)
      })
  }, [])

  return reservation ? (
    <React.Fragment>
      <div>{`CheckIn: ${reservation.checkInDate}, Time: ${inTime}`}</div>
      <div>{`CheckOut: ${reservation.checkOutDate}, Time: ${outTime}`}</div>

      <div style={{marginTop: '10px'}}>
        <span>CheckInTime: </span>
        <span
          onClick={() => adjustInTime('dec', 'in', reservation.guestHouseName)}>
          minus
        </span>
        {inTime}
        <span
          onClick={() => adjustInTime('inc', 'in', reservation.guestHouseName)}>
          plus
        </span>
      </div>
      <div style={{marginTop: '10px'}}>
        <span>CheckoutTime: </span>
        <span
          onClick={() =>
            adjustInTime('dec', 'out', reservation.guestHouseName)
          }>
          minus
        </span>
        {outTime}
        <span
          onClick={() =>
            adjustInTime('inc', 'out', reservation.guestHouseName)
          }>
          plus
        </span>
      </div>
      <div>{`5000won X ${timeCount}hours ${
        extraFee ? `+ ${extraFee}won(previous)` : ''
      } = ${5000 * timeCount + extraFee}won`}</div>
      {loading ? <div>loading</div> : <Button onClick={payHandler}>PAY</Button>}
    </React.Fragment>
  ) : (
    <div> loading</div>
  )
}
