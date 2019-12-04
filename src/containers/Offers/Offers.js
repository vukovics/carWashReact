import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';
import OfferCard from '../../components/UI/OfferCard/OfferCard';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const offersPage = props => {
  const selectedCompanyOffers = useSelector(state => state.companies.selectedCompanyOffers);

  return (
    <Fragment>
      <OfferCard selectedCompanyOffers={selectedCompanyOffers} />
    </Fragment>
  );
};

export default withErrorHandler(offersPage, axios);
