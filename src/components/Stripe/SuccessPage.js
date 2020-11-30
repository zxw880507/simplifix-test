import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: 140,
    height: 275,
    backgroundImage:
      "url(https://images.unsplash.com/photo-1504417900752-5e508cb87268?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80)",
    backgroundPosition: "center top",
    backgroundSize: "cover",
    transform: "rotate(180deg)",
  },
  infoBox: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "2.5em",
    transform: "rotate(180deg)",
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
  let history = useHistory();

  return (
    <div className={classes.root}>
      <div className={classes.infoBox}>
        <h1 className={classes.headerText}>
          <b>Payment Successful!</b>
        </h1>
        <h2 className={classes.subText}>
          Thanks for using <b className={classes.logo}>SimpliFix</b>
        </h2>
        <br></br>
        <h3 className={classes.subText}>Please rate your transaction</h3>
        <Rating
          name="size-large"
          defaultValue={0}
          size="large"
          onClick={() => {
            history.push(`/myorder`);
          }}
        />
      </div>
    </div>
  );
}
