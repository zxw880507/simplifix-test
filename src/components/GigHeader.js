import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    width: "100vw",
    height: "200px",
    backgroundColor: "#EFEFEF",
  },

  infoContainer: {
    color: "white",
    padding: "1em 5em",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    flexDirection: "column",
  },

  infoBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

export default function GigHeader(props) {
  const classes = useStyles();
  return (
    <div
      className={classes.root}
      style={{
        backgroundImage: `url(${props.image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={classes.infoContainer}>
        <h1>{props.title}</h1>
        <p>
          {props.first} {props.last}
        </p>
        <div className={classes.infoBottom}>
          <Rating name="read-only" value={45} readOnly />
          <p>${props.price}/hr</p>
        </div>
      </div>
    </div>
  );
}
