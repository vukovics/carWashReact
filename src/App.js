import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import Dashboard from './containers/Dashboard/Dashboard';


const Login = React.lazy(() => {
  return import('./containers/Login/Login');
});

const Register = React.lazy(() => {
  return import('./containers/Register/Register');
});

const homePage = React.lazy(() => {
  return import('./containers/HomePage/HomePage');
});

const app = props => {
  const { onTryAutoSignup } = props;
  
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      <Route path="/login" render={props => <Login {...props} />} />
      <Route path="/register" render={props => <Register {...props} />} />
      <Route path="/" exact component={homePage} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={Dashboard} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...getUser</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(app)
);
