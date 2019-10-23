import React from "react";
import { navigate } from "@reach/router";
import { jhonorData } from "../../Constants/roomName";
import IdleTimer from "react-idle-timer";

export default props => {
  return props.location ? (
    <div
      style={{
        color: "white",
        fontSize: "30px",
        height: "50vh",
        display: "flex",
        paddingTop: "30px",
        paddingRight: "10px",
        justifyContent: "start",
        flexDirection: "column",
        textAlign: "right"
      }}
    >
      <IdleTimer
        element={document}
        onIdle={() => {
          navigate("/jhonor-self-check-in/jhonor-platform/p", {
            state: props.location.state
          });
        }}
        debounce={250}
        timeout={2000}
      />
      <div
        id="checkInOut"
        style={{ display: "none" }}
      >{`${props.location.state.checkInDate}~${props.location.state.checkOutDate}`}</div>
      <div id="guestName" style={{ display: "none" }}>
        {props.location.state.guestName}
      </div>

      <div>Your room is..</div>
      <br />
      <div
        id="roomNumber"
        style={{
          fontWeight: "bold",
          fontSize: "40px"
        }}
      >{`Room ${props.location.state.roomNumber}`}</div>
      <div
        id="passcode"
        style={{
          fontWeight: "bold",
          fontSize: "40px"
        }}
      >{`Passcode ${
        jhonorData[props.location.state.roomNumber]["passcode"]
      }`}</div>
      <div style={{ fontSize: "10px" }}>
        Don't forget to enter * in the end.
      </div>
      <div>Your wifi is..</div>
      <div>{`${jhonorData[props.location.state.roomNumber]["wifi"]}`}</div>
    </div>
  ) : (
    <div>no</div>
  );
};
