import React, { Fragment  } from 'react';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const offersPage = props => {

  return (
    <Fragment>
      Offers Page
    </Fragment>
  );
};

export default withErrorHandler(offersPage, axios);
