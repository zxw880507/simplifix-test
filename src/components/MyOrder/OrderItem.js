import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CardHeader from "@material-ui/core/CardHeader";
import TimePicker from "./TimePicker";
import UserCard from "./UserCard";
// import ClientButton from "./Button/ClientButton";
import ContractorButton from "./Button/ContractorButton";
import Status from "./Status";
import Stripe from "../Stripe/Stripe";

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: "box-content",
    flexGrow: 1,
    marginBottom: "1em",
  },
  paper: {
    paddingBottom: theme.spacing(2),
    margin: "auto",
    maxWidth: 900,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    width: "10em",
    height: "10em",
    borderRadius: "5em",
  },
}));

export default function OrderItem(props) {
  const classes = useStyles();
  const { order, otherOrders } = props;
  const orderDate = order.order_date;
  const disabledDate = otherOrders.map((order) => new Date(order.order_date));

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Status order={order} role={props.role} />
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          style={{ padding: "2em", paddingTop: 0 }}
        >
          <Grid item xs={3} justify="center">
            <img
              className={classes.img}
              alt="complex"
              src={order.gig.photo_one}
            />
          </Grid>
          <Grid item container direction="column" xs={7} alignItems="center">
            <CardHeader title={order.gig.title} />
            <TimePicker
              orderDate={orderDate}
              disabledDate={disabledDate}
              status={order.status}
            />
            <UserCard user={props.user} role={props.role} />
          </Grid>
          <Grid item xs={2} container direction="column" justify="center">
            {props.role !== "Client" && <Stripe order={order} />}
            {props.role !== "Contractor" && <ContractorButton order={order} />}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
