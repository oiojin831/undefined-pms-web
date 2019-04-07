import React, {Component} from 'react'
import './App.css'
import Sinsa from './Sinsa.js'
import Calendar from './Calendar.js'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/cleaning/" component={Sinsa} />
        </div>
        <Route path="/calendar/" component={Calendar} />
      </Router>
    )
  }
}

export default App
