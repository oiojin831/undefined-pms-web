import React, {useState, useEffect} from 'react'
import Home from './Components/Home'
import ReservationUpdate from './Components/ReservationUpdate'
import {firebase} from './firebase'
import Dashboard from './Components/Dashboard'
import Cleaning from './Components/Cleaning'
import Calendar from './Components/Calendar'
import Deposit from './Components/Deposit'
import InOut from './Components/InOut'
import NewCash from './Components/NewCash'
import Admin from './Components/Admin'

import {Router} from '@reach/router'

const NotFound = () => <div>Page not Found.</div>

export default () => {
  const [user, setUser] = useState(null)
  const [admin, setAdmin] = useState(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        setUser({dispalyName: user.displayName, uid: user.uid})
        const admin = await user.getIdTokenResult()
        setAdmin(admin.claims.admin)
      } else {
        setUser(null)
        setAdmin(null)
      }
    })
  }, [])

  return (
    <Router>
      <Home path="/">
        <NotFound default />
        <ReservationUpdate path="/reservation/:id" />
      </Home>
      <Dashboard path="/dashboard" user={user} admin={admin}>
        <NotFound default />
        <Cleaning path="cleaning" />
        <Calendar path="calendar" />
        <Deposit path="deposit" />
        <InOut path="in-out" />
        <NewCash path="newCash" />
        <Admin path="admin" />
      </Dashboard>
    </Router>
  )
}
