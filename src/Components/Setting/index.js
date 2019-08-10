import React from "react";

import { firebase } from "../../firebase";
import { Button } from "antd";

import CleanerSetting from "./Cleaner";
import AdminSetting from "./Admin";

export default ({ user }) => {
  const handleClick = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
  };
  return (
    <div>
      {user ? (
        <div>dashboard</div>
      ) : (
        <div styles={{ padding: "30px" }}>
          <div>Please sign in</div>
          <Button onClick={handleClick}>Sign in with Google</Button>
        </div>
      )}
    </div>
  );
};

export { CleanerSetting, AdminSetting };
