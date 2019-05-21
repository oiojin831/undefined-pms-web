import React from 'react'
import {navigate} from '@reach/router'
import IdleTimer from 'react-idle-timer'

export default ({children}) => (
  <React.Fragment>
    <IdleTimer
      element={document}
      onIdle={() => {
        navigate('/self-check-in')
      }}
      debounce={250}
      timeout={1000 * 30}
    />
    {children}
  </React.Fragment>
)
