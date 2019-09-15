import React, { useState, useEffect } from "react";

import { db } from "../../../firebase";
import {
  compare,
  filterGuestHouse,
  numOfGuests,
  numOfTowels,
  now,
  cleaningReducer,
  numOfBeds
} from "../../../util";

import "./index.css";

export default () => {
  const [filter, setFilter] = useState("");
  const [date, setDate] = useState(now);
  const [reservations, setReservations] = useState([]);

  async function fetchDocs() {
    const docs = [];
    const query = await db
      .collection("reservations")
      .where("stayingDates", "array-contains", date.toFormat("yyyy-MM-dd"))
      .get();
    query.forEach(doc => {
      let inFlag = false;
      let outFlag = false;

      if (doc.data().checkInDate === date.toFormat("yyyy-MM-dd")) {
        inFlag = true;
      } else if (doc.data().checkOutDate === date.toFormat("yyyy-MM-dd")) {
        outFlag = true;
      }

      const foundIndex = docs.findIndex(
        item => item.roomNumber === doc.data().roomNumber
      );
      console.log(foundIndex);
      // TODO id 가 out id in id가 있어야되네
      if (inFlag) {
        if (foundIndex !== -1) {
          docs[foundIndex] = { ...docs[foundIndex], inFlag };
        } else {
          docs.push({ ...doc.data(), id: doc.id, inFlag });
        }
      }
      if (outFlag) {
        if (foundIndex !== -1) {
          docs[foundIndex] = { ...docs[foundIndex], outFlag };
        } else {
          docs.push({ ...doc.data(), id: doc.id, outFlag });
        }
      }
    });
    console.log(docs);
    setReservations(docs);
  }

  useEffect(() => {
    fetchDocs();
  }, [date]);

  const cleaningState = (inFlag, outFlag) => {
    // TODO 취약점 애초의 예약을 보고하는거라서 체크아웃도 체크인도 없는 방이면 청소리스트에서 뜰수가없다.
    console.log(inFlag, outFlag);
    if (!!inFlag && !!outFlag) {
      return <div style={{ color: "red" }}>우선 청소</div>;
    } else if (!!inFlag === true && !!outFlag === false) {
      return "체크 하기";
    } else if (!!inFlag === false && !!outFlag === true) {
      return "";
    } else {
      return "no 청소";
    }
  };

  return (
    <div style={{ textAlign: "center", fontSize: "14px" }}>
      <div style={{ marginTop: "3px" }}>
        <span onClick={() => setDate(date.minus({ days: 1 }))}>{"<<<<< "}</span>
        <span>{date.toFormat("yyyy-MM-dd")}</span>
        {console.log("datae", date.toFormat("yyyy-MM-dd"))}
        <span onClick={() => setDate(date.plus({ days: 1 }))}>{" >>>>>"}</span>
      </div>
      <div style={{ marginTop: "3px", borderBottom: "1px solid black" }}>
        <span
          onClick={() => setFilter("sinsa")}
          style={{
            backgroundColor: `${filter === "sinsa" ? "#ffff64" : "transparent"}`
          }}
        >
          --SINSA--
        </span>
        <span
          onClick={() => setFilter("dmyk")}
          style={{
            backgroundColor: `${filter === "dmyk" ? "#ffff64" : "transparent"}`
          }}
        >
          --DMYK--
        </span>
        <span
          onClick={() => setFilter("jhonor")}
          style={{
            backgroundColor: `${
              filter === "jhonor" ? "#ffff64" : "transparent"
            }`
          }}
        >
          --JHONOR--
        </span>
        <span
          onClick={() => setFilter("")}
          style={{
            backgroundColor: `${filter === "" ? "#ffff64" : "transparent"}`
          }}
        >
          --ALL--
        </span>
      </div>

      {Object.values(
        reservations
          .sort(compare)
          .filter(res => filterGuestHouse(res.guestHouseName, filter))
          .filter(
            res =>
              res.checkOutDate === date.toFormat("yyyy-MM-dd") ||
              res.checkInDate === date.toFormat("yyyy-MM-dd")
          )
          .reduce(cleaningReducer(date.toFormat("yyyy-MM-dd")), {})
      ).map(outRes => {
        if (outRes) {
          return (
            <div key={outRes.reservationCode} className="box">
              <h1>{outRes.roomNumber}</h1>
              <div>{`Check Out: ${outRes.checkOutTime}`}</div>
              <div>{`Check In: ${outRes.checkInTime}`}</div>
              <div>{`# of guests: ${numOfGuests(
                parseInt(outRes.guests)
              )}`}</div>
              <div>{`towels: ${numOfTowels(
                numOfGuests(parseInt(outRes.guests)),
                outRes.nights
              )}`}</div>
              {cleaningState(outRes.inFlag, outRes.outFlag)}
              {outRes.cleaningMemo && (
                <div style={{ color: "red" }}>
                  {`Cleaning Memo: ${outRes.cleaningMemo}`}
                </div>
              )}
              <div>
                {outRes.guestHouseName === "jhonor"
                  ? numOfBeds(outRes.roomNumber)
                  : null}
              </div>
            </div>
          );
        } else {
          return (
            <div key={outRes.reservationCode} className="box">
              <h1>{outRes.roomNumber}</h1>
              <div>{`Check Out: ${outRes.checkOutTime}`}</div>
              <div>{"N/A"}</div>
            </div>
          );
        }
      })}
    </div>
  );
};
