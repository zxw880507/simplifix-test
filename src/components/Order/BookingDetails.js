import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import {getDateFormat,getDayFormat} from "../../helpers/dataHelpers";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    margin: "3em auto",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  column: {
    flexBasis: "33.33%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default function BookingDetails(props) {
  
  const classes = useStyles();
  

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              Selected Date
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              Selected Time
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              {props.gig.title.toUpperCase()}
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.column}>
            {props.selectedDate && (
              <Chip label={getDateFormat(props.selectedDate)} />
            )}
          </div>
          <div className={classes.column}>
            {props.selectedDate && (
              <Chip label={getDayFormat(props.selectedDate)} />
            )}
          </div>
          <div className={clsx(classes.column, classes.helper)}>
            <Typography variant="caption">
              {props.gig.description}
              <br />
            ${props.gig.price}/hr
            </Typography>
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small" onClick={() => props.setSelectedDate(null)}>
            Reset
          </Button>
          <Button size="small" color="primary" onClick={props.onclick} disabled={!props.selectedDate}>
            Confirm
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}
