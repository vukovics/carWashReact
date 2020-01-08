import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Grid} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import * as actions from '../../store/actions/index';
import OfferDialog from '../../components/UI/Dialogs/OfferDialog/OfferDialog';
import QuestionDialog from '../../components/UI/Dialogs/QuestionDialog/QuestionDialog';
import TableSingleCompanyOffers from '../../components/UI/TableSingleCompanyOffers/TableSingleCompanyOffers';

const CompanyOfferList = props => {
  const dispatch = useDispatch();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState();
  const {
    match: {params},
  } = props;
  useEffect(() => {
    dispatch(actions.getSingleCompanyOffer(params.id));
  }, []);

  const tableColumns = [
    'Company',
    'Date',
    'Name',
    'Phone Number',
    'Email',
    '',
    '',
  ];

  const handleClose = () => {
    setEditOpen(false);
    setDeleteOpen(false);
  };

  const handleSubmit = updateOffer => {
    dispatch(actions.createNewCompanyOffer(updateOffer));
    handleClose();
  };

  const handleEdit = selectedOffer => {
    setSelectedOffer(selectedOffer);
    setEditOpen(true);
  };

  const handleDelete = selectedOffer => {
    setSelectedOffer(selectedOffer);
    setDeleteOpen(true);
  };

  const handleDeleteOffer = selectedOffer => {
    dispatch(actions.deleteCompanyOffer(selectedOffer.selectedOffer.id));
    dispatch(actions.getSingleCompanyOffer(params.id));
    handleClose();
  };

  const companieOffers = useSelector(state => state.companies.offers);

  return (
    <Container>
      <Grid>
        <TableSingleCompanyOffers
          columns={tableColumns}
          rows={companieOffers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <OfferDialog
          selectedOffer={selectedOffer}
          open={editOpen}
          onClose={handleClose}
          onSubmit={handleSubmit}
          aria-labelledby="form-dialog-title"
        />
        <QuestionDialog
          selectedOffer={selectedOffer}
          open={deleteOpen}
          question={'Are you sure?'}
          onClose={handleClose}
          onDelete={handleDeleteOffer}
          aria-labelledby="form-dialog-title"
        />
      </Grid>
    </Container>
  );
};

export default CompanyOfferList;
