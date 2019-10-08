import React from "react";

import JSCIHome from "./JSCIHome";
import JhonorCheckInWithReservationId from "./JhonorCheckInWithReservationId";
import JhonorInfo from "./JhonorInfo";
import JhonorCheckInInfo from "./JhonorCheckInInfo";
import JhonorPlatform from "./JhonorPlatform";
import "./index.css";
import desktopImage from "../../jhonor-bg.jpg";
import { Link } from "@reach/router";
import logo from "../../jhonor-logo-2.png";

const JhonorSelfCheckIn = ({ children }) => {
  return (
    <div className="App" style={{ backgroundImage: `url(${desktopImage})` }}>
      <div
        style={{
          height: "40vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          fontSize: "100px",
          color: "white",
          fontWeight: "bold"
        }}
      >
        <div
          style={{
            backgroundImage: `url(${logo})`,
            width: "368px",
            height: "141px"
          }}
        ></div>
      </div>
      {children}
      <div
        style={{
          display: "flex",
          height: "10vh",
          justifyContent: "flex-end",
          marginRight: "10px"
        }}
      >
        <Link to="/jhonor-self-check-in">HOME</Link>
      </div>
    </div>
  );
};

export {
  JhonorSelfCheckIn,
  JSCIHome,
  JhonorCheckInWithReservationId,
  JhonorInfo,
  JhonorPlatform,
  JhonorCheckInInfo
};
