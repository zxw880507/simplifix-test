import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import axios from "axios";
import { UserCookie } from "../../hooks/UserCookie";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: 20,
    flexDirection: "column",
    alignItems: "center",
  },

  categoryList: {
    marginTop: "2rem",
    backgroundColor: "#EFEFEF",
    width: "40%",
  },

  listContainer: {
    display: "flex",
    justifyContent: "center",
  },

  formContainer: {
    borderRadius: "8px",
    width: "70%",
    paddingTop: "3rem",
    paddingBottom: "1rem",
    padding: "2rem",
    boxShadow: "1px 2px 2px 2px lightgrey",
  },

  field: {
    margin: "1.5rem",
  },

  title: {
    display: "flex",
  },

  submitBtn: {
    backgroundColor: "#0EE290",
    color: "white",
    marginTop: "2rem",
  },

  moneyInput: {
    marginTop: "2rem",
    width: "40%",
  },
  headerTitle: {
    color: "white",
    padding: "1em 5em",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "50%",
    alignSelf: "center",
  },
}));

export default function GigForm(props) {
  const classes = useStyles();
  const { cookie, state, setState } = useContext(UserCookie);
  const [categories, setCategories] = useState([]);
  const [categoriesNames, setCategoriesNames] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [postSuccessful, setPostSuccessful] = useState(false);
  const [gigId, setGigId] = useState(0);
  const [gig, setGig] = useState({
    userId: 0,
    title: "",
    category: 0,
    rate: 0,
    description: "",
    photo1: "",
    categoryName: "",
  });

  const getCategories = () => {
    axios.get("/api/categories").then((res) => {
      const categoryNameArray = res.data.map((cat) => cat.name);
      categoryNameArray.unshift("Select a category");
      setCategories(res.data);
      setCategoriesNames(categoryNameArray);
    });
  };

  const postGig = () => {
    return axios.put("/api/gigs/", gig).then((res) => {
      setGigId(res.data.id);
      setPostSuccessful(true);
      const gigs = [...state.gigs, res.data];
      setState({...state, gigs});
    });
  };
  if (postSuccessful) {
    return <Redirect to={`/gigs/${gig.categoryName}/${gigId}`} />;
  }

  const handleClickListItem = (event) => {
    getCategories();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setGig({
      ...gig,
      category: categories[index - 1].id,
      categoryName: categories[index - 1].name,
    });
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container className={classes.root}>
      <div
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1532511332889-6db654bf6529?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2253&q=80)",
          width: "100vw",
          height: "13rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className={classes.headerTitle}>
          Get paid for your valuable skills
        </h1>
      </div>
      <h1 style={{ borderBottom: "2px solid #0EE290", width: "40%" }}>
        Create a New Gig
      </h1>
      <Grid item xs={12} className={classes.formContainer}>
        <form
          autoComplete="off"
          onSubmit={(event) => {
            event.preventDefault();
            postGig();
          }}
        >
          <TextField
            required
            label="Title"
            type="text"
            placeholder="Title"
            variant="outlined"
            fullWidth
            onInput={(e) =>
              setGig({
                ...gig,
                title: e.target.value,
                userId: cookie.user.id,
              })
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div className={classes.listContainer}>
            <div className={classes.categoryList}>
              <List component="nav" aria-label="Device settings">
                <ListItem
                  button
                  aria-haspopup="true"
                  aria-controls="lock-menu"
                  aria-label="Choose a Category"
                  onClick={handleClickListItem}
                >
                  <ListItemText
                    primary="Select category"
                    secondary={categoriesNames[selectedIndex]}
                  />
                </ListItem>
              </List>
              <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {categoriesNames.map((option, index) => (
                  <MenuItem
                    key={option}
                    disabled={index === 0}
                    selected={index === selectedIndex}
                    onClick={(event) => handleMenuItemClick(event, index)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </div>
          <FormControl className={classes.moneyInput} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">
              Hourly Rate
            </InputLabel>
            <OutlinedInput
              required
              id="outlined-adornment-amount"
              type="number"
              value={gig.amount}
              onInput={(e) =>
                setGig({
                  ...gig,
                  rate: e.target.value,
                })
              }
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              labelWidth={85}
            />
          </FormControl>
          <br />
          <br />
          <div className={classes.title}>
            <h3>Description</h3>
          </div>
          <TextField
            id="outlined-multiline-static"
            label="Share some details about the service you're providing"
            multiline
            rows={4}
            variant="outlined"
            onInput={(e) =>
              setGig({
                ...gig,
                description: e.target.value,
              })
            }
            fullWidth
          />
          <br />
          <br />
          <div>
            <h3>Portfolio Photos</h3>
            <TextField
              id="outlined-multiline-static"
              label="Image URL"
              multiline
              rows={1}
              variant="outlined"
              onInput={(e) =>
                setGig({
                  ...gig,
                  photo1: e.target.value,
                })
              }
              fullWidth
            />
            {/* <Button
              component="label"
              className={classes.photoBtn}
              variant="outlined"
              onInput={(e) =>
                setGig({
                  ...gig,
                  photo1: e.target.value,
                })
              }
            >
              Upload
              <input
                type="file"
                multiple
                accept="image/*"
                style={{ display: "none" }}
              />
            </Button> */}
          </div>
          <Button
            type="submit"
            className={classes.submitBtn}
            size="large"
            variant="contained"
          >
            Submit
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}
