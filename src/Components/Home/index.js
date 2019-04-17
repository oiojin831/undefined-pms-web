import React from 'react'
import {Link} from 'react-router-dom'

export default () => {
  return (
    <React.Fragment>
      <h1>welcom to undefinedist Hotels</h1>
      <br />
      <h1>
        <Link to="/cleaning/">Cleaning</Link>
      </h1>
    </React.Fragment>
  )
}
