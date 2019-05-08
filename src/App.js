import React, {useState, useEffect} from 'react'
import Home from './Components/Home'
import ReservationUpdate from './Components/ReservationUpdate'
import UpdateRes from './Components/ReservationUpdate/UpdateRes'
import GetReservationId from './Components/ReservationUpdate/GetReservationId'
import Itinerary from './Components/ReservationUpdate/Itinerary'
import ExtendTime from './Components/ReservationUpdate/ExtendTime'
import {firebase} from './firebase'
import Dashboard from './Components/Dashboard'
import Cleaning from './Components/Cleaning'
import Calendar from './Components/Calendar'
import Deposit from './Components/Deposit'
import InOut from './Components/InOut'
import NewCash from './Components/NewCash'
import Admin from './Components/Admin'
import {
  SelfCheckIn,
  SCIHome,
  Platform,
  PlatformHome,
  Airbnb,
  Others,
  CheckInInfo,
  DmykInfo,
} from './Components/SelfCheckIn'

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
        <SelfCheckIn path="/self-check-in">
          <NotFound default />
          <SCIHome path="/" />
          <Platform path="platform">
            <NotFound default />
            <PlatformHome path="/" />
            <Airbnb path="airbnb" />
            <Others path="others" />
            <CheckInInfo path="check-in-info" />
            <DmykInfo path="dmyk-info" />
          </Platform>
        </SelfCheckIn>
        <ReservationUpdate path="/reservation">
          <NotFound default />
          <GetReservationId path="/" />
          <UpdateRes path=":id">
            <NotFound default />
            <ExtendTime path="/" />
            <Itinerary path="itinerary" />
          </UpdateRes>
        </ReservationUpdate>
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
