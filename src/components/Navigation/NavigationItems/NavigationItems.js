import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Home</NavigationItem>
        {props.isAuthenticated && !props.isOwner ? <NavigationItem link="/reservations">My reservations</NavigationItem> : null}
        {props.isAuthenticated && props.isOwner ? <NavigationItem link="/company-reservations">My Bookings</NavigationItem> : null}
        {!props.isAuthenticated
            ? <NavigationItem link="/login">Authenticate</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
);

export default navigationItems;
