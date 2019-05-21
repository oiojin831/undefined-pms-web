import React from 'react'

import SCIHome from './SCIHome'
import Platform from './Platform'
import PlatformHome from './PlatformHome'
import Airbnb from './Airbnb'
import Others from './Others'
import CheckInInfo from './CheckInInfo'
import DmykInfo from './DmykInfo'
import './index.css'
import desktopImage from '../../bg.jpg'
import {Link} from '@reach/router'

const SelfCheckIn = ({children}) => {
  return (
    <div className="App" style={{backgroundImage: `url(${desktopImage})`}}>
      <div
        style={{
          height: '40vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          fontSize: '100px',
          color: 'white',
          fontWeight: 'bold',
        }}>
        dmyk.
      </div>
      {children}
      <div
        style={{
          display: 'flex',
          height: '10vh',
          justifyContent: 'flex-end',
          marginRight: '10px',
        }}>
        <Link to="/self-check-in">HOME</Link>
      </div>
    </div>
  )
}

export {
  SelfCheckIn,
  SCIHome,
  Platform,
  PlatformHome,
  Others,
  Airbnb,
  CheckInInfo,
  DmykInfo,
}
