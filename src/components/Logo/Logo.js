import React from 'react';

import burgerLogo from '../../assets/images/logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt="Donkey clean" />
    </div>
    
);

export default logo;