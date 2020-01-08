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
    console.log(selectedOffer)
    props.onDelete(selectedOffer);
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.question}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => onSubmit(props)} color="primary" autoFocus>
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuestionDialog;
