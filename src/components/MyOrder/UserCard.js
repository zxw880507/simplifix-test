import React from "react";
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { green, orange } from "@material-ui/core/colors";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
    width: "25em",
    marginTop: "1em",
  },
  infoText: {
    marginLeft: "1em",
  },
  infoContent: {
    transform: "translateX(6em)",
  },
  avatarContent: {
    transform: "translateX(2em)",
  },
  nameTitle: {
    textAlign: "left",
    marginLeft: "1em",
  },
  icon: {
    color: green[400],
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  header: {
    margin: "1em",
    width: "100%",
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: orange[300]
    }
  },
});

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const { user, role } = props;

  return (
    <Card className={classes.root}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
          wrap="nowrap"
          className={`${classes.header} ${classes.avatarContent}`}
        >
          <Avatar alt={role} src={user.avatar_img} />
          <Grid
            container
            direction="column"
            classes={classes.nameTitle}
            style={{ textAlign: "left", marginLeft: "1em" }}
          >
            <ThemeProvider theme={theme}>
            <Typography variant="h6" color="textSecondary" component="p">
              {user.first_name} {user.last_name}
            </Typography>
            <Typography variant="subtitle2" color="primary" component="h2">
              {role}
            </Typography>
            </ThemeProvider>
          </Grid>
        </Grid>
      <CardContent>
        <Grid
          container
          direction="column"
          justify="space-evenly"
          alignItems="center"
          spacing={1}
          wrap="nowrap"
        >
          <Grid
            item
            container
            direction="row"
            xs={12}
            className={classes.infoContent}
          >
            <EmailIcon className={classes.icon} />
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.infoText}
            >
              {user.email}
            </Typography>
          </Grid>
          <Grid
            item
            container
            direction="row"
            xs={12}
            className={classes.infoContent}
          >
            <PhoneIcon className={classes.icon} />
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.infoText}
            >
              {user.phone_number}
            </Typography>
          </Grid>
          <Grid
            item
            container
            direction="row"
            xs={12}
            className={classes.infoContent}
          >
            <HomeIcon className={classes.icon} />
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.infoText}
            >
              {user.city}, {user.province}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
