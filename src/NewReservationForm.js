import React from 'react'
import {Formik} from 'formik'
import {formattedNow, formattedTmr} from './util.js'
import {
  RadioGroupField,
  DatePickerField,
  InputField,
  SubmitButton,
} from '@jbuschke/formik-antd'
import {db} from './firebase.js'
import {Divider, Button} from 'antd'

export default () => {
  //reading formik tutorial
  return (
    <Formik
      initialValues={{
        guestHouseName: 'dmyk',
        guestName: '',
        guests: 2,
        checkInDate: formattedNow,
        cehckOutDate: formattedTmr,
        checkInTime: 11,
        checkOutTime: 15,
        payoutPrice: '',
        deposit: '',
        roomNumber: '',
        phoneNumber: '',
        platform: 'cash',
      }}
      onSubmit={(values, actions) => {
        db.collection('reservations')
          .doc(`${values.platform}-${formattedNow}${values.roomNumber}`)
          .set({
            ...values,
          })
      }}
      render={({errors, status, touched, isSubmitting}) => (
        <React.Fragment>
          <div>
            <InputField name="guestName" />
          </div>
          <div>
            <RadioGroupField
              name="guestHouseName"
              dataSource={[
                {label: 'DMYK', value: 'dmyk'},
                {label: 'Sinsa', value: 'sinsa'},
              ]}
            />
          </div>
          <div>
            <DatePickerField name="checkInDate" />
          </div>
          <div>
            <SubmitButton disabled={isSubmitting}>Submit</SubmitButton>
          </div>
        </React.Fragment>
      )}
    />
  )
}
