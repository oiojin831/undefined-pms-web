import React from 'react'
import {Button} from 'antd'
import {firebase} from '../../firebase'
import {navigate} from '@reach/router'

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
    <div style={{margin: '100px'}}>
      <Button onClick={handleClick}>LogOut</Button>
    </div>
  )
}
