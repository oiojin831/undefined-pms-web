import React, { useState } from "react";
import { Formik } from "formik";
import { db } from "../../../firebase.js";
import { DatePicker, SubmitButton } from "@jbuschke/formik-antd";
import { formattedNow, fromISOtoString } from "../../../util";
import Chart from "react-apexcharts";
const krwToString = price => {
  return Number(price.replace(/[^0-9\.]+/g, ""));
};

export default () => {
  const [num, setNum] = useState(0);
  const [labels, setLabels] = useState(["reserved", "empty"]);
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  async function fetchDocs(values, actions) {
    actions.setSubmitting(true);
    const querySnapshot = await db
      .collection("reservations")
      .where("checkInDate", ">=", "2019-09-01")
      .get();

    try {
      let num = 0;
      await querySnapshot.forEach(doc => {
        if (doc.data().guestHouseName === "jhonor") {
          console.log("docid", doc.data().guestName);
          doc.data().stayingDates.forEach((date, idx, arr) => {
            if (idx != -1) {
              if (date >= "2019-09-01" && date < "2019-10-01") {
                num = num + 1;
              }
            }
          });
          console.log("num", num);
        }

        // let num = 0;
        // let totalPrice = 0;
        // await querySnapshot.forEach(doc => {
        //   if (doc.data().guestHouseName === "jhonor") {
        //     if (
        //       doc.data().checkInDate >= "2019-09-01" &&
        //       doc.data().checkInDate < "2019-10-01"
        //     ) {
        //       totalPrice =
        //         totalPrice + parseInt(krwToString(`${doc.data().payoutPrice}`));
        //     }
        //   }
      });
      setSeries([num, 30 * 17 - num]);
      //console.log(totalPrice);
      actions.setSubmitting(false);
    } catch (error) {
      console.log("error", error.toString());
    }
  }

  return (
    <Formik
      initialValues={{
        startDate: formattedNow,
        endDate: formattedNow
      }}
      onSubmit={(values, actions) => {
        fetchDocs(values, actions);
      }}
      render={({ isSubmitting, values }) => (
        <React.Fragment>
          <div style={{ marginTop: "50px" }}>
            <DatePicker name="startDate" />
            <DatePicker name="endDate" />
          </div>
          <div style={{ marginTop: "10px" }}>
            <SubmitButton disabled={isSubmitting}>Submit</SubmitButton>
          </div>
          <Chart options={options} series={series} type="donut" width="380" />
        </React.Fragment>
      )}
    />
  );
};
