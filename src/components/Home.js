import React from "react";
import Categories from "./Categories";
import { makeStyles } from "@material-ui/core/styles";
import PageHeader from "./PageHeader";
import TopGigs from "./TopGigs";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PageHeader />
      <Categories />
      <TopGigs />
    </div>
  );
}
