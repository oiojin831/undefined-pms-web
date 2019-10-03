import React from "react";
import { Formik } from "formik";
import {
  Radio,
  DatePicker,
  Select,
  Input,
  InputNumber,
  SubmitButton
} from "@jbuschke/formik-antd";
import { DateTime } from "luxon";

import {
  formattedNow,
  formattedTmr,
  getDaysArray,
  fromISOtoString
} from "../../../util.js";
import { db } from "../../../firebase.js";
import {
  dmykOptions,
  sinsaOptions,
  jhonorOptions
} from "../../../Constants/roomName";

export default () => {
  //reading formik tutorial
  return (
    <Formik
      initialValues={{
        checkInDate: formattedNow,
        checkOutDate: formattedTmr,
        checkInTime: 16,
        checkOutTime: 10,
        guests: 2,
        platform: "cash",
        guestHouseName: "dmyk"
      }}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);
        const reservationCode = `${DateTime.fromISO(values.checkInDate, {
          zone: "Asia/Seoul"
        })
          .toString()
          .substring(0, 10)
          .replace(/-/g, "")}${values.roomNumber}`;

        const stayingDates = getDaysArray(
          new Date(fromISOtoString(values.checkInDate)),
          new Date(fromISOtoString(values.checkOutDate))
        );

        await db
          .collection("reservations")
          .doc(`${values.platform}-${reservationCode}`)
          .set({
            ...values,
            checkInDate: DateTime.fromISO(values.checkInDate, {
              zone: "Asia/Seoul"
            })
              .toString()
              .substring(0, 10),
            checkOutDate: DateTime.fromISO(values.checkOutDate, {
              zone: "Asia/Seoul"
            })
              .toString()
              .substring(0, 10),
            stayingDates: stayingDates,
            price: values.payoutPrice,
            nights: stayingDates.length - 1,
            reservationCode
          });
        actions.setSubmitting(false);
      }}
      render={({ errors, values, status, touched, isSubmitting }) => (
        <div style={{ margin: "24px 30px", textAlign: "center" }}>
          <div style={{ marginTop: "10px" }}>
            <Radio.Group name="guestHouseName">
              <Radio.Button value="dmyk">DMYK</Radio.Button>
              <Radio.Button value="sinsa">Sinsa</Radio.Button>
              <Radio.Button value="jhonor">jHonor</Radio.Button>
            </Radio.Group>
          </div>
          <Input
            style={{ marginTop: "10px" }}
            addonBefore="Guest Name"
            name="guestName"
          />
          <div style={{ marginTop: "10px" }}>
            <Input addonBefore="Payout Price" name="payoutPrice" />
          </div>
          <Input
            style={{ marginTop: "10px" }}
            addonBefore="deposit"
            name="deposit"
          />
          <Select
            name="roomNumber"
            style={{ marginTop: "10px", width: "100%" }}
          >
            {Select.renderOptions(
              values.guestHouseName === "dmyk"
                ? dmykOptions
                : values.guestHouseName === "sinsa"
                ? sinsaOptions
                : jhonorOptions
            )}
          </Select>
          <Input
            style={{ marginTop: "10px" }}
            addonBefore="Phone Number"
            name="phoneNumber"
          />
          <DatePicker
            style={{ marginRight: "10px", marginTop: "10px" }}
            name="checkInDate"
          />
          <InputNumber name="checkInTime" />
          <DatePicker
            style={{ marginRight: "10px", marginTop: "10px" }}
            name="checkOutDate"
          />
          <InputNumber name="checkOutTime" />
          <div style={{ margin: "10px", textAlign: "left" }}>
            <span style={{ marginRight: "10px" }}>guests: </span>
            <InputNumber name="guests" />
          </div>
          <div style={{ margin: "10px" }}>
            <SubmitButton disabled={isSubmitting}>Submit</SubmitButton>
          </div>
        </div>
      )}
    />
  );
};
