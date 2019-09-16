import React, { useState } from "react";
import { Formik } from "formik";
import { db } from "../../../firebase.js";
import { DatePicker, SubmitButton } from "@jbuschke/formik-antd";
import { formattedNow, getDaysArray, fromISOtoString } from "../../../util";
import Chart from "react-apexcharts";

const krwToString = price => {
  console.log(typeof price === "number");
  if (typeof price === "number") {
    return price;
  }
  return Number(price.replace(/[^0-9\.]+/g, ""));
};

export default () => {
  const [num, setNum] = useState(0);
  const [roomFilled, setRoomFilled] = useState(0);
  const [totalRoom, setTotalRoom] = useState(0);
  const [labels, setLabels] = useState(["reserved", "empty"]);
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  async function fetchDocs(values, actions) {
    actions.setSubmitting(true);

    try {
      let totalSum = 0;
      const dates = getDaysArray(
        new Date(values.startDate),
        new Date(values.endDate)
      );
      setTotalRoom(dates.length);
      const promises = [];
      let totalFilledSum = 0;
      console.log("dates", dates);
      dates.forEach(date => {
        const p = db
          .collection("reservations")
          .where("stayingDates", "array-contains", date)
          .get();
        promises.push(p);
      });
      const snapshots = await Promise.all(promises);
      snapshots.forEach(function(snapshot, i) {
        let daySum = 0;
        let dayFilledSum = 0;
        snapshot.forEach(doc => {
          let roomSum = 0;
          if (
            doc.data().checkOutDate !== dates[i] &&
            doc.data().guestHouseName === "jhonor"
          ) {
            roomSum =
              roomSum + krwToString(doc.data().payoutPrice) / doc.data().nights;
            console.log(doc.data().guestName, roomSum);
          }
          daySum = daySum + roomSum;

          let roomFilledSum = 0;
          if (
            doc.data().checkOutDate !== dates[i] &&
            doc.data().guestHouseName === "jhonor"
          ) {
            roomFilledSum =
              roomFilledSum + (doc.data().roomNumber === "jhonor302X" ? 4 : 1);
          }
          dayFilledSum = dayFilledSum + roomFilledSum;
        });
        totalSum = daySum + totalSum;
        console.log("total", totalSum);
        totalFilledSum = dayFilledSum + totalFilledSum;
        console.log("total", totalFilledSum);
      });

      //   setSeries([num, 30 * 17 - num]);
      //console.log(totalPrice);
      setNum(totalSum);
      setRoomFilled(totalFilledSum);
      actions.setSubmitting(false);
    } catch (error) {
      console.log("error", error.toString());
    }
  }

  return (
    <React.Fragment>
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
            <div>예상매출</div>
            <div style={{ marginTop: "50px" }}>
              <DatePicker name="startDate" />
              <DatePicker name="endDate" />
            </div>
            <div style={{ marginTop: "10px" }}>
              <SubmitButton disabled={isSubmitting}>Submit</SubmitButton>
            </div>
            <div>{num}원</div>
            <div>{(roomFilled / (totalRoom * 30)) * 100}% </div>
            <div>{totalRoom * 30} </div>
            {/* <Chart options={options} series={series} type="donut" width="380" />*/}
          </React.Fragment>
        )}
      />
    </React.Fragment>
  );
};
