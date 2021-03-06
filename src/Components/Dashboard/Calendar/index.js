import React, { Component } from "react";
import "moment/locale/ko";
import { DateTime } from "luxon";
import "./index.css";
import "react-big-scheduler/lib/css/style.css";
import HTML5Backend from "react-dnd-html5-backend";
import Scheduler, { SchedulerData, ViewTypes } from "react-big-scheduler";
import rbsConfig from "./rbsConfig.js";
import { DragDropContext } from "react-dnd";

import { db } from "../../../firebase.js";

import { resources } from "../../../Constants/roomName.js";

import { platformColor, formatDate } from "../../../util.js";

// TODO: click to see reservation number

class Basic extends Component {
  constructor(props) {
    super(props);

    let schedulerData = new SchedulerData(
      formatDate(DateTime.local().setZone("Asia/Seoul")),
      ViewTypes.Month,
      false,
      false,
      rbsConfig(window.innerHeight)
    );
    schedulerData.setResources(resources);
    schedulerData.setEvents([]);
    this.state = {
      viewModel: schedulerData,
      loading: false,
      eventsData: [],
      date: DateTime.local().setZone("Asia/Seoul")
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const eventsData = [];
    db.collection("reservations")
      .where(
        "checkInDate",
        ">=",
        formatDate(this.state.date.minus({ days: this.state.date.day + 10 }))
      )
      .where(
        "checkInDate",
        "<=",
        formatDate(this.state.date.plus({ days: 180 }))
      )
      .get()
      .then(snap => {
        snap.forEach(doc => {
          const {
            checkInDate,
            checkOutDate,
            guestName,
            nights,
            roomNumber,
            phoneNumber,
            payoutPrice,
            platform,
            reservationCode
          } = doc.data();
          eventsData.push({
            id: doc.id,
            start: checkInDate,
            end: checkOutDate,
            resourceId: roomNumber,
            title: `${guestName} - ${payoutPrice}원 - ${reservationCode}`,
            nights: nights,
            bgColor: platformColor[platform]
          });
        });
        this.setState({ eventsData: eventsData, loading: false });
      });
  }
  render() {
    const { viewModel } = this.state;
    if (this.state.eventsData) {
      viewModel.setEvents(this.state.eventsData);
    }
    return (
      <div style={{ fontSize: "8px" }}>
        <Scheduler
          schedulerData={viewModel}
          prevClick={this.prevClick}
          nextClick={this.nextClick}
          onSelectDate={this.onSelectDate}
          onViewChange={this.onViewChange}
        />
      </div>
    );
  }

  prevClick = schedulerData => {
    schedulerData.prev();
    this.setState({
      viewModel: schedulerData
    });
  };

  nextClick = schedulerData => {
    schedulerData.next();
    this.setState({
      viewModel: schedulerData
    });
  };

  onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(
      view.viewType,
      view.showAgenda,
      view.isEventPerspective
    );
    //schedulerData.setEvents(events)
    this.setState({
      viewModel: schedulerData
    });
  };

  onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    //schedulerData.setEvents(events)
    this.setState({
      viewModel: schedulerData
    });
  };
}

export default DragDropContext(HTML5Backend)(Basic);
