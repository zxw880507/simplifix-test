import React, { useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: 140,
    height: 275,
    backgroundImage:
      "url(https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?ixlib=rb-1.2.1&auto=format&fit=crop&w=3450&q=80)",
    backgroundPosition: "center top",
    backgroundSize: "cover",
    transform: "rotate(180deg)",
  },
  infoBox: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "2.5em",
    transform: "rotate(180deg)",
    textAlign: "left",
  },
  headerText: {
    fontFamily: "'Days One', sans-serif",
    color: "white",
  },
  subText: {
    color: "white",
  },
  logo: {
    borderBottom: "3px solid #0EE290",
  },
  search: {
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
    border: "1px solid lightgrey",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.25),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.45),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "45%",
    [theme.breakpoints.up("sm")]: {
      width: "45%",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchButton: {
    justifySelf: "flex-end",
    backgroundColor: "#0EE290",
    color: "white",
    "&:hover": {
      backgroundColor: green[600],
    },
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "50%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PageHeader(props) {
  const classes = useStyles();
  const [searchInput, setSearchInput] = useState("");
  let history = useHistory();

  return (
    <div className={classes.root}>
      <div className={classes.infoBox}>
        <h1 className={classes.headerText}>
          Need it fixed quickly? <b className={classes.logo}>SimpliFix</b> is
          how.
        </h1>
        <h3 className={classes.subText}>
          Hire qualified pros, with the skills to get the job done.
        </h3>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            value={searchInput}
            onInput={(e) => setSearchInput(e.target.value)}
            inputProps={{ "aria-label": "search" }}
          />
          <Button
            variant="contained"
            className={classes.searchButton}
            onClick={() => {
              history.push(`/search/${searchInput}`);
              setSearchInput("");
            }}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
