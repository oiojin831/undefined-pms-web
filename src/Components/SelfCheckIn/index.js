import React from "react";

import SCIHome from "./SCIHome";
import Platform from "./Platform";
import PlatformHome from "./PlatformHome";
import Airbnb from "./Airbnb";
import Others from "./Others";
import CheckInInfo from "./CheckInInfo";
import DmykInfo from "./DmykInfo";
import "./index.css";
import desktopImage from "../../bg.jpg";
import logo from "../../dmyk-1.png";
import { Link } from "@reach/router";

const SelfCheckIn = ({ children }) => {
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
          height: "15vh",
          justifyContent: "space-between",
          marginRight: "10px"
        }}
      >
        <div style={{ alignSelf: "center", marginLeft: "10px" }}>
          <Link
            style={{
              fontSize: "30px",
              padding: "20px 10px",
              border: "solid 2px #FEF8D6",
              borderRadius: "5px",
              color: "#FEF8D6"
            }}
            to="/self-check-in"
          >
            HOME
          </Link>
        </div>
        <div
          style={{
            marginRight: "10px",
            color: "white",
            textAlign: "right",
            fontSize: "small"
          }}
        >
          If you reserved from Airbnb, you don't need to use this machine.
          <br />
          You can just refer you message from Airbnb application for passcode.
          <br />
          Airbnb로 예약하셨으면 키오스크 사용없이 그냥 메세지에서 비밀번호를
          확인해 주세요.
          <br />
          如果你从Airbox那里预订的话,你不用使用这台机器。
          <br />
          您可以从Airbox应用程序中引用您的信息。
          <br />
          Airbnbから予約した場合,この機械を使用する必要はありません。
          <br />
          Airbnb アプリケーションからのメッセージだけを参照できます。
          <br />
        </div>
      </div>
    </div>
  );
};

export {
  SelfCheckIn,
  SCIHome,
  Platform,
  PlatformHome,
  Others,
  Airbnb,
  CheckInInfo,
  DmykInfo
};
