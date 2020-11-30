import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import EventIcon from "@material-ui/icons/Event";

const useStyles = makeStyles((theme) => ({
  text: {
    color: "#212121",
    fontFamily: "'Days One', sans-serif",
  },

  icon: {
    fontSize: "4rem",
    marginTop: "2rem",
    marginBottom: "1rem",
  },

  styles: {
    width: "100vw",
    height: "500px",
    marginTop: "3rem",
    paddingTop: "3rem",
    backgroundColor: "rgba(14, 226, 144, 0.2)",
    borderTop: "40px solid white",
    bottom: 1,
  },
}));

export default function IndexBottom() {
  const classes = useStyles();

  return (
    <div className={classes.styles}>
      <h2 className={classes.text}>Why SimpliFix</h2>
      <AccessAlarmIcon className={classes.icon} />
      <h4>
        Right at your fingertips, you can find trusted service providers in
        minutes
      </h4>
      <EventIcon className={classes.icon} />
      <h4>A single platform to streamline communication and scheduling</h4>
    </div>
  );
}
