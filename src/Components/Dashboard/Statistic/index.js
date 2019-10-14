import React, { useState } from "react";
import { Formik } from "formik";
import { db } from "../../../firebase.js";
import { DatePicker, SubmitButton } from "@jbuschke/formik-antd";
import { formattedNow, getDaysArray, fromISOtoString } from "../../../util";
import { jhonorData } from "../../../Constants/roomName";
import _ from "lodash";

const krwToString = price => {
  if (typeof price === "number") {
    return price;
  }
  return Number(price.replace(/[^0-9\.]+/g, ""));
};

export default ({ admin }) => {
  const [num, setNum] = useState(0);
  const [roomFilled, setRoomFilled] = useState(0);
  const [roomFilledFromToday, setRoomFilledFromToday] = useState(0);
  const [totalRoom, setTotalRoom] = useState(0);
  const [totalRoomFromToday, setTotalRoomFromToday] = useState(0);
  const [blacnketSumDisplay, setBlanketSumDisplay] = useState({});
  const [blacnketTotalSumDisplay, setBlanketTotalSumDisplay] = useState({});
  const [labels, setLabels] = useState(["reserved", "empty"]);
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  async function fetchDocs(values, actions) {
    actions.setSubmitting(true);

    try {
      let totalSum = 0;
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
      let blanketSum = {};
      let blanketTotalSum = [];
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
        let dayFilledSumFromToday = 0;
        let oneDayBeds = [];
        snapshot.forEach(doc => {
          let roomSum = 0;
          if (
            doc.data().checkOutDate !== dates[i] &&
            doc.data().guestHouseName === "jhonor"
          ) {
            roomSum =
              roomSum + krwToString(doc.data().payoutPrice) / doc.data().nights;
            console.log(
              "doc.data()",
              doc.data().reservationCode,
              doc.data().payoutPrice,
              doc.data().nights
            );
            console.log("roomSum", roomSum);
          }
          daySum = daySum + roomSum;

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
        let singleBlankets = _.sumBy(oneDayBeds, room => {
          let s = room.single ? room.single : 0;
          let b = room.bunk ? room.bunk : 0;
          return s + b * 2;
        });
        let queenBlankets = _.sumBy(oneDayBeds, room => {
          let q = room.queen ? room.queen : 0;
          return room.queen;
        });
        blanketSum[dates[i]] = { single: singleBlankets, queen: queenBlankets };
        blanketTotalSum.push({ single: singleBlankets, queen: queenBlankets });
        totalSum = daySum + totalSum;
        console.log("totalSum", totalSum);
        totalFilledSum = dayFilledSum + totalFilledSum;
        totalFilledSumFromToday =
          dayFilledSumFromToday + totalFilledSumFromToday;
      });

      let singleTotalBlankets = _.sumBy(blanketTotalSum, room => {
        let s = room.single ? room.single : 0;
        let b = room.bunk ? room.bunk : 0;
        return s + b * 2;
      });
      let queenTotalBlankets = _.sumBy(blanketTotalSum, room => {
        let q = room.queen ? room.queen : 0;
        return room.queen;
      });
      //   setSeries([num, 30 * 17 - num]);
      //console.log(totalPrice);
      setNum(totalSum);
      setRoomFilled(totalFilledSum);
      setRoomFilledFromToday(totalFilledSumFromToday);
      setBlanketSumDisplay(blanketSum);
      setBlanketTotalSumDisplay({
        single: singleTotalBlankets,
        queen: queenTotalBlankets
      });
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
                <div>Expected Revenue: {num}원</div>
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
                <div>날짜별: {JSON.stringify(blacnketSumDisplay)}</div>
                <div>총 개수: {JSON.stringify(blacnketTotalSumDisplay)}</div>

                {/* <Chart options={options} series={series} type="donut" width="380" />*/}
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
