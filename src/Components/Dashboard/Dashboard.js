import React from "react";
import { Link, Location } from "@reach/router";
import { Layout, Menu, Icon } from "antd";

const { Sider, Header } = Layout;

export default ({ admin, user }) => {
  return (
    <Location>
      {({ location }) => (
        <Header style={{ display: "flex", alignItems: "center" }}>
          {true ? (
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
              <Menu.Item key="/dashboard/calendar">
                <Link to="calendar">
                  <Icon type="table" /> Calendar
                </Link>
              </Menu.Item>
              <Menu.Item key="/dashboard/payment">
                <Link to="payment">
                  <Icon type="info" /> CheckInOut
                </Link>
              </Menu.Item>
              <Menu.Item key="/dashboard/statistic">
                <Link to="statistic">
                  <Icon type="bar-chart" /> Statistic
                </Link>
              </Menu.Item>
              <Menu.Item key="/dashboard/newCash">
                <Link to="newCash">
                  <Icon type="plus" /> New cash booking
                </Link>
              </Menu.Item>
              <Menu.Item key="/dashboard/in-out">
                <Link to="in-out">
                  <Icon type="swap" /> In-Out
                </Link>
              </Menu.Item>
              <Menu.Item key="/dashboard/deposit">
                <Link to="deposit">
                  <Icon type="money-collect" /> Deposit
                </Link>
              </Menu.Item>
              <Menu.Item key="/dashboard/admin-setting">
                <Link to="admin-setting">
                  <Icon type="money-collect" /> Setting
                </Link>
              </Menu.Item>
            </Menu>
          ) : user ? (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
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
        </Header>
      )}
    </Location>
  );
};
