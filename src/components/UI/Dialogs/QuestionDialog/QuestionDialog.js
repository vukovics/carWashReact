import React from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

const QuestionDialog = props => {
  function handleClose() {
    props.onClose();
  }

  function onSubmit(selectedOffer) {
    props.onDelete(selectedOffer);
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      fullWidth={true}
      maxWidth={'sm'}
    >
      <DialogTitle id="form-dialog-title">Delete Offer</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.question}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose} autoFocus>
          Cancel
        </Button>
        <Button color="secondary" onClick={() => onSubmit(props)}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuestionDialog;
