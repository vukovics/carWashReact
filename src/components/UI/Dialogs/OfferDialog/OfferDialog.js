import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import * as Yup from 'yup';
import {Formik, validateYupSchema} from 'formik';
import classes from './OfferDialog.css';

const OfferDialog = props => {

  function handleClose() {
    props.onClose();
  }

  function checkInitialValues() {
    if (!props.selectedOffer) {
      return {
        name: '',
        description: '',
        price: '',
      };
    } else {
      return props.selectedOffer;
    }
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
      <DialogContent  className={classes.dialogContent}>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <Formik
          isValid={validateYupSchema}
          initialValues={checkInitialValues()}
          onSubmit={(values, {setSubmitting}) => {
            setSubmitting(true);
            props.onSubmit(values);
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Required'),
            description: Yup.string().required('Required'),
            price: Yup.string().required('Required'),
          })}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              isValid,
              handleChange,
              handleBlur,
              handleSubmit,
            } = props;
            return (
              <Container
                maxWidth="sm"
                spacing={0}
                direction="column"
                justify="center"
              >
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
                  <TextField
                    fullWidth
                    error={errors.name && touched.name}
                    label="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.name && touched.name && errors.name}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    error={errors.description && touched.description}
                    label="Description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.description &&
                      touched.description &&
                      errors.description
                    }
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    error={errors.price && touched.price}
                    label="Price"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.price && touched.price && errors.price}
                    margin="normal"
                  />
                  <DialogActions>
                    <Button
                      disabled={!isValid}
                      variant="contained"
                      type="submit"
                      color="primary"
                    >
                      Submit
                    </Button>
                    <Button onClick={handleClose}>Close</Button>
                  </DialogActions>
                </form>
              </Container>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default OfferDialog;

