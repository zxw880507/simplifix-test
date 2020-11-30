import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '2rem 0rem 2rem 0rem'
  }
}));

export default function PopularHeading() {

  const classes = useStyles();

  return(
    <h1 className={classes.root}>Popular Categories</h1>
  )
}