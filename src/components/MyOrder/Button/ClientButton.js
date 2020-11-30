import React from "react";
import Fab from "@material-ui/core/Fab";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { yellow } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: yellow["A700"],
    },
  },
});

export default function ClientButton(props) {
  return (
    <ThemeProvider theme={theme}>
      <Fab
        variant="extended"
        color="primary"
        disabled={props.order.status !== "completed"}
      >
        <MonetizationOnIcon style={{ marginRight: "0.3em" }} />
        Payment
      </Fab>
    </ThemeProvider>
  );
}
