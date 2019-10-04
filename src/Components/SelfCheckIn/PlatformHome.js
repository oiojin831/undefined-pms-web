import React from "react";
import { Link } from "@reach/router";
import { Button } from "antd";

export default () => (
  <div
    style={{
      height: "45vh",
      display: "flex",
      alignItems: "start",
      paddingTop: "50px",
      justifyContent: "center"
    }}
  >
    <Link
      to="airbnb"
      style={{
        fontSize: "30px",
        padding: "50px 40px",
        border: "solid 2px #F75924",
        borderRadius: "5px",
        color: "#F75924",
        marginRight: "20px"
      }}
    >
      Airbnb
    </Link>
    <Link
      to="others"
      style={{
        fontSize: "30px",
        padding: "50px 40px",
        border: "solid 2px #F75924",
        borderRadius: "5px",
        color: "#F75924"
      }}
    >
      Other Platform
    </Link>
  </div>
);
