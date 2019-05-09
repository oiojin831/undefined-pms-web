import React from 'react'
import {navigate} from '@reach/router'
import {Formik} from 'formik'
import {Button} from 'antd'
import {Input, SubmitButton} from '@jbuschke/formik-antd'

import {functions, firebase} from '../../firebase'

export default () => {
  const handleClick = async () => {
    try {
      await firebase.auth().signOut()
      navigate('/dashboard')
    } catch (error) {
      console.log('error', JSON.stringify(error, null, 2))
    }
  }
  return (
    <React.Fragment>
      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true)
          // function call
          const addAdminRoll = functions.httpsCallable('addAdminRole')
          await addAdminRoll({email: values.email})
          actions.setSubmitting(false)
        }}
        render={({errors, values, status, touched, isSubmitting}) => (
          <div style={{marginTop: '50px'}}>
            <Input
              style={{marginTop: '10px'}}
              addonBefore="Email: "
              name="email"
            />
            <div style={{margin: '10px'}}>
              <SubmitButton disabled={isSubmitting}>Submit</SubmitButton>
            </div>
          </div>
        )}
      />
      <Button onClick={handleClick}>LogOut</Button>
    </React.Fragment>
  )
}
