import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Grid, Paper} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import TableOwnerCompanies from '../../components/UI/TableOwnerCompanies/TableOwnerCompanies';
import OfferDialog from '../../components/UI/Dialogs/OfferDialog/OfferDialog';
import Container from '@material-ui/core/Container';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import classes from './CompanyOffers.css';

const CompanyOffers = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const tableActions = [{type: 'new'}, {type: 'show'}];
  const [open, setOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState();

  useEffect(() => {
    dispatch(actions.getOwnerCompanies(user.id));
  }, []);

  function onActionHandle(selectedCompany) {
    setSelectedCompany(selectedCompany);
    selectedCompany.type === 'new'
      ? setOpen(true)
      : redirectToOfferList(selectedCompany);
  }

  const redirectToOfferList = selectedCompany => {
    console.log(selectedCompany);
    history.push('/company-offer-list/'+selectedCompany.data.company_id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = value => {
    const newOffer = {
      name: value.name,
      description: value.description,
      price: value.price,
      company_id: selectedCompany.data.company_id,
    };
    dispatch(actions.createNewCompanyOffer(newOffer));
    handleClose();
  };

  const tableColumns = ['Company', 'Country', 'City', '', ''];
  const ownerCompanies = useSelector(state => state.companies.ownerCompanies);

  return (
    <Container>
      <Grid className={classes.tableCompany}>
        <Paper className={classes.root}>
          <TableOwnerCompanies
            columns={tableColumns}
            rows={ownerCompanies}
            onAction={onActionHandle}
            actions={tableActions}
          />
        </Paper>
      </Grid>
      <OfferDialog
        selectedCompany={selectedCompany}
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        aria-labelledby="form-dialog-title"
      />
    </Container>
  );
};

export default withErrorHandler(CompanyOffers, axios);
