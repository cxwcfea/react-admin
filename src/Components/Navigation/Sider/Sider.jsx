import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import './Sider.css';
import logo from '../../../assets/images/logo.png';

import { menus } from '../../../utils';

const { Sider } = Layout;

const sider = (props) => {
  let selectedKey = '/app/dashboard';

  const menuList = menus.map(menu => {
    if (menu.key === props.currentPath) {
      selectedKey = menu.key;
    }
    return (
      <Menu.Item key={menu.key}>
        <Link to={menu.key}>
          <Icon type={menu.icon} />
          <span>{menu.title}</span>
        </Link>
      </Menu.Item>
    );
  });

  return (
    <Sider
      className="Sider"
      breakpoint="lg"
      trigger={null}
      collapsible
      collapsed={props.collapsed}>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[selectedKey]}>
        { menuList }
      </Menu>
    </Sider>);
};

export default sider;
