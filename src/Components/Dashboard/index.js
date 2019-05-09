import React from 'react'

import {Layout} from 'antd'

import Dashboard from './Dashboard'

const {Header, Content, Footer} = Layout

export default ({children, admin, user}) => {
  return (
    <Layout style={{height: '100vh'}}>
      <Dashboard path="/" user={user} admin={admin} />
      <Layout path="/">
        <Header style={{color: 'white', textAlign: 'center'}}>
          SINSA / DMYK
        </Header>
        <Content style={{overflow: 'auto'}}>{children}</Content>
        <Footer style={{textAlign: 'center'}}>STAY with UNDEFINEDIST</Footer>
      </Layout>
    </Layout>
  )
}
