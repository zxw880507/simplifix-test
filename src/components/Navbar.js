import React, { useContext, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { green } from "@material-ui/core/colors";
import { Link } from "react-router-dom";
import { UserCookie } from "../hooks/UserCookie";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "white",
    border: 0,
    boxShadow: "0 3px 5px 2px grey",
    color: "black",
    padding: "0 30px",
    position: "fixed",
    top: 0,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontFamily: "'Days One', sans-serif",
    alignSelf: "center",
    color: "#000000",
    display: "none",
    margin: "0 .5em",
    textDecoration: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    border: "1px solid lightgrey",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
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
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  iconButton: {
    display: "flex",
    alignItems: "center",
  },
  fontIcon: {
    padding: "12px",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
}));

export default function Navbar(props) {
  const { cookie, setCookie } = useContext(UserCookie);
  const ordersNotPaid =
    props.ordersByUser &&
    props.ordersByUser.filter((order) => order.status !== "paid");

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [searchInput, setSearchInput] = useState("");

  let history = useHistory();

  const logout = () => {
    return axios.post("/logout").then((res) => {
      setCookie(res.data)
    });
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to="/profile" className={classes.title}>
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Link>
      <Link to="/myorder" className={classes.title}>
        <MenuItem onClick={handleMenuClose}>My Orders</MenuItem>
      </Link>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {cookie.user ? (
        <>
          <MenuItem>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={0} color="secondary">
                <Link to="/chat">
                  <MailIcon />
                </Link>
              </Badge>
            </IconButton>
            <p>Messages</p>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="show new notifications" color="inherit">
              <Badge badgeContent={ordersNotPaid.length} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <p>Notifications</p>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>

          <Link
            to="/gigs/new"
            className={classes.title}
            style={{ margin: "0" }}
          >
            <MenuItem className={classes.iconButton}>
              <AddCircleIcon className={classes.fontIcon} />
              <p>Gig</p>
            </MenuItem>
          </Link>
          <Link
            to="/logout"
            className={classes.title}
            onClick={logout}
            style={{ margin: "0" }}
          >
            <MenuItem className={classes.iconButton}>
              <ExitToAppIcon className={classes.fontIcon} />
              <p>Logout</p>
            </MenuItem>
          </Link>
        </>
      ) : (
        <>
          <Link to="/signin" className={classes.title} style={{ margin: "0" }}>
            <MenuItem
              className={classes.iconButton}
              style={{ paddingRight: "32px" }}
            >
              <LockOpenIcon className={classes.fontIcon} />
              <p>Login</p>
            </MenuItem>
          </Link>

          <Link to="/signup" className={classes.title} style={{ margin: "0" }}>
            <MenuItem
              className={classes.iconButton}
              style={{ paddingRight: "32px" }}
            >
              <PersonAddIcon className={classes.fontIcon} />
              <p>Join</p>
            </MenuItem>
          </Link>
        </>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
          <Link to="/" className={classes.title}>
            <Typography className={classes.title} variant="h4" noWrap>
              <b>SimpliFix</b>
            </Typography>
          </Link>
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
          <div className={classes.grow} />
          {/* Below it is the desktop view */}
          <div className={classes.sectionDesktop}>
            {cookie.user ? (
              <>
                <Typography variant="body1" component="span">
                  <p>Welcome, {cookie.user.first_name}</p>
                </Typography>
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={0} color="secondary">
                    <Link to="/chat" className={classes.link}>
                      <MailIcon />
                    </Link>
                  </Badge>
                </IconButton>
                <IconButton aria-label="show new notifications" color="inherit">
                  <Badge badgeContent={ordersNotPaid.length} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Link to="/logout" className={classes.title} onClick={logout}>
                  <Button variant="contained">Log Out</Button>
                </Link>
                <Link to="/gigs/new" className={classes.title}>
                  <Button variant="contained">+ Gig</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/signin" className={classes.title}>
                  <Button variant="contained">Sign In</Button>
                </Link>
                <Link to="/signup" className={classes.title}>
                  <Button variant="contained">Join</Button>
                </Link>
              </>
            )}
          </div>
          {/* Below it is the mobile view */}
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
