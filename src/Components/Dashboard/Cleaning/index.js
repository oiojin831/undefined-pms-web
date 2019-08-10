import React, { useState, useEffect } from "react";

import { db } from "../../../firebase";
import {
  compare,
  filterGuestHouse,
  numOfGuests,
  numOfTowels,
  now,
  cleaningReducer
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
      docs.push({ ...doc.data(), id: doc.id });
    });
    setReservations(docs);
  }

  useEffect(() => {
    fetchDocs();
  }, [date]);

  return (
    <div style={{ textAlign: "center", fontSize: "14px" }}>
      <div style={{ marginTop: "3px" }}>
        <span onClick={() => setDate(date.minus({ days: 1 }))}>{"<<<<< "}</span>
        <span>{date.toFormat("yyyy-MM-dd")}</span>
        {console.log("datae", date.toFormat("yyyy-MM-dd"))}
        <span onClick={() => setDate(date.plus({ days: 1 }))}>{" >>>>>"}</span>
      </div>
      <div style={{ marginTop: "3px", borderBottom: "1px solid black" }}>
        <span onClick={() => setFilter("sinsa")}>SINSA--</span>
        <span onClick={() => setFilter("dmyk")}>--DMYK--</span>
        <span onClick={() => setFilter("jhonor")}>--jHonor--</span>
        <span onClick={() => setFilter("")}>--ALL</span>
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
          const guests = numOfGuests(parseInt(outRes.guests));
          const cleaningMemo = outRes.cleaningMemo;

          return (
            <div key={outRes.reservationCode} className="box">
              <h1>{outRes.roomNumber}</h1>
              <div>{`Check Out: ${outRes.checkOutTime}`}</div>
              <div>{`Check In: ${outRes.checkInTime}`}</div>
              <div>{`# of guests: ${guests}`}</div>
              <div>{`towels: ${numOfTowels(guests, outRes.nights)}`}</div>
              <div>{`*${outRes.platform} - ${outRes.reservationCode}*`}</div>
              {cleaningMemo && (
                <div style={{ color: "red" }}>
                  {`Cleaning Memo: ${cleaningMemo}`}
                </div>
              )}
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
