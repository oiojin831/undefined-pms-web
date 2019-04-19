import React from 'react'
import AdminDashboard from './AdminDashboard'
import CleanerDashboard from './CleanerDashboard'
import {Layout} from 'antd'
import Auth from '../Auth'

const {Header, Content, Footer} = Layout
export default ({children, admin, user}) => {
  return (
    <Layout style={{height: '100vh'}}>
      {user ? (
        admin ? (
          <AdminDashboard path="/" />
        ) : (
          <CleanerDashboard path="/" />
        )
      ) : (
        <Auth path="/" />
      )}
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
