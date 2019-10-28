import React, { useState } from "react";
import { Formik } from "formik";
import { Input, SubmitButton } from "@jbuschke/formik-antd";
import { db } from "../../firebase.js";
import { Link, navigate } from "@reach/router";
import { DateTime } from "luxon";
import {
  formattedTmrToISOSeconds,
  formattedToISOSeconds,
  now
} from "../../util";

export default () => {
  const [noReservation, setNoReservation] = useState(null);

  async function fetchDocs(values, actions) {
    actions.setSubmitting(true);
    const query = db
      .collection("reservations")
      .where("reservationCode", "==", values.reservationCode);

    try {
      const snap = await query.get();
      const tempRes = snap.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
      });
      actions.setSubmitting(false);
      const resCheckInDate = tempRes[0].checkInDate;
      const resCheckOutDate = tempRes[0].checkOutDate;
      const printableTimeStart = formattedToISOSeconds(resCheckInDate, 13);
      const printableTimeEnd = formattedTmrToISOSeconds(resCheckOutDate, 10);
      const dayBeforeRes = formattedToISOSeconds(resCheckInDate, "01");
      console.log(dayBeforeRes);
      console.log(
        DateTime.utc()
          .setZone("Asia/Seoul")
          .toSeconds()
      );
      console.log(printableTimeStart);
      console.log(printableTimeStart);
      if (tempRes[0]) {
        if (
          printableTimeStart <
            DateTime.utc()
              .setZone("Asia/Seoul")
              .toSeconds() &&
          DateTime.utc()
            .setZone("Asia/Seoul")
            .toSeconds() < printableTimeEnd
        )
          navigate("jhonor-platform/jhonor-check-in-info", {
            state: tempRes[0]
          });
        else if (
          dayBeforeRes <
            DateTime.utc()
              .setZone("Asia/Seoul")
              .toSeconds() &&
          DateTime.utc()
            .setZone("Asia/Seoul")
            .toSeconds() < printableTimeStart
        ) {
          navigate("jhonor-platform/jhonor-check-in-without-passcode", {
            state: tempRes[0]
          });
        } else {
          setNoReservation("Expired Reservation");
        }
      } else {
        setNoReservation("There is no matching reservation");
      }
    } catch (error) {
      console.log("error", error.toString());
    }
  }
  return (
    <div
      style={{
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        padding: "20px"
      }}
    >
      <Formik
        initialValues={{ reservationCode: "" }}
        onSubmit={(values, actions) => {
          fetchDocs(values, actions);
        }}
        render={({ isSubmitting, values }) => (
          <React.Fragment>
            <div
              style={{
                color: "white",
                fontSize: "14px",
                textAlign: "center",
                paddingTop: "15px"
              }}
            >
              Please enter your confirmation number on the email.
              <br />
              바우처를 확인하시고 예약확인 코드를 입력해주세요.
            </div>
            <div
              style={{
                paddingTop: "15px",
                textAlign: "center",
                width: "100%"
              }}
            >
              <Input
                id="reservationCode"
                name="reservationCode"
                placeholder="32239992"
                size="large"
                style={{
                  backgroundColor: "transparent",
                  color: "white"
                }}
              />
            </div>
            <div
              style={{
                marginTop: "20px",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Link
                style={{
                  alignSelf: "flex-start",
                  color: "white",
                  fontWeight: "bold"
                }}
                to="/jhonor-self-check-in/platform/dmyk-info"
              >
                I don't have confirmation code
              </Link>
              <SubmitButton
                disabled={isSubmitting}
                size="large"
                style={{
                  backgroundColor: "transparent",
                  color: "white"
                }}
              >
                GO !
              </SubmitButton>
            </div>
            <div
              style={{
                color: "red",
                fontSize: "15px",
                textAlign: "right",
                marginTop: "15px"
              }}
            >
              {noReservation && noReservation}
            </div>
          </React.Fragment>
        )}
      />
    </div>
  );
};
