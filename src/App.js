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

const CompanyDashboardPage = React.lazy(() => {
  return import('./containers/CompanyDashboard/CompanyDashboard');
});

const CompanyReservationsPage = React.lazy(() => {
  return import('./containers/CompanyReservations/CompanyReservations');
});

const Register = React.lazy(() => {
  return import('./containers/Register/Register');
});

const homePage = React.lazy(() => {
  return import('./containers/HomePage/HomePage');
});

const offersPage = React.lazy(() => {
  return import('./containers/Offers/Offers');
});

const reservationsPage = React.lazy(() => {
  return import('./containers/Reservations/Reservations');
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
        <Route path="/" exact component={Dashboard} />
        <Route path="/logout" component={Logout} />
        <Route exact path="/offers" component={offersPage} />
        <Route exact path="/reservations" component={reservationsPage} />
      </Switch>
    );

    if(props.isOwner) {
      routes = (
        <Switch>
          <Route path="/" exact component={CompanyDashboardPage} />
          <Route path="/logout" component={Logout} />
          <Route exact path="/company-dashboard" component={CompanyDashboardPage} />
          <Route exact path="/company-reservations" component={CompanyReservationsPage} />
        </Switch>
      );
    }

  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    isOwner : state.user.user.isOwner !== 0,
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
