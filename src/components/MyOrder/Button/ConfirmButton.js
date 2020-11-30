import React, { useContext } from "react";
import { UserCookie } from "../../../hooks/UserCookie";
import axios from "axios";
import Fab from "@material-ui/core/Fab";
import BuildIcon from "@material-ui/icons/Build";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {  blue } from "@material-ui/core/colors";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500]
    },
  },
});

export default function ConfirmButton(props) {
  const { state, setState } = useContext(UserCookie);
  const {order} = props;
  const onConfirm = () => {
    const id = order.id;
    const updateOrder = { id, status: "confirmed" };
    const orders = [...state.orders].map((item) => {
      return item.id === updateOrder.id ? {...item, ...updateOrder} : item;
    });
    axios
      .patch(`/api/orders/${id}`, updateOrder)
      .then((res) => {
        setState({ ...state, orders })
      })
      .catch((err) => console.log(err));
  };
  return (
    <ThemeProvider theme={theme}>
      <Fab variant="extended" color="primary" onClick={onConfirm}>
        <BuildIcon style={{ marginRight: "0.3em" }} />
        Confirm
      </Fab>
      </ThemeProvider>
  );
}
