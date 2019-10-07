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
    // Create new array(docs) for cleaning data.
    const docs = [];
    const query = await db
      .collection("reservations")
      .where("stayingDates", "array-contains", date.toFormat("yyyy-MM-dd"))
      .get();
    query.forEach(doc => {
      let inFlag = false;
      let outFlag = false;

      // check if the document is check-in / check-out
      if (doc.data().checkInDate === date.toFormat("yyyy-MM-dd")) {
        inFlag = true;
      } else if (doc.data().checkOutDate === date.toFormat("yyyy-MM-dd")) {
        outFlag = true;
      }

      // return nothing if the documentation is staying reservation
      if ((inFlag || outFlag) === false) return;

      // find the index of docs for existing room data
      const foundIndex = docs.findIndex(item => {
        if (item.in !== undefined) {
          return item.in.roomNumber === doc.data().roomNumber;
        }
        if (item.out !== undefined) {
          return item.out.roomNumber === doc.data().roomNumber;
        }
      });

      const combinedCleaningMemo = (foundIndex, inFlag, outFlag) => {
        console.log("foundIndex", foundIndex);
        let memo = "";
        let prev = "";

        if (foundIndex === -1) {
          prev = "";
        } else {
          prev = docs[foundIndex].cleaningMemo
            ? docs[foundIndex].cleaningMemo
            : "";
        }
        if (inFlag) {
          const current = doc.data().cleaningMemo
            ? `체크인 예약건 메모: ${doc.data().cleaningMemo}\n`
            : "";
          memo = current + prev;
        } else if (outFlag) {
          console.log("out memo", doc.data().cleaningMemo);
          const current = doc.data().cleaningMemo
            ? `체크아웃 예약건 메모: ${doc.data().cleaningMemo}`
            : "";
          memo = prev + current;
        }
        console.log("memo", memo, foundIndex);
        return memo;
      };

      console.log("inFLag, outFlag", inFlag, outFlag);
      if (inFlag) {
        if (foundIndex !== -1) {
          console.log("new check-in with existing check-out data");
          docs[foundIndex] = {
            ...docs[foundIndex],
            in: { ...doc.data(), id: doc.id },
            cleaningMemo: combinedCleaningMemo(foundIndex, inFlag, outFlag)
          };
        } else {
          console.log("in new", foundIndex);
          docs.push({
            in: { ...doc.data(), id: doc.id },
            guestHouseName: doc.data().guestHouseName,
            checkDate: doc.data().checkInDate,
            roomNumber: doc.data().roomNumber,
            reservationCode: doc.data().reservationCode,
            cleaningMemo: combinedCleaningMemo(foundIndex, inFlag, outFlag)
          });
        }
      }
      if (outFlag) {
        if (foundIndex !== -1) {
          console.log("out exist");
          console.log("doc.data()", doc.data());
          docs[foundIndex] = {
            ...docs[foundIndex],
            out: { ...doc.data(), id: doc.id },
            cleaningMemo: combinedCleaningMemo(foundIndex, inFlag, outFlag)
          };
        } else {
          console.log("out new", foundIndex);
          docs.push({
            out: {
              ...doc.data(),
              id: doc.id
            },
            guestHouseName: doc.data().guestHouseName,
            checkDate: doc.data().checkOutDate,
            roomNumber: doc.data().roomNumber,
            reservationCode: doc.data().reservationCode,
            cleaningMemo: combinedCleaningMemo(foundIndex, inFlag, outFlag)
          });
        }
      }
    });
    console.log("docs", docs);
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
          .filter(res => res.checkDate === date.toFormat("yyyy-MM-dd"))
      ).map(outRes => {
        return (
          <div key={outRes.reservationCode} className="box">
            <h1>{outRes.roomNumber}</h1>
            <div>{`Check Out: ${
              outRes.out ? outRes.out.checkOutTime : 11
            }`}</div>
            <div>{`Check In: ${outRes.in ? outRes.in.checkInTime : 3}`}</div>
            <div>{`${numOfGuests(
              parseInt(outRes.in ? outRes.in.guests : 0)
            )} guests`}</div>
            <div>{`${parseInt(outRes.in ? outRes.in.nights : 0)} nights`}</div>
            <div>{`${
              outRes.in
                ? numOfTowels(
                    numOfGuests(parseInt(outRes.in.guests)),
                    outRes.in.nights
                  )
                : 4
            } towels`}</div>
            <div>
              {outRes.guestHouseName === "jhonor"
                ? numOfBeds(outRes.roomNumber)
                : null}
            </div>
            <div>
              {cleaningState(
                outRes.hasOwnProperty("in"),
                outRes.hasOwnProperty("out")
              )}
            </div>
            {outRes.cleaningMemo && (
              <div style={{ color: "red" }}>{outRes.cleaningMemo}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};
