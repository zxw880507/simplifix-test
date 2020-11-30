import React from "react";
import { Route, Switch } from "react-router-dom";
import GigForm from "./Gigs/GigForm";
import GigsHome from "./GigsHome";
import CategoryPage from "./CategoryPage";

export default function Gigs(props) {
  return (
    <div>
      <Switch>
        <Route exact path="/gigs" component={GigsHome} />
        <Route path="/gigs/new" component={GigForm} />
        <Route path="/gigs/:category" component={CategoryPage} />
      </Switch>
    </div>
  );
}
