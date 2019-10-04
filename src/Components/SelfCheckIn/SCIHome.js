import React from "react";
import { Link } from "@reach/router";

export default () => (
  <div
    style={{
      color: "white",
      height: "45vh",
      fontSize: "40px",
      display: "flex",
      alignItems: "start",
      justifyContent: "flex-end"
    }}
  >
    <Link
      to="platform"
      style={{ color: "white", textAlign: "right", paddingRight: "30px" }}
    >
      Tap here to check-in
    </Link>
  </div>
);
