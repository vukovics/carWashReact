import React, { Fragment  } from 'react';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const homePage = props => {

  return (
    <Fragment>
      Home Page
    </Fragment>
  );
};

export default withErrorHandler(homePage, axios);
