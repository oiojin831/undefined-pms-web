import React from 'react'

import {firebase} from '../../firebase'
import {Button} from 'antd'

import CleanerSetting from './Cleaner'
import AdminSetting from './Admin'

export default ({user}) => {
  const handleClick = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    await firebase.auth().signInWithPopup(provider)
  }
  return (
    <div>
      <div>Please sign in</div>
      <Button onClick={handleClick}>Sign in with Google</Button>
    </div>
  )
}

export {CleanerSetting, AdminSetting}
