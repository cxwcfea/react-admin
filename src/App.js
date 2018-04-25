import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LayoutCustom from './hoc/LayoutCustom/LayoutCustom';
import Dashboard from './containers/Dashboard/Dashboard';
import UserList from './containers/UserList/UserList';
import OrderList from './containers/OrderList/OrderList';

class App extends Component {
  render() {
    return (
      <LayoutCustom>
        <Switch>
          <Route exact path='/app/dashboard' component={Dashboard} />
          <Route exact path='/app/user-list' component={UserList} />
          <Route exact path='/app/order-list' component={OrderList} />
          <Redirect to="/app/dashboard" />
        </Switch>
      </LayoutCustom>
    );
  }
}

export default App;
