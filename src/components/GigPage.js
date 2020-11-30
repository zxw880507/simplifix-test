import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import GigHeader from "./GigHeader";
import GigDetails from "./GigDetails";
import Grid from "@material-ui/core/Grid";
import GoogleMap from "./GoogleMap";
import ContactCard from "./ContactCard";
import Booking from "./Order/Booking";
import { makeStyles } from "@material-ui/core/styles";
import { START } from "../helpers/mode";
import UseBookingMode from "../hooks/UseBookingMode";
import PlaceHolder from "./Order/PlaceHolder";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: "1rem",
  },

  card: {
    borderRadius: "8px",
    boxShadow: "0px 2px 5px 0.5px #E3E3E3",
  },
  map: {
    maxWidth: 250,
    maxHeight: 300,
    backgroundColor: "blue",
  },
}));

export default function GigPage() {
  const classes = useStyles();

  const [gig, setGig] = useState({});
  const [contractor, setContractor] = useState({});
  const [coords, setCoords] = useState({});

  const params = useParams();
  const { mode, transition, back } = UseBookingMode(START);

  const getCoords = (address) => {
    const splitAddy = address.split(" ");
    let searchString = splitAddy.join("+");
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${searchString}&key=${process.env.REACT_APP_GOOGLE_API}`
      )
      .then((res) => {
        return setCoords(res.data.results[0].geometry.location);
      });
  };

  useEffect(() => {
    axios
      .get(`/api/gigs/${params.gig_id}`)
      .then((response) => {
        setGig(response.data[0]);
        const id = response.data[0].contractor_id;
        return axios(`/api/users/${id}`);
      })
      .then((response) => {
        setContractor(response.data[0]);
        const userAddy = `${response.data[0].address}, ${response.data[0].city}, ${response.data[0].province}`;
        getCoords(userAddy);
      });
  }, []);

  return (
    <div>
      <GigHeader
        first={contractor.first_name}
        last={contractor.last_name}
        title={gig.title}
        price={gig.price}
        image={gig.photo_one}
      />
      {mode === "START" && (
        <div className={classes.root}>
          <Grid container spacing={3} justify="center" className={classes.root}>
            <Grid item sm={8}>
              <GigDetails
                bio={contractor.bio}
                education={contractor.education}
                description={gig.description}
              />
            </Grid>
            <Grid container item sm={3} direction={"column"}>
              <Grid item>
                <ContactCard
                  city={contractor.city}
                  phone={contractor.phone_number}
                  email={contractor.email}
                  first_name={contractor.first_name}
                  last_name={contractor.last_name}
                  contractor_id={contractor.id}
                  gig_id={gig.id}
                  onBooking={() => transition("SELECT")}
                />
              </Grid>
              <Grid item>
                <GoogleMap coords={coords} title={gig.title} />
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
      {mode === "SELECT" && (
        <Booking
          transition={transition}
          back={back}
          gig={gig}
          contractor={contractor}
        />
      )}
      {(mode === "PENDING" || mode === "SUCCESS") && (
        <PlaceHolder gig={gig} contractor={contractor} mode={mode} />
      )}
    </div>
  );
}
