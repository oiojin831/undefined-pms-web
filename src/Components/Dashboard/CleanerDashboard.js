import React from 'react'
import {Link} from '@reach/router'

import {Layout, Menu, Icon} from 'antd'

const {Sider} = Layout

export default () => (
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
        <Link to="cleaning">
          <Icon type="database" /> Cleaning
        </Link>
      </Menu.Item>
    </Menu>
  </Sider>
)
