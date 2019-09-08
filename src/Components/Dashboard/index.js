import React from "react";

import { Layout } from "antd";

import Dashboard from "./Dashboard";
import Cleaning from "./Cleaning";
import Calendar from "./Calendar";
import NewCash from "./NewCash";
import InOut from "./InOut";
import Deposit from "./Deposit";
import Statistic from "./Statistic";
import Payment from "./Payment";

const { Header, Content } = Layout;

export default ({ children, admin, user }) => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Dashboard path="/" user={user} admin={admin} />
      <Layout path="/">
        <Content style={{ overflow: "auto" }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export { Cleaning, Calendar, NewCash, InOut, Deposit, Statistic, Payment };
