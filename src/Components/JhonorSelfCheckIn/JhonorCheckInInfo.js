import React from "react";

import { jhonorData } from "../../Constants/roomName";

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
      <div>Your room is..</div>
      <br />
      <div
        style={{
          fontWeight: "bold",
          fontSize: "40px"
        }}
      >{`Room ${props.location.state.roomNumber}`}</div>
      <div
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
