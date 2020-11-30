import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UserProfile from "./components/user_profile";
import MyOrder from "./components/MyOrder";
import Home from "./components/Home";
import Gigs from "./components/Gigs";
import Chat from "./components/Chat";
import { UserCookie } from "./hooks/UserCookie";
import useAppData from "./hooks/useAppData";
import {
  getGigbyUserId,
  getAllOrdersbyContractorId,
  getAllOrdersbyClientId,
} from "./helpers/dataHelpers";
import SearchResults from "./components/SearchResults";
import IndexBottom from "./components/IndexBottom";
import SuccessPage from "./components/Stripe/SuccessPage";
import FailedPage from "./components/Stripe/FailedPage";
import ScrollToTop from "./components/ScrollToTop";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    // fontFamily: "'Questrial', sans-serif",
  },
}));

export default function App() {
  const classes = useStyles();
  const { cookie, state, setCookie, setState } = useAppData();
  const gigsByUser = getGigbyUserId(cookie, state);
  const ordersByUserAsContractor = getAllOrdersbyContractorId(cookie, state);
  const ordersByUserAsClient = getAllOrdersbyClientId(cookie, state);
 
  const style = {
    marginTop: 65,
  };
  return (
    <div className="App">
      <div className={classes.root}>
        <UserCookie.Provider value={{ cookie, setCookie, state, setState }}>
          <Router>
            <ScrollToTop />
            <Navbar ordersByUser={ordersByUserAsContractor} />
            <Switch>
              <div style={style}>
                <Route exact path="/" component={Home} />
                <Route path="/chat" component={Chat} />
                <Route path="/signin">
                  {cookie.user ? <Redirect to="/" /> : <SignIn />}
                </Route>
                <Route path="/signup">
                  {cookie.user ? <Redirect to="/" /> : <SignUp />}
                </Route>
                <Route path="/logout">
                  <Redirect to="/" />
                </Route>
                <Route path="/gigs" component={Gigs} />
                <Route path="/profile">
                  {cookie.user ? (
                    <UserProfile user={cookie.user} gigs={gigsByUser} />
                  ) : (
                    <Redirect to="/signin" />
                  )}
                </Route>
                <Route path="/myorder">
                  {/* {cookie.user ? (
                <MyOrder user={cookie.user} gigs={gigsByUser} />
              ) : (
                <Redirect to="/signin" />
              )} */}
                  <MyOrder
                    user={cookie.user}
                    ordersReceived={ordersByUserAsContractor}
                    ordersRequest={ordersByUserAsClient}
                  />
                </Route>
                <Route path="/search/:search">
                  <SearchResults />
                </Route>
                <Route path="/checkout/success">
                  <SuccessPage />
                </Route>
                <Route path="/checkout/failed">
                  <FailedPage />
                </Route>
              </div>
            </Switch>
            <IndexBottom />
          </Router>
        </UserCookie.Provider>
      </div>
    </div>
  );
}
