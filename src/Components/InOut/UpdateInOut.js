import React, {useState} from 'react'
import {db} from '../../firebase.js'
import {Formik} from 'formik'
import {Input, InputNumber, SubmitButton} from '@jbuschke/formik-antd'

export default props => {
  const [inTime, setInTime] = useState(props.checkInTime)
  const [outTime, setOutTime] = useState(props.checkOutTime)
  const [cleaningMemo, setCleaningMemo] = useState(props.cleaningMemo)
  return (
    <div
      style={{
        border: '1px solid black',
        margin: '5px',
      }}>
      <div>{`Guest name: ${props.guestName}`}</div>
      <div>{`CheckIn: ${props.checkInDate}, Time: ${inTime}`}</div>
      <div>{`CheckOut: ${props.checkOutDate}, Time: ${outTime}`}</div>
      {cleaningMemo && <div>{`Cleaning Memo: ${cleaningMemo}`}</div>}

      <Formik
        initialValues={{
          checkInTime: props.checkInTime,
          checkOutTime: props.checkOutTime,
          cleaningMemo: props.cleaningMemo,
        }}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true)
          const query = db.collection('reservations').doc(props.id)
          console.log('props.id', props.id)
          try {
            await query.update({
              checkInTime: values.checkInTime,
              checkOutTime: values.checkOutTime,
            })
            values.cleaningMemo &&
              query.set(
                {
                  cleaningMemo: values.cleaningMemo,
                },
                {merge: true},
              )
            setInTime(values.checkInTime)
            setOutTime(values.checkOutTime)
            setCleaningMemo(values.cleaningMemo)
            actions.setSubmitting(false)
          } catch (error) {
            console.log('error', error.toString())
          }
        }}
        render={({values, isSubmitting}) => (
          <React.Fragment>
            <div style={{marginTop: '10px'}}>
              <span>CheckInTime: </span>
              <InputNumber name="checkInTime" />
            </div>
            <div style={{marginTop: '10px'}}>
              <span>CheckOutTime: </span>
              <InputNumber name="checkOutTime" />
            </div>
            <div style={{marginTop: '10px'}}>
              <span>cleaning memo</span>
              <Input name="cleaningMemo" />
            </div>
            <div style={{marginTop: '10px'}}>
              <SubmitButton disabled={isSubmitting}>Submit</SubmitButton>
            </div>
          </React.Fragment>
        )}
      />
    </div>
  )
}
