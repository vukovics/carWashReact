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

const CompanyDashboard = React.lazy(() => {
  return import('./containers/CompanyDashboard/CompanyDashboard');
});

const CompanyReservations = React.lazy(() => {
  return import('./containers/CompanyReservations/CompanyReservations');
});

const CompanyOfferList = React.lazy(() => {
  return import('./containers/CompanyOfferList/CompanyOfferList');
});

const Register = React.lazy(() => {
  return import('./containers/Register/Register');
});

const home = React.lazy(() => {
  return import('./containers/HomePage/HomePage');
});

const offers = React.lazy(() => {
  return import('./containers/Offers/Offers');
});

const reservations = React.lazy(() => {
  return import('./containers/Reservations/Reservations');
});

const offer = React.lazy(() => {
  return import('./containers/CompanyOffers/CompanyOffers');
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
      <Route path="/" exact component={home} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/logout" component={Logout} />
        <Route exact path="/offers" component={offers} />
        <Route exact path="/reservations" component={reservations} />
      </Switch>
    );

    if(props.isOwner) {
      routes = (
        <Switch>
          <Route path="/" exact component={CompanyDashboard} />
          <Route path="/logout" component={Logout} />
          <Route exact path="/company-dashboard" component={CompanyDashboard} />
          <Route exact path="/company-offers" component={offer} />
          <Route exact path="/company-reservations" component={CompanyReservations} />
          <Route exact path="/company-offer-list/:id" component={CompanyOfferList} />
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
