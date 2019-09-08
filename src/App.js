import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";

import Home, { HomeGuide } from "./Components/Home";
import ReservationUpdate from "./Components/ReservationUpdate";
import UpdateRes from "./Components/ReservationUpdate/UpdateRes";
import GetReservationId from "./Components/ReservationUpdate/GetReservationId";
import Itinerary from "./Components/ReservationUpdate/Itinerary";
import ExtendTime from "./Components/ReservationUpdate/ExtendTime";
import { firebase } from "./firebase";
import Dashboard, {
  Cleaning,
  Calendar,
  NewCash,
  InOut,
  Deposit,
  Statistic,
  Payment
} from "./Components/Dashboard";
import LogIn, { CleanerSetting, AdminSetting } from "./Components/Setting";
import {
  SelfCheckIn,
  SCIHome,
  Platform,
  PlatformHome,
  Airbnb,
  Others,
  CheckInInfo,
  DmykInfo
} from "./Components/SelfCheckIn";

import "./index.css";

const NotFound = () => <div>Page not Found.</div>;

export default () => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        setUser({
          dispalyName: firebaseUser.displayName,
          uid: firebaseUser.uid
        });
        const admin = await firebaseUser.getIdTokenResult();
        setAdmin(admin.claims.admin);
      } else {
        setUser(null);
        setAdmin(null);
      }
    });
  }, []);

  return (
    <Router>
      <Home path="/">
        <NotFound default />
        <HomeGuide path="/" />
        <SelfCheckIn path="self-check-in">
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
        <ReservationUpdate path="reservation">
          <NotFound default />
          <GetReservationId path="/" />
          <UpdateRes path=":id">
            <NotFound default />
            <ExtendTime path="/" />
            <Itinerary path="itinerary" />
          </UpdateRes>
        </ReservationUpdate>
      </Home>
      <Dashboard path="dashboard" admin={admin} user={user}>
        <LogIn path="/" user={user} />
        <Cleaning path="cleaning" />
        <Calendar path="calendar" />
        <Deposit path="deposit" />
        <Statistic path="statistic" />
        <Payment path="payment" />
        <InOut path="in-out" />
        <NewCash path="newCash" />
        <AdminSetting path="admin-setting" />
        <CleanerSetting path="cleaner-setting" />
      </Dashboard>
    </Router>
  );
};
