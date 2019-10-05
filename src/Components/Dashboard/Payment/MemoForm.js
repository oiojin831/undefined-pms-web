import React, { useState } from "react";
import { db } from "../../../firebase.js";
import { Formik } from "formik";
import { Input, InputNumber, SubmitButton } from "@jbuschke/formik-antd";

export default props => {
  const [checkInOutMemo, setCheckInOutMemo] = useState(props.checkInOutMemo);
  return (
    <div>
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
          <React.Fragment>
            <div style={{ marginTop: "10px" }}>
              <span>Memo</span>
              <Input name="checkInOutMemo" />
            </div>
            <div style={{ marginTop: "10px" }}>
              <SubmitButton disabled={isSubmitting}>Save</SubmitButton>
            </div>
          </React.Fragment>
        )}
      />
    </div>
  );
};
