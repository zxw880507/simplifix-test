import React from "react";
import GigItemList from "./gigItemList";
import { Divider } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  new: {
    backgroundColor: "#66bb6a",
    color: "white",
  },
});


export default function GigItem(props) {

  const classes = useStyles();
  return (
    <>
      <h1>My Gigs</h1>
      <Divider style={{ width: "90%", margin: "0 auto" }} />
      {props.gigs.map(gig => {
        return <GigItemList gig={gig}/>;
      })}
      <Link to="/gigs/new">
        <Fab aria-label="add" className={classes.new}>
          <AddIcon />
        </Fab>
      </Link>
    </>
  );
}
