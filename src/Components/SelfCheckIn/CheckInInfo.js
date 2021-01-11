import React from "react";

const passCode = {
  dmyk101: {
    passCode: "2046🔓",
    wifi: "dmyk1-1 / dmykdmyk11 or dmyk-1-lounge / dmykseoul1228",
  },
  dmyk102: {
    passCode: "7314🔓",
    wifi: "dmyk-101 / dmykdmyk101 or dmyk1-1 / dmykdmyk11",
  },
  dmyk103: {
    passCode: "5940🔓",
    wifi: "dmyk-101 / dmykdmyk101 or dmyk1-1 / dmykdmyk11",
  },
  dmyk104: {
    passCode: "2193🔓",
    wifi: "dmyk-101 / dmykdmyk101 or dmyk1-1 / dmykdmyk11",
  },
  dmyk201: {
    passCode: "0679🔓",
    wifi: "dmyk2 / dmykdmyk2 or dmyk2-2 / dmykdmyk22",
  },
  dmyk202: {
    passCode: "4730🔓",
    wifi: "dmyk2-3 / dmykdmyk23 or dmyk2-2 / dmykdmyk22",
  },
  dmyk203: {
    passCode: "0593🔓",
    wifi: "dmyk2-4 / dmykdmyk24 or dmyk2-3 / dmykdmyk23",
  },
  dmyk204: {
    passCode: "5451🔓",
    wifi: "dmyk2-4 / dmykdmyk24 or dmyk2-3 / dmykdmyk23",
  },
  dmyk300: { passCode: "121210*", wifi: "dmyk / checkout10" },
};

export default (props) => {
  return props.location ? (
    <div
      style={{
        color: "white",
        fontSize: "30px",
        height: "45vh",
        display: "flex",
        paddingTop: "30px",
        paddingRight: "10px",
        justifyContent: "start",
        flexDirection: "column",
        textAlign: "right",
      }}
    >
      <div>Your room is..</div>
      <br />
      <div
        style={{
          fontWeight: "bold",
          fontSize: "40px",
        }}
      >{`Room ${props.location.state.roomNumber.match(/\d/g).join("")}`}</div>
      <div
        style={{
          fontWeight: "bold",
          fontSize: "40px",
        }}
      >{`Passcode ${
        passCode[props.location.state.roomNumber]["passCode"]
      }`}</div>
      <div style={{ fontSize: "10px" }}>
        Don't forget to enter 🔓 in the end.
      </div>
      <div>Your wifi is..</div>
      <div>{`${passCode[props.location.state.roomNumber]["wifi"]}`}</div>
    </div>
  ) : (
    <div>no</div>
  );
};
