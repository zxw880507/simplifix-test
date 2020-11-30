import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { orange, green, blue } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    warning: { main: blue[200] },
    info: { main: blue[600] },
    success: { main: green[200] },
    error: { main: orange[200] },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    margin: "0 auto",
  },
}));

export default function OrderStatus(props) {
  const classes = useStyles();
  const role = props.role === "Client" ? "Contractor" : "Client";
  const status = props.order.status;
  const contractorTitle = {
    pending: "warning",
    confirmed: "info",
    completed: "success",
    paid: "success",
  };
  const clientTitle = {
    pending: "warning",
    confirmed: "info",
    completed: "error",
    paid: "success",
  };
  const clientStatusConversion = {
    pending: "pending",
    confirmed: "confirmed",
    completed: "waiting for payment",
    paid: "completed",
  };
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        {role === "Contractor" && (
          <Alert
            color={contractorTitle[status]}
            severity={contractorTitle[status]}
            variant="filled"
          >
            THIS ORDER IS {status.toUpperCase()}
          </Alert>
        )}
        {role === "Client" && (
          <Alert
            color={clientTitle[status]}
            severity={clientTitle[status]}
            variant="filled"
          >
            THIS ORDER IS {clientStatusConversion[status].toUpperCase()}
          </Alert>
        )}
      </div>
    </ThemeProvider>
  );
}
