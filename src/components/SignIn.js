import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { green } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {UserCookie} from "../hooks/UserCookie";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "2rem",
  },

  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: "8px",
    padding: '2rem',
    margin: '2rem',
    boxShadow: "1px 2px 2px 2px lightgrey",
  },

  field: {
    marginTop: '1.5rem',
    marginBottom: '1.5rem'
  },

  submitBtn: {
    backgroundColor: green[400],
    color: "white",
    marginTop: "2rem",
  },
}));


export default function SignIn() {
  const {setCookie} = useContext(UserCookie);
  const classes = useStyles();

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const handleChange = (prop) => (event) => {
    setUser({...user, [prop]: event.target.value})
  }  

  const loginUser = (user) => {
    return axios.post('/login', user).then(res => {
      setCookie(prev => ({...prev, ...res.data}))
    }).catch(err => console.log(err))
  }

  return (
    <Grid container className={classes.root}>
      <h1 style={{ borderBottom: "2px solid #43a047", width: "20%" }}>
        Sign In
      </h1>
      <Grid item className={classes.formContainer}>
        <form
          autoComplete="off"
          onSubmit={(event) => {
            event.preventDefault();
            loginUser(user);
          }}
        >
          <TextField
            className={classes.field}
            fullWidth
            required
            label="Email"
            type="text"
            placeholder="Email"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={user.email}
            onChange={handleChange('email')}
          />
          <TextField
            className={classes.field}
            fullWidth
            required
            label="Password"
            type="password"
            placeholder="Password"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={user.password}
            onChange={handleChange('password')}
          />
          <Button
            type="submit"
            className={classes.submitBtn}
            size="large"
            variant="contained"
          >
            Sign In
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}