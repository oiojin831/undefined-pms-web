import React, {useState} from 'react'
import {Formik} from 'formik'
import {DatePicker, Radio, SubmitButton} from '@jbuschke/formik-antd'
import UpdateInOut from './UpdateInOut'

import {db} from '../../firebase.js'

import {formattedNow, fromISOtoString} from '../../util'
import {resources} from '../../Constants/roomName'

export default () => {
  const [reservations, setReservations] = useState([])

  async function fetchDocs(values, actions) {
    actions.setSubmitting(true)
    const query = db
      .collection('reservations')
      .where(values.inOut, '==', fromISOtoString(values.date))
      .where('roomNumber', '==', values.roomNumber)

    try {
      const snap = await query.get()
      const tempRes = snap.docs.map(doc => {
        return {...doc.data(), id: doc.id}
      })
      setReservations(tempRes)
      actions.setSubmitting(false)
    } catch (error) {
      console.log('error', error.toString())
    }
  }

  return (
    <Formik
      initialValues={{
        date: formattedNow,
      }}
      onSubmit={(values, actions) => {
        fetchDocs(values, actions)
      }}
      render={({isSubmitting, values}) => (
        <React.Fragment>
          <div style={{marginTop: '50px'}}>
            <DatePicker name="date" />
          </div>

          <div style={{marginTop: '10px'}}>
            <Radio.Group name="inOut">
              <Radio.Button value="checkInDate">Check In</Radio.Button>
              <Radio.Button value="checkOutDate">Check Out</Radio.Button>
            </Radio.Group>
          </div>
          <div style={{marginTop: '10px'}}>
            <Radio.Group name="roomNumber">
              {resources.map(room => (
                <Radio.Button key={room.id} value={room.id}>
                  {room.id}
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>
          <div style={{marginTop: '10px'}}>
            <SubmitButton disabled={isSubmitting}>Submit</SubmitButton>
          </div>
          {reservations.map(res => (
            <UpdateInOut
              key={`update-in-out-${res.reservationCode}`}
              {...res}
            />
          ))}
        </React.Fragment>
      )}
    />
  )
}
