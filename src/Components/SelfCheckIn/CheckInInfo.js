import React from 'react'
import {navigate} from '@reach/router'

const passCode = {
  dmyk101: '0424#',
  dmyk102: '9849#',
  dmyk103: '8103#',
  dmyk104: '1169#',
  dmyk201: '1985#',
  dmyk202: '7820#',
  dmyk203: '1627#',
  dmyk204: '8265#',
  dmyk300: '181222*',
}

export default props => {
  console.log('helehl', JSON.stringify(props))
  return props.location ? (
    <React.Fragment>
      <div>Your room is..</div>
      <div>{props.location.state.roomNumber}</div>
      <div>{passCode[props.location.state.roomNumber]}</div>
    </React.Fragment>
  ) : (
    <div>no</div>
  )
}
