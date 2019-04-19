import React from 'react'
import {Link} from '@reach/router'

export default ({children}) => {
  return (
    <React.Fragment>
      <h1>Welcom to undefinedist Hotels</h1>
      <br />
      <h1>Sinsa / DMYK</h1>
      {children}
    </React.Fragment>
  )
}
