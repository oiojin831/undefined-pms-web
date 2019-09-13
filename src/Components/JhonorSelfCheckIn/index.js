import React from "react";

import JSCIHome from "./JSCIHome";
import JhonorCheckInWithReservationId from "./JhonorCheckInWithReservationId";
import JhonorInfo from "./JhonorInfo";
import JhonorCheckInInfo from "./JhonorCheckInInfo";
import JhonorPlatform from "./JhonorPlatform";
import "./index.css";
import desktopImage from "../../bg.jpg";
import { Link } from "@reach/router";

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
        j honor
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
