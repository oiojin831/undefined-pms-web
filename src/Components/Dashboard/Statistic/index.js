import React, { useState } from "react";
import { Formik } from "formik";
import { db } from "../../../firebase.js";
import { DatePicker, SubmitButton } from "@jbuschke/formik-antd";
import { formattedNow, getDaysArray, fromISOtoString } from "../../../util";
import { jhonorData } from "../../../Constants/roomName";
import _ from "lodash";

const totalAndPercent = (platform, total) => {
  return `${platform.toFixed(2)}원 ${((platform / total) * 100).toFixed(2)}%`;
};

const krwToString = price => {
  if (typeof price === "number") {
    return price;
  }
  return Number(price.replace(/[^0-9\.]+/g, ""));
};

const roomSumByPlatform = (roomSum, data) => {
  roomSum[0] = roomSum[0] + krwToString(data.payoutPrice) / data.nights;
  switch (data.platform) {
    case "airbnb":
      roomSum[1] = roomSum[1] + krwToString(data.payoutPrice) / data.nights;
      return roomSum;
    case "agoda":
      roomSum[2] = roomSum[2] + krwToString(data.payoutPrice) / data.nights;
      return roomSum;
    case "booking":
      roomSum[3] = roomSum[3] + krwToString(data.payoutPrice) / data.nights;
      return roomSum;
    case "cash":
      roomSum[4] = roomSum[4] + krwToString(data.payoutPrice) / data.nights;
      return roomSum;
    default:
      return roomSum;
  }
};

export default ({ admin }) => {
  const [num, setNum] = useState([0, 0, 0, 0, 0]);
  const [roomFilled, setRoomFilled] = useState(0);
  const [roomFilledFromToday, setRoomFilledFromToday] = useState(0);
  const [totalRoom, setTotalRoom] = useState(0);
  const [totalRoomFromToday, setTotalRoomFromToday] = useState(0);
  const [labels, setLabels] = useState(["reserved", "empty"]);
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  async function fetchDocs(values, actions) {
    actions.setSubmitting(true);

    try {
      //total, airbnb, agoda, booking
      let totalSum = [0, 0, 0, 0, 0];
      const dates = getDaysArray(
        new Date(fromISOtoString(values.startDate)),
        new Date(fromISOtoString(values.endDate))
      );
      const datesFromToday = getDaysArray(
        new Date(formattedNow),
        new Date(fromISOtoString(values.endDate))
      );
      setTotalRoom(dates.length * 20);
      setTotalRoomFromToday(datesFromToday.length * 20);
      const promises = [];
      let totalFilledSum = 0;
      let totalFilledSumFromToday = 0;
      dates.forEach(date => {
        const p = db
          .collection("reservations")
          .where("stayingDates", "array-contains", date)
          .get();
        promises.push(p);
      });
      const snapshots = await Promise.all(promises);
      snapshots.forEach(function(snapshot, i) {
        let daySum = [0, 0, 0, 0, 0];
        let dayFilledSum = 0;
        let dayFilledSumFromToday = 0;
        let oneDayBeds = [];
        snapshot.forEach(doc => {
          let roomSum = [0, 0, 0, 0, 0];
          if (
            doc.data().checkOutDate !== dates[i] &&
            doc.data().guestHouseName === "jhonor"
          ) {
            roomSum = roomSumByPlatform(roomSum, doc.data());
          }
          daySum = roomSum.map(function(num, idx) {
            return num + daySum[idx];
          });

          let roomFilledSum = 0;
          let roomFilledSumFromToday = 0;
          if (
            doc.data().checkOutDate !== dates[i] &&
            doc.data().guestHouseName === "jhonor"
          ) {
            roomFilledSum =
              roomFilledSum + (doc.data().roomNumber === "jhonor302X" ? 4 : 1);
            if (dates[i] >= formattedNow) {
              roomFilledSumFromToday =
                roomFilledSumFromToday +
                (doc.data().roomNumber === "jhonor302X" ? 4 : 1);
            }
          }
          dayFilledSum = dayFilledSum + roomFilledSum;
          dayFilledSumFromToday =
            dayFilledSumFromToday + roomFilledSumFromToday;
          if (
            doc.data().checkOutDate === dates[i] &&
            doc.data().guestHouseName === "jhonor"
          ) {
            console.log(
              doc.data().roomNumber,
              doc.data().reservationCode,
              jhonorData[doc.data().roomNumber]
            );
            oneDayBeds.push(jhonorData[doc.data().roomNumber].beds);
          }
        });
        totalSum = daySum.map(function(num, idx) {
          return num + totalSum[idx];
        });
        console.log("totalSum", totalSum);
        totalFilledSum = dayFilledSum + totalFilledSum;
        totalFilledSumFromToday =
          dayFilledSumFromToday + totalFilledSumFromToday;
      });

      setNum(totalSum);
      setRoomFilled(totalFilledSum);
      setRoomFilledFromToday(totalFilledSumFromToday);
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
        render={({ isSubmitting, values }) => {
          console.log("admin", admin);
          if (true) {
            return (
              <React.Fragment>
                <div style={{ marginTop: "50px" }}>
                  <DatePicker name="startDate" />
                  <DatePicker name="endDate" />
                </div>
                <div style={{ marginTop: "10px" }}>
                  <SubmitButton disabled={isSubmitting}>Submit</SubmitButton>
                </div>
                <div>Expected Total Revenue: {Math.round(num[0])}원</div>
                <div>
                  Expected Airbnb Revenue: {totalAndPercent(num[1], num[0])}
                </div>
                <div>
                  Expected Agoda Revenue: {totalAndPercent(num[2], num[0])}
                </div>
                <div>
                  Expected Booking Revenue: {totalAndPercent(num[3], num[0])}
                </div>
                <div>
                  Expected Cash Revenue: {totalAndPercent(num[4], num[0])}
                </div>
                <div>
                  Occupancy rate:{" "}
                  {roomFilled ? `${(roomFilled / totalRoom) * 100}%` : 0}{" "}
                </div>
                <div>Total number of nights: {totalRoom} </div>
                <div>
                  Empty room from today:{" "}
                  {totalRoomFromToday - roomFilledFromToday}{" "}
                </div>
                <div>
                  Empty Room from today over whole range:{" "}
                  {((totalRoomFromToday - roomFilledFromToday) / totalRoom) *
                    100}{" "}
                  %
                </div>
              </React.Fragment>
            );
          } else {
            return <div>N/A</div>;
          }
        }}
      />
    </React.Fragment>
  );
};
