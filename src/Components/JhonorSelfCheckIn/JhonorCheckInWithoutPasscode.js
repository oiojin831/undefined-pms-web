import React from "react";

import { jhonorData } from "../../Constants/roomName";

export default props => {
  return props.location ? (
    <div
      style={{
        color: "white",
        fontSize: "20px",
        height: "50vh",
        display: "flex",
        paddingTop: "30px",
        paddingRight: "10px",
        justifyContent: "start",
        flexDirection: "column",
        textAlign: "right"
      }}
    >
      <br />
      <div
        style={{
          fontWeight: "bold",
          fontSize: "40px",
          textAlign: "center"
        }}
      >{`Hello ${props.location.state.guestName}`}</div>
      <br />
      <br />
      <div
        style={{
          textAlign: "center",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: "20px 20px"
        }}
      >
        <div>Check in time is from 4pm.</div>
        <div>Your room will be ready by 4pm.</div>
        <div>
          Please do not knock the door or try to enter the room before 4pm.
        </div>
        <div>Other guest will be inside.</div>
        <br />
        <div>But you can get your roomnumber after 1pm</div>
        <div>Please check it after 1pm at this kiosk.</div>
        <div>Meanwhile you can leave your luggage in your luggage room.</div>
        <div>You can use any wifi.</div>
        <div> All the passcode for wifi is "77777777"</div>
      </div>
    </div>
  ) : (
    <div>no</div>
  );
};
