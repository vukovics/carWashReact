import React, { Fragment, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

const homePage = props => {

  const dispatch = useDispatch();

  return (
    <Fragment>
      Home Page
    </Fragment>
  );
};

export default withErrorHandler(homePage, axios);
