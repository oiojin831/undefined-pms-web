import React, {Component} from 'react'
import Home from './Home.js'
import Calendar from './Calendar.js'
import Deposit from './Components/Deposit'
import Dashboard from './Dashboard.js'
import NewReservationForm from './NewReservationForm.js'
import Cleaning from './Components/Cleaning'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Layout} from 'antd'

const {Header, Footer, Content} = Layout

class App extends Component {
  render() {
    return (
      <Layout>
        <Header>header</Header>
        <Content>
          <Router>
            <Route path="/" exact component={Home} />
            <Route path="/deposit" exact component={Deposit} />
            <Route path="/cleaning/" component={Cleaning} />
            <Route path="/calendar/" component={Calendar} />
            <Route path="/dashboard/" component={Dashboard} />
            <Route path="/new/" component={NewReservationForm} />
          </Router>
        </Content>
        <Footer>footer</Footer>
      </Layout>
    )
  }
}

export default App
