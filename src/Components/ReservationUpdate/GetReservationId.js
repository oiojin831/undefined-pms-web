import React from 'react'
import {db} from '../../firebase.js'
import {Formik} from 'formik'
import {Input, SubmitButton} from '@jbuschke/formik-antd'
import {navigate} from '@reach/router'

export default () => {
  return (
    <Formik
      initialValues={{
        reservationCode: '',
      }}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true)
        let docId
        const query = db
          .collection('reservations')
          .where('reservationCode', '==', values.reservationCode)
        try {
          const docs = await query.get()
          docs.forEach(doc => {
            docId = doc.id
          })
          actions.setSubmitting(false)
          navigate(`reservation/${docId}`)
        } catch (error) {
          console.log('error', error.toString())
        }
      }}
      render={({values, isSubmitting}) => (
        <div>
          <Input name="reservationCode" />
          <div style={{marginTop: '10px'}}>
            <SubmitButton disabled={isSubmitting}>Submit</SubmitButton>
          </div>
        </div>
      )}
    />
  )
}
