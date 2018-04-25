import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';

import './LayoutCustom.css';

import Header from '../../Components/Navigation/Header/Header';
import Footer from '../../Components/Navigation/Footer/Footer';
import Sider from '../../Components/Navigation/Sider/Sider';

const { Content } = Layout;

class LayoutCustom extends Component {
  state = {
    collapsed: false,
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Layout className="LayoutCustom">
        <Sider
          collapsed={this.state.collapsed}
          currentPath={this.props.currentPath} />
        <Layout>
          <Header
            collapsed={this.state.collapsed}
            toggle={this.toggle}
            userInfo={this.props.userInfo}
          />
          <Content className="Content">
            {this.props.children}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.userInfo,
    currentPath: state.auth.authRedirectPath,
  };
};

export default connect(mapStateToProps)(LayoutCustom);
