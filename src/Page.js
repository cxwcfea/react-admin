import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './containers/Auth/Login/Login';
import Logout from './containers/Auth/Logout/Logout';
import App from './App';
import * as actions from './store/actions';

class Page extends Component {
  componentWillMount() {
    this.props.onSetAuthRedirectPath(window.location.pathname);
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/login" component={Login} />
        <Redirect to="/login" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path='/app' component={App} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/app/dashboard" />
        </Switch>
      );
    }

    return (
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.checkAuthState()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
