import React from 'react'

import desktopImage from '../../bg.jpg'

export default props => {
  return (
    <div
      className="App"
      style={{color: 'white', backgroundImage: `url(${desktopImage})`}}>
      {props.children}
    </div>
  )
}
