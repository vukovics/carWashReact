import React from 'react';
import {useSelector} from 'react-redux';
import OfferCard from '../../components/UI/OfferCard/OfferCard';
import CompanyInfo from '../../components/CompanyInfo/CompanyInfo';
import Grid from '@material-ui/core/Grid';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const offersPage = () => {
  const selectedCompanyOffers = useSelector(
    state => state.companies.selectedCompanyOffers
  );
  const selectedCompany = useSelector(state => state.companies.selectedCompany);

  return (
    <Grid container>
      <Grid item xs={12}>
        <CompanyInfo selectedCompany={selectedCompany} />
      </Grid>
      <Grid item xs={12}>
        <OfferCard selectedCompanyOffers={selectedCompanyOffers} />
      </Grid>
    </Grid>
  );
};

export default withErrorHandler(offersPage, axios);
