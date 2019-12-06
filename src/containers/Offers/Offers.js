import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import OfferCard from '../../components/UI/OfferCard/OfferCard';
import CompanyInfo from '../../components/CompanyInfo/CompanyInfo';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import * as actions from '../../store/actions/index';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const offersPage = () => {
  const dispatch = useDispatch();

  const selectedCompanyOffers = useSelector(
    state => state.companies.selectedCompanyOffers
  );
  const selectedCompany = useSelector(state => state.companies.selectedCompany);


  const handeleSelectOffer = offer => {
    const selectedOffer = selectedCompanyOffers.filter(companyOffer => {
      return companyOffer.id === offer.id
    })
    console.log(selectedOffer);
  };

  return (
    <Container>
      <Grid>
        <Grid item xs={12} style={{marginBottom: '1rem'}}>
          <CompanyInfo selectedCompany={selectedCompany} />
        </Grid>
        <Grid item xs={12} style={{display: 'flex', flexWrap: 'wrap'}}>
          <OfferCard selectedCompanyOffers={selectedCompanyOffers} onSelectOffer={handeleSelectOffer} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default withErrorHandler(offersPage, axios);
