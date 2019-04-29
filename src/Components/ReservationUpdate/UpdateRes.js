import React, {useState} from 'react'
import {db} from '../../firebase.js'
import {Formik} from 'formik'
import {InputNumber, SubmitButton} from '@jbuschke/formik-antd'

export default props => {
  const [inTime, setInTime] = useState(props.checkInTime)
  const [outTime, setOutTime] = useState(props.checkOutTime)

  return (
    <div
      style={{
        border: '1px solid black',
        margin: '5px',
      }}>
      <div>{`Hello ${props.guestName} :D`}</div>
      <div>
        To Extend your Check in / check out time, there is 5000 won per an hour.
      </div>
      <div>ex. 1 hour late check out and 2 hour early check in = 15000 won</div>
      <div>
        You could leave money in the room when you check out or wire transfer
        the money
      </div>
      <div> 79790134711 카카오뱅크 장재봉 </div>

      <div style={{color: 'red'}}>
        {' '}
        금액을 지불후에 시간을 변경해주시기 바랍니다. 입금이 확인되셔야 시간이
        적용이 됩니다.
      </div>

      <div>{`CheckIn: ${props.checkInDate}, Time: ${inTime}`}</div>
      <div>{`CheckOut: ${props.checkOutDate}, Time: ${outTime}`}</div>

      <Formik
        initialValues={{
          checkInTime: props.checkInTime,
          checkOutTime: props.checkOutTime,
        }}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true)
          const query = db.collection('reservations').doc(props.id)
          try {
            await query.update({
              checkInTime: values.checkInTime,
              checkOutTime: values.checkOutTime,
            })
            setInTime(values.checkInTime)
            setOutTime(values.checkOutTime)
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
              <SubmitButton disabled={isSubmitting}>Submit</SubmitButton>
            </div>
          </React.Fragment>
        )}
      />
    </div>
  )
}
