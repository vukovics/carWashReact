import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import OfferCard from '../../components/Offers/OfferCard/OfferCard';
import CompanyInfo from '../../components/Offers/CompanyInfo/CompanyInfo';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import * as actions from '../../store/actions/index';
import OfferForm from '../../components/Offers/OfferForm/OfferForm';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const offersPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const selectedCompanyOffers = useSelector(
    state => state.companies.selectedCompanyOffers
  );

  const selectedOffer = useSelector(state => state.companies.selectedOffer);

  const selectedCompany = useSelector(state => state.companies.selectedCompany);

  const handeleSelectOffer = offer => {
    dispatch(actions.setSelectedOfferSuccess(offer));
  };

  const user = useSelector(state => state.user.user)

  const handleSubmittedRequest = submittedRequest => {
    const offer = {
      userInfo: user,
      dateTime: submittedRequest,
      selectedOffer: selectedOffer
    }
    dispatch(actions.addOffer(offer, history));
  };

  return (
    <Container>
      <Grid>
        <Grid item xs={12} style={{marginBottom: '1rem'}}>
          <CompanyInfo selectedCompany={selectedCompany} />
        </Grid>
        <Grid item xs={12} style={{display: 'flex', flexWrap: 'wrap'}}>
          <OfferCard
            selectedCompanyOffers={selectedCompanyOffers}
            selectedOffer={selectedOffer}
            onSelectOffer={handeleSelectOffer}
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            paddingBottom: '1rem',
            paddingTop: '1rem',
          }}
        >
          <OfferForm
            selectedOffer={selectedOffer}
            onSubmitRequest={handleSubmittedRequest}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default withErrorHandler(offersPage, axios);
