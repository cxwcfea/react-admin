import React from 'react';
import { Layout, Icon } from 'antd';

import './Header.css';

import Toolbar from './Toolbar/Toolbar';

const { Header } = Layout;

const header = (props) => (
  <Header className="Header">
    <Icon
      className="trigger"
      type={props.collapsed ? 'menu-unfold' : 'menu-fold'}
      onClick={props.toggle}
    />
    <Toolbar userInfo={props.userInfo} />
  </Header>
)

export default header;
