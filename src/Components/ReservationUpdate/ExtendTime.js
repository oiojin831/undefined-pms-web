import React, { useState, useEffect } from "react";
import { db } from "../../firebase.js";
import { Button, Icon } from "antd";
import { navigate } from "@reach/router";
import { to12From } from "../../util";

const inOutTime = {
  dmyk: { in: 16, out: 10 },
  sinsa: { in: 15, out: 11 },
  jhonor: { in: 15, out: 11 }
};

export default props => {
  const [inTime, setInTime] = useState(0);
  const [outTime, setOutTime] = useState(0);
  const [timeCount, setTimeCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reservation, setReservation] = useState(null);
  const [extraFee, setExtraFee] = useState(0);

  const payHandler = async () => {
    setLoading(true);
    const query = db.collection("reservations").doc(reservation.id);
    try {
      await query.update({
        checkInTime: inTime,
        checkOutTime: outTime,
        extraFee: extraFee + timeCount * 5000
      });
      setLoading(false);
      navigate(`/reservation/${reservation.id}/itinerary`);
    } catch (error) {
      console.log("error", error.toString());
    }
  };

  const adjustInTime = (op, inOut, guestHouse) => {
    const time = inOutTime[guestHouse];
    if (op === "inc") {
      if (inOut === "in") {
        if (inTime < time.in) {
          setInTime(inTime + 1);
          setTimeCount(timeCount - 1);
          return;
        }
      } else {
        if (outTime < time.in - 1) {
          setOutTime(outTime + 1);
          setTimeCount(timeCount + 1);
          return;
        }
      }
    }
    if (op === "dec") {
      if (inOut === "in") {
        if (inTime > time.out + 1) {
          setInTime(inTime - 1);
          setTimeCount(timeCount + 1);
          return;
        }
      } else {
        if (outTime > time.out) {
          setOutTime(outTime - 1);
          setTimeCount(timeCount - 1);
          return;
        }
      }
    }
  };

  useEffect(() => {
    db.collection("reservations")
      .doc(props.id)
      .get()
      .then(doc => {
        setReservation({ ...doc.data(), id: doc.id });
        setInTime(doc.data().checkInTime);
        setOutTime(doc.data().checkOutTime);
        setExtraFee(doc.data().extraFee || 0);
      });
  }, []);

  return reservation ? (
    <React.Fragment>
      <div
        style={{
          paddingTop: "10%",
          display: "flex",
          justifyContent: "space-around"
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            flexBasis: "50%",
            fontSize: "30px"
          }}
        >
          <div>Check In</div>
          <div
            style={{
              fontWeight: "bold"
            }}
          >
            {to12From(inTime)}
          </div>
        </div>

        <div
          style={{
            fontSize: "55px",
            flex: 1,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <div
            onClick={() =>
              adjustInTime("dec", "in", reservation.guestHouseName)
            }
          >
            <Icon type="minus-circle" />
          </div>
          <div
            onClick={() =>
              adjustInTime("inc", "in", reservation.guestHouseName)
            }
          >
            <Icon type="plus-circle" />
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          paddingTop: "5%",
          justifyContent: "space-between"
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            flexBasis: "50%",
            fontSize: "30px"
          }}
        >
          <div>Check Out</div>
          <div
            style={{
              fontWeight: "bold"
            }}
          >
            {to12From(outTime)}
          </div>
        </div>
        <div
          style={{
            fontSize: "55px",
            flex: 1,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <div
            onClick={() =>
              adjustInTime("dec", "out", reservation.guestHouseName)
            }
          >
            <Icon type="minus-circle" />
          </div>
          <div
            onClick={() =>
              adjustInTime("inc", "out", reservation.guestHouseName)
            }
          >
            <Icon type="plus-circle" />
          </div>
        </div>
      </div>
      <div
        style={{
          paddingTop: "5%",
          paddingRight: "5%",
          fontSize: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end"
        }}
      >
        <div>Total Cost:</div>
        <div>{`5000won X ${timeCount}hours ${
          extraFee ? `+ ${extraFee}won(previous)` : ""
        }`}</div>
        <div>{`= ${5000 * timeCount + extraFee}won`}</div>
        {loading ? (
          <div>loading</div>
        ) : (
          <div
            style={{
              paddingTop: "5%"
            }}
          >
            <Button size="large" onClick={payHandler}>
              PAY
            </Button>
          </div>
        )}
      </div>
    </React.Fragment>
  ) : (
    <div> loading</div>
  );
};
