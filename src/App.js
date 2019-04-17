import React, {useState, useEffect} from 'react'
import Home from './Components/Home'
import Cleaning from './Components/Cleaning'
import Calendar from './Components/Calendar'
import Deposit from './Components/Deposit'
import InOut from './Components/InOut'
import NewCash from './Components/NewCash'
import Auth from './Components/Auth'
import Admin from './Components/Admin'
import {firebase} from './firebase'

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {Layout, Menu, Icon} from 'antd'

const {Header, Footer, Content, Sider} = Layout

export default () => {
  const [user, setUser] = useState(null)
  const [admin, setAdmin] = useState(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        setUser({dispalyName: user.displayName, uid: user.uid})
        const admin = await user.getIdTokenResult()
        console.log('admin', JSON.stringify(admin.claims.admin, null, 2))
        setAdmin(admin.claims.admin)
      } else {
        setUser(null)
        setAdmin(null)
      }
    })
  }, [])

  return (
    <Router>
      {user ? (
        <Layout style={{height: '100vh'}}>
          {console.log('admin data', admin)}
          {admin ? (
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
                <Menu.Item key="6">
                  <Link to="/admin">
                    <Icon type="money-collect" /> Admin
                  </Link>
                </Menu.Item>
              </Menu>
            </Sider>
          ) : (
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
              </Menu>
            </Sider>
          )}

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
              <Route path="/admin/" component={Admin} />
            </Content>
            <Footer style={{textAlign: 'center'}}>
              STAY with UNDEFINEDIST
            </Footer>
          </Layout>
        </Layout>
      ) : (
        <Layout>
          <Auth setUser={setUser} />
        </Layout>
      )}
    </Router>
  )
}
