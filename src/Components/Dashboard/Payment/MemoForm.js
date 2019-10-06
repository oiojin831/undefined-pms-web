import React, { useState } from "react";
import { db } from "../../../firebase.js";
import { Formik } from "formik";
import { Input, SubmitButton } from "@jbuschke/formik-antd";

export default props => {
  const [checkInOutMemo, setCheckInOutMemo] = useState(props.checkInOutMemo);
  return (
    <div style={{ margin: "0 10px" }}>
      {checkInOutMemo && <div>{`Memo: ${checkInOutMemo}`}</div>}

      <Formik
        initialValues={{
          checkInOutMemo: props.checkInOutMemo
        }}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true);
          const query = db.collection("reservations").doc(props.id);
          try {
            values.checkInOutMemo &&
              query.set(
                {
                  checkInOutMemo: values.checkInOutMemo
                },
                { merge: true }
              );
            setCheckInOutMemo(values.checkInOutMemo);
            actions.setSubmitting(false);
          } catch (error) {
            console.log("error", error.toString());
          }
        }}
        render={({ values, isSubmitting }) => (
          <div style={{ marginTop: "10px", display: "flex" }}>
            <Input name="checkInOutMemo" />
            <SubmitButton
              disabled={isSubmitting}
              style={{ marginLeft: "10px" }}
            >
              Save
            </SubmitButton>
          </div>
        )}
      />
    </div>
  );
};
