import React from "react";

import JSCIHome from "./JSCIHome";
import JhonorCheckInWithReservationId from "./JhonorCheckInWithReservationId";
import JhonorInfo from "./JhonorInfo";
import JhonorCheckInInfo from "./JhonorCheckInInfo";
import JhonorCheckInWithoutPasscode from "./JhonorCheckInWithoutPasscode";
import JhonorPlatform from "./JhonorPlatform";
import "./index.css";
import desktopImage from "../../jhonor-bg.jpg";
import { Link } from "@reach/router";
import logo from "../../jhonor-logo-3.png";

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
            width: "200px",
            height: "174px",
            marginRight: "100px"
          }}
        ></div>
      </div>
      {children}
      <div style={{ alignSelf: "center", marginLeft: "10px" }}>
        <Link
          style={{
            fontSize: "30px",
            padding: "20px 10px",
            border: "solid 2px #FEF8D6",
            borderRadius: "5px",
            color: "#FEF8D6"
          }}
          to="/jhonor-self-check-in"
        >
          HOME
        </Link>
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
  JhonorCheckInInfo,
  JhonorCheckInWithoutPasscode
};
