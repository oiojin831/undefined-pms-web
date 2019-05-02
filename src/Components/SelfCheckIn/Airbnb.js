import React, {useState} from 'react'
import {Formik} from 'formik'
import {Input, SubmitButton} from '@jbuschke/formik-antd'
import {db} from '../../firebase.js'
import {navigate} from '@reach/router'

export default () => {
  async function fetchDocs(values, actions) {
    actions.setSubmitting(true)
    const query = db
      .collection('reservations')
      .where('reservationCode', '==', values.reservationCode)

    try {
      const snap = await query.get()
      const tempRes = snap.docs.map(doc => {
        return {...doc.data(), id: doc.id}
      })
      console.log('tempRes', JSON.stringify(tempRes[0]))
      actions.setSubmitting(false)
      navigate('check-in-info', {state: tempRes[0]})
    } catch (error) {
      console.log('error', error.toString())
    }
  }
  return (
    <Formik
      initialValues={{reservationCode: ''}}
      onSubmit={(values, actions) => {
        fetchDocs(values, actions)
      }}
      render={({isSubmitting, values}) => (
        <React.Fragment>
          <Input name="reservationCode" />
          <div style={{marginTop: '10px'}}>
            <SubmitButton disabled={isSubmitting}>Submit</SubmitButton>
          </div>
        </React.Fragment>
      )}
    />
  )
}
