import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    margin: "0 auto",
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    objectFit: "cover",
    width: 200,
    height: 200,
    borderRadius: "50%",
    border: "2px solid black",
  },
}));

export default function Profile(props) {
  const classes = useStyles();
  const {
    first_name,
    last_name,
    email,
    address,
    city,
    province,
    phone_number,
    avatar_img,
    bio,
    education,
  } = props.user;

  return (
    <List className={classes.root}>
      <h1>{`${first_name} ${last_name}`}</h1>
      <img className={classes.avatar} alt="avatar" src={avatar_img} />
      <Divider />
      <li>
        <h2>Location</h2>
        <p>{address}</p>
        <p>{`${city}, ${province}`}</p>
      </li>
      <li>
        <h2>Contact Info</h2>
        <p>Phone: {phone_number}</p>
        <p>Email: {email}</p>
      </li>
      <li>
        <h2>Description</h2>
        <p>{bio}</p>
      </li>
      <li>
        <h2>Education</h2>
        <p>{education}</p>
      </li>
    </List>
  );
}
