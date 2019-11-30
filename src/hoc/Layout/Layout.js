import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = props => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const loggedInUser = useSelector(state => state.auth.token)
  const user = useSelector(state => state.user.user)

  let toolbar;
  
  const sideDrawerToggleHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  };

  if (loggedInUser) {
    toolbar =  <Toolbar
      isAuth={props.isAuthenticated}
      drawerToggleClicked={sideDrawerToggleHandler}
      user={user}
    />
  }else{
    toolbar =  <Toolbar
    isAuth={props.isAuthenticated}
    drawerToggleClicked={sideDrawerToggleHandler}
    user={user}
  />
  }

  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false);
  };

  return (
    <Aux>
      {toolbar}
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={sideDrawerIsVisible}
        closed={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(layout);
