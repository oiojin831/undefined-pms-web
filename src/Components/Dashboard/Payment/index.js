import React, { useState, useEffect } from "react";
import { Row, Col, Checkbox, Icon } from "antd";

import { db } from "../../../firebase";
import {
  compare,
  filterGuestHouse,
  filterCheckInOut,
  paidPriceSelector,
  now,
  sortByPlatform,
  sortByRoomNumber,
  sortByCheckOut,
  sortByCheckIn
} from "../../../util";

import { jhonorData, jhonorOptions } from "../../../Constants/roomName";

import "./index.css";

export default () => {
  const [filter, setFilter] = useState("");
  const [option, setOption] = useState("");
  const [platformSort, setPlatformSort] = useState("asc");
  const [roomNumberSort, setRoomNumberSort] = useState("asc");
  const [checkInSort, setCheckInSort] = useState("asc");
  const [checkOutSort, setCheckOutSort] = useState("asc");
  const [sort, setSort] = useState("checkIn");
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

  const onCheckInChange = async (e, res) => {
    console.log("res", e, res);
    const query = db.collection("reservations").doc(res.id);
    try {
      await query.update({
        checkedIn: e.target.checked
      });
      setReservations(
        reservations.map(reservation => {
          if (reservation.id === res.id) {
            return { ...reservation, checkedIn: e.target.checked };
          } else {
            return reservation;
          }
        })
      );

      console.log(`checked = ${e.target.checked}`);
    } catch (e) {
      console.log("error", e);
    }
  };

  const onPaidChange = async (e, res) => {
    console.log("res", e, res);
    const query = db.collection("reservations").doc(res.id);
    try {
      await query.update({
        paid: e.target.checked
      });
      setReservations(
        reservations.map(reservation => {
          if (reservation.id === res.id) {
            return { ...reservation, paid: e.target.checked };
          } else {
            return reservation;
          }
        })
      );

      console.log(`paid = ${e.target.checked}`);
    } catch (e) {
      console.log("error", e);
    }
  };
  const togglePlatformSort = () => {
    console.log("platform", platformSort);
    setSort("platform");
    if (platformSort === "asc") {
      setPlatformSort("desc");
    } else {
      setPlatformSort("asc");
    }
  };

  const toggleRoomNumberSort = () => {
    setSort("roomNumber");
    if (roomNumberSort === "asc") {
      setRoomNumberSort("desc");
    } else {
      setRoomNumberSort("asc");
    }
  };

  const toggleCheckInSort = () => {
    setSort("checkIn");
    if (checkInSort === "asc") {
      setCheckInSort("desc");
    } else {
      setCheckInSort("asc");
    }
  };

  const toggleCheckOutSort = () => {
    setSort("checkOut");
    if (checkOutSort === "asc") {
      setCheckOutSort("desc");
    } else {
      setCheckOutSort("asc");
    }
  };

  return (
    <div style={{ textAlign: "center", fontSize: "14px" }}>
      <div style={{ marginTop: "3px" }}>
        <span onClick={() => setDate(date.minus({ days: 1 }))}>{"<<<<< "}</span>
        <span>{date.toFormat("yyyy-MM-dd")}</span>
        <span onClick={() => setDate(date.plus({ days: 1 }))}>{" >>>>>"}</span>
      </div>
      <div
        style={{
          paddingTop: "5px",
          paddingBottom: "5px",
          borderBottom: "1px solid black"
        }}
      >
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
          --jHonor--
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
      <div
        style={{
          paddingTop: "5px",
          paddingBottom: "5px",
          borderBottom: "1px solid black"
        }}
      >
        <span
          onClick={() => setOption("checkIn")}
          style={{
            backgroundColor: `${
              option === "checkIn" ? "#ffff64" : "transparent"
            }`
          }}
        >
          --Check In--
        </span>
        <span
          onClick={() => setOption("checkOut")}
          style={{
            backgroundColor: `${
              option === "checkOut" ? "#ffff64" : "transparent"
            }`
          }}
        >
          --Check Out--
        </span>
        <span
          onClick={() => setOption("notPaid")}
          style={{
            backgroundColor: `${
              option === "notPaid" ? "#ffff64" : "transparent"
            }`
          }}
        >
          --Not Paid--
        </span>
        <span
          onClick={() => setOption("")}
          style={{
            backgroundColor: `${option === "" ? "#ffff64" : "transparent"}`
          }}
        >
          --ALL--
        </span>
      </div>
      <Row
        type="flex"
        justify="start"
        style={{
          backgroundColor: "#D3D3D3",
          paddingTop: "3px",
          borderBottom: "1px solid black"
        }}
      >
        <Col xs={8} sm={5} md={4} lg={3} xl={2} onClick={toggleCheckInSort}>
          CheckIn
          {checkInSort === "asc" ? (
            <Icon type="sort-ascending" />
          ) : (
            <Icon type="sort-descending" />
          )}
        </Col>
        <Col xs={8} sm={5} md={4} lg={3} xl={2} onClick={toggleCheckOutSort}>
          CheckOut
          {checkOutSort === "asc" ? (
            <Icon type="sort-ascending" />
          ) : (
            <Icon type="sort-descending" />
          )}
        </Col>
        <Col xs={8} sm={5} md={4} lg={3} xl={2} onClick={toggleRoomNumberSort}>
          Room
          {roomNumberSort === "asc" ? (
            <Icon type="sort-ascending" />
          ) : (
            <Icon type="sort-descending" />
          )}
        </Col>
        <Col xs={8} sm={5} md={4} lg={3} xl={2}>
          Name
        </Col>
        <Col xs={8} sm={5} md={4} lg={3} xl={2} onClick={togglePlatformSort}>
          Platform
          {platformSort === "asc" ? (
            <Icon type="sort-ascending" />
          ) : (
            <Icon type="sort-descending" />
          )}
        </Col>
        <Col xs={8} sm={5} md={4} lg={3} xl={2}>
          Need to Pay
        </Col>
        <Col xs={8} sm={5} md={4} lg={3} xl={2}>
          Passcode
        </Col>
      </Row>
      <React.Fragment>
        {reservations
          .filter(res => filterGuestHouse(res.guestHouseName, filter))
          .filter(res =>
            filterCheckInOut(
              date.toFormat("yyyy-MM-dd"),
              res.checkInDate,
              res.checkOutDate,
              res.paid,
              res.platform,
              option,
              res.checkedIn
            )
          )
          .sort((a, b) => sortByCheckIn(checkInSort, sort, a, b))
          .sort((a, b) => sortByCheckOut(checkOutSort, sort, a, b))
          .sort((a, b) => sortByPlatform(platformSort, sort, a, b))
          .sort((a, b) => sortByRoomNumber(roomNumberSort, sort, a, b))
          .map(res => (
            <Row
              type="flex"
              justify="start"
              style={{
                paddingTop: "3px",
                paddingBottom: "3px",
                borderBottom: "1px solid Gainsboro",
                backgroundColor: res.platform === "booking" ? "#95c8d8" : null
              }}
            >
              <Col xs={8} sm={5} md={4} lg={3} xl={2}>
                <Checkbox
                  checked={res.checkedIn}
                  onChange={e => onCheckInChange(e, res)}
                >
                  {res.checkInDate.slice(5, 10)}
                </Checkbox>
              </Col>
              <Col xs={8} sm={5} md={4} lg={3} xl={2}>
                {res.checkOutDate.slice(5, 10)}
              </Col>
              <Col xs={8} sm={5} md={4} lg={3} xl={2}>
                {res.roomNumber}
              </Col>
              <Col xs={8} sm={5} md={4} lg={3} xl={2}>
                {res.guestName}
              </Col>
              <Col xs={8} sm={5} md={4} lg={3} xl={2}>
                {res.platform}
              </Col>
              <Col xs={8} sm={5} md={4} lg={3} xl={2}>
                <Checkbox
                  checked={res.paid}
                  onChange={e => onPaidChange(e, res)}
                >
                  {paidPriceSelector(res.platform, res.price, res.paid)}
                </Checkbox>
              </Col>
              <Col xs={8} sm={5} md={4} lg={3} xl={2}>
                {res.guestHouseName === "jhonor"
                  ? jhonorData[res.roomNumber].passcode
                  : "not updated yet"}
              </Col>
            </Row>
          ))}
      </React.Fragment>
    </div>
  );
};
