import React from 'react'
import {db} from './firebase.js'
import './Sinsa.css'
import {DateTime} from 'luxon'
import {compare, formatDate} from './util'

class Sinsa extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rooms: [],
      filter: '',
      date: DateTime.local().setZone('Asia/Seoul'),
      loading: false,
    }
  }

  async componentDidMount() {
    this.setState({loading: true})

    const rooms = []

    await db
      .collection('reservations')
      .where('stayingDates', 'array-contains', formatDate(this.state.date))
      .get()
      .then(snap =>
        snap.forEach(doc => {
          const {checkInDate, checkOutDate} = doc.data()
          const {checkInTime, checkOutTime} = doc.data()
          const {nights, phoneNumber, guestName, guests} = doc.data()
          const {
            roomNumber,
            platform,
            reservationCode,
            cleaningMemo,
          } = doc.data()
          rooms.push({
            cleaningMemo,
            checkInDate,
            checkOutDate,
            checkInTime,
            checkOutTime,
            guestName,
            guests,
            nights,
            phoneNumber,
            platform,
            reservationCode,
            roomNumber,
          })
        }),
      )
    this.setState({
      rooms,
      loading: false,
    })
  }

  render() {
    if (this.state.loading) {
      return <div>loading</div>
    }
    const guestHouseType = new RegExp(this.state.filter)
    const reDmyk = new RegExp('dmyk')
    const isDmyk = room => reDmyk.test(room)

    const filteredRoom = this.state.rooms
      .sort(compare)
      .filter(room => guestHouseType.test(room.roomNumber))
      .filter(room => room.checkInDate === formatDate(this.state.date))

    return (
      <div className="outter">
        <div className="big">
          <span onClick={() => this.setState({filter: 'sinsa'})}>sinsa**</span>
          <span onClick={() => this.setState({filter: ''})}>
            {formatDate(this.state.date)}
          </span>
          <span onClick={() => this.setState({filter: 'dmyk'})}>**dmyk</span>
        </div>
        {filteredRoom.map(room => {
          const yesterday = this.state.rooms.reduce((yesterdayRooms, yRoom) => {
            if (yRoom.checkOutDate === formatDate(this.state.date)) {
              if (yRoom.roomNumber === room.roomNumber) {
                yesterdayRooms.push(yRoom)
              }
            }
            return yesterdayRooms
          }, [])

          const numOfGuests =
            parseInt(room.guests) === 1 ? 2 : parseInt(room.guests)
          const checkOutTime = yesterday[0]
            ? yesterday[0].checkOutTime
            : isDmyk(room.roomNumber)
            ? 10
            : 11

          return (
            <div key={room.reservationCode} className="box">
              <h1>{room.roomNumber}</h1>
              <div>{`Check Out: ${checkOutTime}`}</div>
              <div>{`Check In: ${room.checkInTime}`}</div>
              <div>{`# of guests: ${numOfGuests}`}</div>
              <div>{`towels: ${numOfGuests * room.nights * 1.5}`}</div>
              <div>{`*${room.platform} - ${room.reservationCode}*`}</div>
              <div style={{color: 'red'}}>
                {room.cleaningMemo
                  ? `Cleaning Memo: ${room.cleaningMemo}`
                  : null}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Sinsa
