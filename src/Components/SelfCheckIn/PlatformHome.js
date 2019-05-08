import React from 'react'
import {Link} from '@reach/router'
import {Button} from 'antd'

export default () => (
  <div
    style={{
      height: '50vh',
      display: 'flex',
      alignItems: 'start',
      paddingTop: '50px',
      justifyContent: 'center',
    }}>
    <Link style={{fontSize: '30px'}} to="airbnb">
      <Button
        size="large"
        style={{
          backgroundColor: 'transparent',
          marginRight: '10px',
          color: 'white',
        }}>
        AirBnb
      </Button>
    </Link>
    <Link style={{fontSize: '30px'}} to="others">
      <Button
        size="large"
        style={{
          backgroundColor: 'transparent',
          color: 'white',
        }}>
        others
      </Button>
    </Link>
  </div>
)
