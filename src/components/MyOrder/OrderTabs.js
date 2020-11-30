import React, { useState, useContext } from "react";
import { UserCookie } from "../../hooks/UserCookie";
import { getUserById } from "../../helpers/dataHelpers";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { ThemeProvider } from "@material-ui/styles";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import OrderReceived from "./OrderReceived";
import OrderRequest from "./OrderRequest";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 900,
    margin: "5em auto 1em",
  },
}));

export default function OrderTabs(props) {
  const { state } = useContext(UserCookie);
  const classes = useStyles();

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#4caf50",
      },
      secondary: {
        light: "#0066ff",
        main: "#0044ff",
        contrastText: "#ffcc00",
      },
      bg: {
        main: "#d4d4d46e",
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
  });
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="static" color="bg">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Order Requests" {...a11yProps(0)} />
            <Tab label="Orders Received" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <OrderRequest
              users={state.users}
              ordersRequest={props.ordersRequest}
              getUserById={getUserById}
            />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <OrderReceived
              users={state.users}
              ordersReceived={props.ordersReceived}
              getUserById={getUserById}
            />
          </TabPanel>
        </SwipeableViews>
      </div>
    </ThemeProvider>
  );
}
