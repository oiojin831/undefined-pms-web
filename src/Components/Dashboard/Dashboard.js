import React from "react";
import { Link, Location } from "@reach/router";
import { Layout, Menu, Icon } from "antd";

const { Sider, Header } = Layout;

export default ({ admin, user }) => {
  return (
    <Location>
      {({ location }) => (
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
          >
            <Menu.Item key="/dashboard/cleaning">
              <Link to="cleaning">
                <Icon type="database" /> Cleaning
              </Link>
            </Menu.Item>
            <Menu.Item key="/dashboard/calendar" disabled={!admin}>
              <Link to="calendar">
                <Icon type="table" /> Calendar
              </Link>
            </Menu.Item>
            <Menu.Item key="/dashboard/payment" disabled={!admin}>
              <Link to="payment">
                <Icon type="info" /> CheckInOut
              </Link>
            </Menu.Item>
            <Menu.Item key="/dashboard/statistic" disabled={!admin}>
              <Link to="statistic">
                <Icon type="bar-chart" /> Statistic
              </Link>
            </Menu.Item>
            <Menu.Item key="/dashboard/newCash" disabled={!admin}>
              <Link to="newCash">
                <Icon type="plus" /> New cash booking
              </Link>
            </Menu.Item>
            <Menu.Item key="/dashboard/in-out" disabled={!admin}>
              <Link to="in-out">
                <Icon type="swap" /> In-Out
              </Link>
            </Menu.Item>
            <Menu.Item key="/dashboard/deposit" disabled={!admin}>
              <Link to="deposit">
                <Icon type="money-collect" /> Deposit
              </Link>
            </Menu.Item>
            <Menu.Item key="/dashboard/admin-setting" disabled={!admin}>
              <Link to="admin-setting">
                <Icon type="money-collect" /> Setting
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
      )}
    </Location>
  );
};
