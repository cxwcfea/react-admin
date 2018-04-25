import React from 'react';
import { Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';

import './Toolbar.css';

const toolbar = (props) => (
  <Menu mode="horizontal" className="Toolbar">
    <Menu.Item>
      <Icon type="appstore" />
    </Menu.Item>
    <Menu.Item>
      <Icon type="mail" />
    </Menu.Item>
    <Menu.SubMenu title={<span><Icon type="user" />{props.userInfo.sub}</span>}>
      <Menu.Item>
        <NavLink
          to="/logout"
          exact>
          登出
        </NavLink>
      </Menu.Item>
    </Menu.SubMenu>
  </Menu>
);

export default toolbar;
