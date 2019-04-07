import React from 'react'
import {db} from './firebase.js'
import './Sinsa.css'
import {DateTime} from 'luxon'

const formatDate = date => date.toISO().substring(0, 10)

const compare = (a, b) => {
  if (a.roomNumber < b.roomNumber) return -1
  if (a.roomNumber > b.roomNumber) return 1
  return 0
}

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
          const {
            checkInDate,
            checkOutDate,
            guestName,
            guests,
            nights,
            phoneNumber,
            platform,
            reservationCode,
            roomNumber,
            checkInTime,
            checkOutTime,
          } = doc.data()
          rooms.push({
            key: doc.id,
            doc, // DocumentSnapshot
            checkInDate,
            checkOutDate,
            guestName,
            guests,
            nights,
            phoneNumber,
            platform,
            reservationCode,
            roomNumber,
            checkInTime,
            checkOutTime,
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
    console.log('this.stat.rooms', this.state.rooms)
    let re = new RegExp(this.state.filter)
    const reDmyk = new RegExp('dmyk')
    const isDmyk = room => reDmyk.test(room)

    return (
      <div className="outter">
        <div className="big">
          <span onClick={() => this.setState({filter: 'sinsa'})}>sinsa**</span>
          <span onClick={() => this.setState({filter: ''})}>
            {formatDate(this.state.date)}
          </span>
          <span onClick={() => this.setState({filter: 'dmyk'})}>**dmyk</span>
        </div>
        {this.state.rooms
          .sort(compare)
          .filter(room => re.test(room.roomNumber))
          .filter(room => room.checkInDate === formatDate(this.state.date))
          .map(room => {
            const yesterday = this.state.rooms.reduce(
              (yesterdayRooms, yRoom) => {
                if (yRoom.checkOutDate === formatDate(this.state.date)) {
                  console.log(
                    'checkoutdate',
                    yRoom.checkOutDate,
                    yRoom.roomNumber,
                  )
                  if (yRoom.roomNumber === room.roomNumber) {
                    yesterdayRooms.push(yRoom)
                  }
                }
                return yesterdayRooms
              },
              [],
            )
            const numOfGuests =
              parseInt(room.guests) === 1 ? 2 : parseInt(room.guests)

            console.log(room.roomNumber, yesterday[0])
            return (
              <div className="box">
                <h1>{room.roomNumber}</h1>
                <div>{`Check Out: ${
                  yesterday[0]
                    ? yesterday[0].checkOutTime
                    : isDmyk(room.roomNumber)
                    ? 10
                    : 11
                }`}</div>
                <div>{`Check In: ${room.checkInTime}`}</div>
                <div>{`towels: ${numOfGuests * room.nights * 1.5}`}</div>
                <div>{`*${room.platform} - ${room.reservationCode}*`}</div>
              </div>
            )
          })}
      </div>
    )
  }
}

export default Sinsa
