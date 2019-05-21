import React from 'react'
import {db} from '../../firebase.js'
import {Formik} from 'formik'
import {Input, SubmitButton} from '@jbuschke/formik-antd'
import {navigate} from '@reach/router'

export default () => {
  return (
    <React.Fragment>
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
      <Formik
        initialValues={{
          reservationCode: '',
        }}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true)
          let docId
          const query = db
            .collection('reservations')
            .where(
              'reservationCode',
              '==',
              values.reservationCode.toUpperCase(),
            )
          try {
            const docs = await query.get()
            docs.forEach(doc => {
              console.log('num')
              docId = doc.id
            })
            actions.setSubmitting(false)
            navigate(`reservation/${docId}`)
          } catch (error) {
            console.log('error', error.toString())
          }
        }}
        render={({values, isSubmitting}) => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}>
            <Input name="reservationCode" placeholder="HMAAJ9TKCQ" />
            <div style={{marginTop: '10px', alignSelf: 'flex-end'}}>
              <SubmitButton disabled={isSubmitting}>GO !</SubmitButton>
            </div>
            <div
              style={{
                fontSize: '30px',
                alignSelf: 'flex-end',
                textAlign: 'right',
                paddingTop: '5%',
              }}>
              Please enter your confirmation number.
            </div>
          </div>
        )}
      />
    </React.Fragment>
  )
}
