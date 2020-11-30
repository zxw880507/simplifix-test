import React, { useContext, useState } from "react";
import { UserCookie } from "../../../hooks/UserCookie";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import { green, grey } from "@material-ui/core/colors";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Grid from "@material-ui/core/Grid";
import NumberFormat from "react-number-format";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  showPrice: {
    marginTop: "1.5em",
    fontSize: "1.5em",
    color: green[400],
  },
  priceText: {
    margin: 0,
    fontSize: "1em",
    color: grey["A700"],
  },
}));

export default function OrderPrice(props) {
  const classes = useStyles();
  const { state, setState } = useContext(UserCookie);
  const { open, setOpen } = props;
  const [hours, setHours] = useState("");
  const final_price = hours * props.order.gig.price;
  const handleChange = (prop) => (event) => {
    setHours(event.target.value);
  };
  
  const onComplete = (order, option) => {
   const id = order.id;
    const updateOrder = { id, status: "completed", ...option};
    const orders = [...state.orders].map((item) => {
      return item.id === id ? {...item, ...updateOrder} : item;
    });
    
   axios
      .patch(`/api/orders/${id}`, updateOrder)
      .then((res) => {
        setState({...state, orders});
      })
      .catch((err) => console.log(err));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitPrice = () => {
    const option = { final_price };
    setOpen(false);
    onComplete(props.order, option);
  };

  return (
    <div>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Fill your working hours</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <OutlinedInput
                autoComplete="false"
                type="number"
                id="outlined-adornment-hours"
                value={hours}
                onChange={handleChange("hours")}
                endAdornment={
                  <InputAdornment position="end">Hour(s)</InputAdornment>
                }
                aria-describedby="outlined-hours-helper-text"
                inputProps={{
                  "aria-label": "hours",
                }}
                labelWidth={0}
              />
              <FormHelperText
                id="outlined-hours-helper-text"
                className={classes.showPrice}
              >
                <Grid container alignItems="center">
                  <AttachMoneyIcon />
                  <NumberFormat
                    value={final_price || ""}
                    displayType={"text"}
                    thousandSeparator={true}
                    renderText={(value) => (
                      <h5 className={classes.priceText}>{value}</h5>
                    )}
                  />
                </Grid>
              </FormHelperText>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmitPrice} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
