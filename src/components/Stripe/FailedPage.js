import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: 140,
    height: 275,
    backgroundImage:
      "url(https://images.unsplash.com/photo-1523632112228-9fd460d29981?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80)",
    backgroundPosition: "center top",
    backgroundSize: "cover",
  },
  infoBox: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "2.5em",
    textAlign: "center",
  },
  headerText: {
    color: "white",
  },
  subText: {
    color: "white",
  },
  logo: {
    fontFamily: "'Days One', sans-serif",
    borderBottom: "3px solid #0EE290",
  },
}));

export default function SuccessPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.infoBox}>
        <h1 className={classes.headerText}>
          <b>Payment wasn't processed!</b>
        </h1>
        <h2 className={classes.subText}>Please try again</h2>
      </div>
    </div>
  );
}
