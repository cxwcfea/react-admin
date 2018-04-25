import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Row, Form, Input } from 'antd'

import './Login.css'
import logo from '../../../assets/images/logo.png';

import * as actions from '../../../store/actions';

const FormItem = Form.Item;

class Login extends Component {
  formSubmitHandler = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAuth(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    let authRedirect = null;
    if (this.props.isAuth) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className="Login">
        {authRedirect}
        <div className="logo">
          <img alt="logo" src={logo} />
          <span>管理后台</span>
        </div>
        <form onSubmit={this.formSubmitHandler}>
          <FormItem hasFeedback>
            {getFieldDecorator('mobile', {
              rules: [
                {
                  required: true,
                  pattern: /^1[3|4|5|7|8][0-9]{9}$/,
                  message: '请输入有效的手机号',
                },
              ],
            })(<Input onPressEnter={this.formSubmitHandler} placeholder="Username" />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  min: 6,
                  message: '密码长度至少6位',
                },
              ],
            })(<Input type="password" onPressEnter={this.formSubmitHandler} placeholder="Password" />)}
          </FormItem>
          <Row>
            <Button type="primary" htmlType="submit" loading={this.props.loading}>
              Sign in
            </Button>
          </Row>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    isAuth: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (payload) => dispatch(actions.auth(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login));
