import React from 'react'
import {Link} from '@reach/router'
import {Layout, Menu, Icon} from 'antd'

const {Sider} = Layout

export default ({admin, user}) => (
  <Sider breakpoint="lg" collapsedWidth="0">
    <div
      className="logo"
      style={{
        height: '32px',
        background: 'rgba(255,255,255,.2)',
        margin: '16px',
      }}
    />
    {admin ? (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to="cleaning">
            <Icon type="database" /> Cleaning
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="calendar">
            <Icon type="table" /> Calendar
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="newCash">
            <Icon type="plus" /> New cash booking
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="in-out">
            <Icon type="swap" /> In-Out
          </Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to="deposit">
            <Icon type="money-collect" /> Deposit
          </Link>
        </Menu.Item>
        <Menu.Item key="6">
          <Link to="admin-setting">
            <Icon type="money-collect" /> Setting
          </Link>
        </Menu.Item>
      </Menu>
    ) : user ? (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to="cleaning">
            <Icon type="database" /> Cleaning
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="cleaner-setting">
            <Icon type="money-collect" /> Setting
          </Link>
        </Menu.Item>
      </Menu>
    ) : null}
  </Sider>
)
