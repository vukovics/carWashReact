import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function OfferForm({ selectedOffer, onSubmitRequesrt }) {

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      maxWidth: 400,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2),
    },
  }));


  const changeHandler = event => {
    console.log(event);
    // setLoginForm({
    //   ...loginForm,
    //   [event.target.name]: event.target.value,
    // });
  };

  const submitHandler = event => {
    console.log(event);
  };

  const classes = useStyles();


  const OfferForm = () => {
    return (
      selectedOffer ?
      <form className={classes.container} noValidate autoComplete="off">
            <TextField
              className={classes.textField}
              label="email"
              margin="normal"
              name="email"
              onChange={changeHandler}
            />
            <TextField
              className={classes.textField}
              label="password"
              margin="normal"
              name="password"
              type="password"
              onChange={changeHandler}
            />
            <Button
              variant="contained"
              onClick={submitHandler}
              color="primary"
              className={classes.button}
            >
              Login
            </Button>
          </form>:
          ''
    )
  };

  return (
     <OfferForm></OfferForm>
  )
}

export default OfferForm;
