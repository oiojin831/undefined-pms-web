import React, {Component} from 'react'
import Home from './Components/Home'
import Cleaning from './Components/Cleaning'
import Calendar from './Components/Calendar'
import Deposit from './Components/Deposit'
import InOut from './Components/InOut'
import NewCash from './Components/NewCash'

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {Layout, Menu, Icon} from 'antd'

const {Header, Footer, Content, Sider} = Layout

class App extends Component {
  render() {
    return (
      <Router>
        <Layout style={{height: '100vh'}}>
          <Sider breakpoint="lg" collapsedWidth="0">
            <div
              className="logo"
              style={{
                height: '32px',
                background: 'rgba(255,255,255,.2)',
                margin: '16px',
              }}
            />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Link to="/cleaning">
                  <Icon type="database" /> Cleaning
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/calendar">
                  <Icon type="table" /> Calendar
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/newCash">
                  <Icon type="plus" /> New cash booking
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/in-out">
                  <Icon type="swap" /> In-Out
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/deposit">
                  <Icon type="money-collect" /> Deposit
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{color: 'white', textAlign: 'center'}}>
              SINSA / DMYK
            </Header>
            <Content style={{overflow: 'auto'}}>
              <Route path="/" exact component={Home} />
              <Route path="/cleaning/" component={Cleaning} />
              <Route path="/calendar/" component={Calendar} />
              <Route path="/deposit" exact component={Deposit} />
              <Route path="/in-out/" component={InOut} />
              <Route path="/newCash/" component={NewCash} />
            </Content>
            <Footer style={{textAlign: 'center'}}>
              STAY with UNDEFINEDIST
            </Footer>
          </Layout>
        </Layout>
      </Router>
    )
  }
}

export default App
