import React, {Component} from 'react'
import './App.css'
import Cleaning from './Cleaning.js'
import Home from './Home.js'
import Calendar from './Calendar.js'
import Dashboard from './Dashboard.js'
import NewReservationForm from './NewReservationForm.js'
import {BrowserRouter as Router, Route} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Home} />
        <div className="App">
          <Route path="/cleaning/" component={Cleaning} />
        </div>
        <Route path="/calendar/" component={Calendar} />
        <Route path="/dashboard/" component={Dashboard} />
        <Route path="/new/" component={NewReservationForm} />
      </Router>
    )
  }
}

export default App
