import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import moment from 'moment'
import 'moment/locale/ko'
import 'antd/lib/style/index.css' //Add this code for locally example
import 'react-big-scheduler/lib/css/style.css'
import HTML5Backend from 'react-dnd-html5-backend'
import Scheduler, {
  SchedulerData,
  ViewTypes,
  DATE_FORMAT,
} from 'react-big-scheduler'
import rbsConfig from './rbsConfig.js'
import {DragDropContext} from 'react-dnd'

import {db} from './firebase.js'

import {resources} from './Constants/roomName.js'

const colors = {
  airbnb: '#ed3b85',
  expedia: '#3b53ed',
  agoda: '#3b37ed',
  ctrip: '#baed3b',
  cash: '#37d664',
}

class Basic extends Component {
  constructor(props) {
    super(props)

    //let schedulerData = new SchedulerData(new moment("2017-12-18").format(DATE_FORMAT), ViewTypes.Week);
    let schedulerData = new SchedulerData(
      new moment().format(DATE_FORMAT),
      ViewTypes.Month,
      false,
      false,
      rbsConfig,
    )
    schedulerData.localeMoment.locale('en')
    schedulerData.setResources(resources)
    schedulerData.setEvents([])
    this.state = {
      viewModel: schedulerData,
      loading: false,
      eventsData: [],
    }
  }

  async componentDidMount() {
    this.setState({loading: true})
    const eventsData = []
    db.collection('reservations')
      .where('checkInDate', '>=', '2019-04-01')
      .where('checkInDate', '<=', '2019-04-30')
      .get()
      .then(snap => {
        snap.forEach(doc => {
          const {
            checkInDate,
            checkOutDate,
            guestName,
            guests,
            nights,
            phoneNumber,
            roomNumber,
            checkInTime,
            checkOutTime,
            platform,
          } = doc.data()
          eventsData.push({
            id: doc.id,
            start: `${checkInDate} ${checkInTime}`,
            end: `${checkOutDate} ${checkOutTime}`,
            resourceId: roomNumber,
            title: guestName,
            nights: nights,
            bgColor: colors[platform],
          })
        })
        this.setState({eventsData: eventsData, loading: false})
      })
  }

  render() {
    console.log('this.state.eventsData', this.state.eventsData)
    const {viewModel} = this.state
    if (this.state.eventsData) {
      viewModel.setEvents(this.state.eventsData)
    }
    return (
      <div>
        <div>
          <Scheduler
            schedulerData={viewModel}
            prevClick={this.prevClick}
            nextClick={this.nextClick}
            onSelectDate={this.onSelectDate}
            onViewChange={this.onViewChange}
            eventItemClick={this.eventClicked}
            viewEventClick={this.ops1}
            viewEventText="Ops 1"
            viewEvent2Text="Ops 2"
            viewEvent2Click={this.ops2}
            updateEventStart={this.updateEventStart}
            updateEventEnd={this.updateEventEnd}
            moveEvent={this.moveEvent}
            newEvent={this.newEvent}
            eventItemTemplateResolver={this.eventItemTemplateResolver}
          />
        </div>
      </div>
    )
  }

  prevClick = schedulerData => {
    schedulerData.prev()
    this.setState({
      viewModel: schedulerData,
    })
  }

  nextClick = schedulerData => {
    schedulerData.next()
    this.setState({
      viewModel: schedulerData,
    })
  }

  onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(
      view.viewType,
      view.showAgenda,
      view.isEventPerspective,
    )
    //schedulerData.setEvents(events)
    this.setState({
      viewModel: schedulerData,
    })
  }

  onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date)
    //schedulerData.setEvents(events)
    this.setState({
      viewModel: schedulerData,
    })
  }

  eventClicked = (schedulerData, event) => {
    alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`)
  }

  ops1 = (schedulerData, event) => {
    alert(
      `You just executed ops1 to event: {id: ${event.id}, title: ${
        event.title
      }}`,
    )
  }

  ops2 = (schedulerData, event) => {
    alert(
      `You just executed ops2 to event: {id: ${event.id}, title: ${
        event.title
      }}`,
    )
  }

  newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
    if (
      window.confirm(
        `Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`,
      )
    ) {
      let newFreshId = 0
      schedulerData.events.forEach(item => {
        if (item.id >= newFreshId) newFreshId = item.id + 1
      })

      let newEvent = {
        id: newFreshId,
        title: 'New event you just created',
        start: start,
        end: end,
        resourceId: slotId,
        bgColor: 'purple',
      }
      schedulerData.addEvent(newEvent)
      this.setState({
        viewModel: schedulerData,
      })
    }
  }

  updateEventStart = (schedulerData, event, newStart) => {
    if (
      window.confirm(
        `Do you want to adjust the start of the event? {eventId: ${
          event.id
        }, eventTitle: ${event.title}, newStart: ${newStart}}`,
      )
    ) {
      schedulerData.updateEventStart(event, newStart)
    }
    this.setState({
      viewModel: schedulerData,
    })
  }

  updateEventEnd = (schedulerData, event, newEnd) => {
    if (
      window.confirm(
        `Do you want to adjust the end of the event? {eventId: ${
          event.id
        }, eventTitle: ${event.title}, newEnd: ${newEnd}}`,
      )
    ) {
      schedulerData.updateEventEnd(event, newEnd)
    }
    this.setState({
      viewModel: schedulerData,
    })
  }
  eventItemTemplateResolver = (
    schedulerData,
    event,
    bgColor,
    isStart,
    isEnd,
    mustAddCssClass,
    mustBeHeight,
    agendaMaxEventWidth,
  ) => {
    let titleText = schedulerData.behaviors.getEventTextFunc(
      schedulerData,
      event,
    )
    let divStyle = {
      backgroundColor: event.bgColor,
      height: mustBeHeight,
    }
    if (!!agendaMaxEventWidth)
      divStyle = {...divStyle, maxWidth: agendaMaxEventWidth}

    const percent = 100 / ((event.nights + 1) * 2)
    const marginWidth = schedulerData.viewType === 1 ? `${percent}%` : '60px'

    return (
      <div style={{paddingLeft: marginWidth, paddingRight: marginWidth}}>
        <div key={event.id} className={mustAddCssClass} style={divStyle}>
          <span
            style={{
              marginLeft: '4px',
              lineHeight: `${mustBeHeight}px`,
            }}>
            {titleText}
          </span>
        </div>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(Basic)
