import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 900,
    // margin: '0rem 2rem 2rem 1rem',
    height: "auto",
    position: "relative",
  },

  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
    fontSize: "20px",
    borderBottom: "3px solid #0EE290",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "10px 50px",
  },
});

export default function CategoryCard(props) {
  const classes = useStyles();
  const link = `/gigs/${props.name}`;

  return (
    <Link to={link}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            id={props.id}
            component="img"
            alt={props.name}
            height="300"
            image={props.avatar}
          />
          <Typography className={classes.overlay}>{props.name}</Typography>
        </CardActionArea>
      </Card>
    </Link>
  );
}
