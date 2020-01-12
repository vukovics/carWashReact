import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Grid} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import * as actions from '../../store/actions/index';
import OfferDialog from '../../components/UI/Dialogs/OfferDialog/OfferDialog';
import QuestionDialog from '../../components/UI/Dialogs/QuestionDialog/QuestionDialog';
import TablePagginated from '../../components/UI/Tables/TablePagginated/TablePagginated';

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


  const handleClose = () => {
    setEditOpen(false);
    setDeleteOpen(false);
  };

  const handleSubmit = offer => {
    dispatch(actions.updateCompanyOffer(offer));
    dispatch(actions.getSingleCompanyOffer(params.id));
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
  const columns = [
    {id: 'name', label: 'Name', minWidth: 170},
    {id: 'description', label: 'Description', minWidth: 100},
    {
      id: 'price',
      label: 'Price',
      minWidth: 170,
      align: 'right',
      format: value => value.toLocaleString(),
    },
    {
      id: 'edit',
      label: 'Accept',
      minWidth: 170,
      align: 'right',
      format: value => value.toFixed(2),
    },
    {
      id: 'delete',
      label: 'Declined',
      minWidth: 170,
      align: 'right',
      format: value => value.toFixed(2),
    },
  ];

  return (
    <Container>
      <Grid>
        <TablePagginated
          onActionOne={handleEdit}
          onActionTwo={handleDelete}
          rowsFromComponent={companieOffers}
          columnsFromComponent={columns}
          />
        <OfferDialog
          title= {'Edit Offer'}
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
