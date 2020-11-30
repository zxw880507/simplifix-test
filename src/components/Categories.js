import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useApplicationData } from "../hooks/useApplicationData";
import Grid from "@material-ui/core/Grid";
import PopularHeading from "./PopularHeading";
import Carousel from "./Carousel";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },

  card: {
    marginTop: 20,
    marginBottom: 20,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    "&:hover": {
      cursor: "pointer",
    },
  },
  title: {
    color: "white",
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  categoriesTitle: {
    width: "100%",
    borderBottom: "8px solid #66bb6a",
  },

  // title: {
  //   margin: "2rem 0rem 2rem 0rem",
  // },
}));

export default function Categories() {
  const classes = useStyles();
  const { categories } = useApplicationData();

  return (
    <div>
      <PopularHeading />
      <Grid container className={classes.card}>
        <Carousel categories={categories} />
      </Grid>
    </div>
  );
}
