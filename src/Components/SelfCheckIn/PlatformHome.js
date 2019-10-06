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
        padding: "30px 20px",
        border: "solid 2px #FEF8D6",
        borderRadius: "5px",
        color: "#FEF8D6",
        marginRight: "20px"
      }}
    >
      Airbnb
    </Link>
    <Link
      to="others"
      style={{
        fontSize: "30px",
        padding: "30px 20px",
        border: "solid 2px #FEF8D6",
        borderRadius: "5px",
        color: "#FEF8D6"
      }}
    >
      Other Platform
    </Link>
  </div>
);
