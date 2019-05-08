import React from 'react'

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
  return props.location ? (
    <div
      style={{
        color: 'white',
        fontSize: '30px',
        height: '50vh',
        display: 'flex',
        paddingTop: '30px',
        paddingRight: '10px',
        justifyContent: 'start',
        flexDirection: 'column',
        textAlign: 'right',
      }}>
      <div>Your room is..</div>
      <br />
      <div
        style={{
          fontWeight: 'bold',
          fontSize: '40px',
        }}>{`Room ${props.location.state.roomNumber
        .match(/\d/g)
        .join('')}`}</div>
      <div
        style={{
          fontWeight: 'bold',
          fontSize: '40px',
        }}>{`Passcode ${passCode[props.location.state.roomNumber]}`}</div>
      <div style={{fontSize: '10px'}}>Don't forget to enter # in the end.</div>
    </div>
  ) : (
    <div>no</div>
  )
}
