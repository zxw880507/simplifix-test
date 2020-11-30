import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SchoolIcon from "@material-ui/icons/School";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "8px",
    boxShadow: "0px 2px 5px 0.5px #E3E3E3",
    margin: "1rem",
    marginBottom: "6em",
    padding: "0.5rem 1.5rem 1.5rem 1.5rem",
  },

  card: {
    textAlign: "left",
    margin: "0.5rem 0rem 0.5rem 0rem",
  },

  education: {
    display: "flex",
    alignItems: "center",
  },

  eduItem: {
    margin: "0rem 1rem 0rem 0rem",
  },
}));

export default function GigDetails(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1
        style={{
          margin: "0.5rem",
          borderBottom: "2px solid #0EE290",
          padding: "0.5rem",
        }}
      >
        Gig Details
      </h1>
      <div className={classes.card}>
        <h4>Job description</h4>
        <p>{props.description}</p>
      </div>
      <div className={classes.card}>
        <h4>About Me</h4>
        <p>{props.bio}</p>
      </div>
      <div className={classes.card}>
        <h4>Education</h4>
        <div className={classes.education}>
          <SchoolIcon className={classes.eduItem} />
          <p className={classes.eduItem}>{props.education}</p>
        </div>
      </div>
      <div className={classes.card}>
        <h4>Recent Jobs</h4>
        <p>
          This is going to be some other text. I am just writing this to see how
          it looks on the page.
        </p>
      </div>
    </div>
  );
}
