import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Grid, Paper} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import OfferDialog from '../../components/UI/Dialogs/OfferDialog/OfferDialog';
import Container from '@material-ui/core/Container';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import classes from './CompanyOffers.css';
import TablePagginated from '../../components/UI/Tables/TablePagginated/TablePagginated'

const CompanyOffers = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const [open, setOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState();

  useEffect(() => {
    dispatch(actions.getOwnerCompanies(user.id));
  }, []);

  const redirectToOfferList = selectedCompany => {
    history.push('/company-offer-list/'+selectedCompany.company_id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = value => {

    const newOffer = {
      name: value.name,
      description: value.description,
      price: value.price,
      company_id: selectedCompany.company_id,
    };
    dispatch(actions.createNewCompanyOffer(newOffer));
    handleClose();
  };

  const handleNewAction = company => {
    setSelectedCompany(company);
    setOpen(true)
  };

  const handleShowAction = company => {
    setSelectedCompany(company);
    redirectToOfferList(company)
  };

  const ownerCompanies = useSelector(state => state.companies.ownerCompanies);
  const columns = [
    {id: 'company', label: 'Company', minWidth: 170},
    {id: 'city', label: 'City', minWidth: 100},
    {
      id: 'country',
      label: 'Country',
      minWidth: 170,
      align: 'right',
      format: value => value.toLocaleString(),
    },
    {
      id: 'new',
      label: 'New',
      minWidth: 170,
      align: 'right',
      format: value => value.toFixed(2),
    },
    {
      id: 'show',
      label: 'Show',
      minWidth: 170,
      align: 'right',
      format: value => value.toFixed(2),
    },
  ];

  return (
    <Container>
      <Grid className={classes.tableCompany}>
        <Paper className={classes.root}>
        <TablePagginated
          onActionOne={handleNewAction}
          onActionTwo={handleShowAction}
          rowsFromComponent={ownerCompanies}
          columnsFromComponent={columns}
          />
        </Paper>
      </Grid>
      <OfferDialog
        title= {'Create Offer'}
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
