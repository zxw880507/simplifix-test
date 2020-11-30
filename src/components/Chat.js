import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { UserCookie } from "../hooks/UserCookie";
import io from "socket.io-client";
import Feed from "./Feed";
import Input from "./Input";
import Conversations from "./Conversations";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import ChatIcon from "@material-ui/icons/Chat";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    background: "#E3E3E3",
    height: "200px",
    marginBottom: "3em",
  },

  main: {
    padding: "2rem",
    width: "70%",
    display: "flex",
    height: "600px",
  },

  conv: {
    width: "40%",
    marginRight: "2rem",
    background: "white",
    borderRadius: "10px",
  },

  chat: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    justifyContent: "flex-end",
    background: "white",
    width: "60%",
    padding: "1rem",
    boxShadow: "0px 2px 5px 0.5px #E3E3E3",
    borderRadius: "8px",
  },

  emptyChat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    background: "white",
    width: "60%",
    padding: "1rem",
    boxShadow: "0px 2px 5px 0.5px #E3E3E3",
    borderRadius: "8px",
  },

  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },

  gigsBtn: {
    backgroundColor: "#0EE290",
    color: "white",
    marginTop: "2rem",
    borderRadius: "8px",
  },
  headerTitle: {
    color: "white",
    padding: "1em 5em",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "50%",
    alignSelf: "center",
  },
}));

let socket;

export default function Chat({ location }) {
  const classes = useStyles();

  const { cookie } = useContext(UserCookie);
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [typing, setTyping] = useState(false);
  const ENDPOINT = process.env.REACT_APP_WEBSOCKET_URL;

  const { conv_id } = queryString.parse(location.search);

  useEffect(() => {
    if (conv_id) {
      axios.get(`/api/messages/${conv_id}`).then((response) => {
        setMessages(response.data);
        setLoadingMessages(false);
      });
    }
  }, [room]);

  useEffect(() => {
    const { conv_id } = queryString.parse(location.search);
    setRoom(conv_id);
    socket = io(ENDPOINT);
    socket.emit("join", { conv_id }, () => {
    });

    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  const sendMessage = (message, event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, { id: cookie.user.id });
    }
  };

  let timeout;
  const userTyping = (key) => {
    if (key === 'Enter') {
      clearTimeout(timeout);
      setTyping(false);
      socket.emit('typing', { typing: false })
    } else {
      socket.emit('typing', { typing: true })
    }
  }

  useEffect(() => {
    socket.on('display', (data) => {
      setTyping(data.data.typing);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setTyping(false)
      }, 2000)
    });
    return clearTimeout(timeout);
  }, [room])


  return cookie.user ? (
    <div className={classes.root}>
      <div className={classes.header}>
        <div
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1503387837-b154d5074bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2689&q=80)",
            width: "100vw",
            height: "15rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h1 className={classes.headerTitle}>Messaging</h1>
        </div>
      </div>

      <div className={classes.main}>
        <div className={classes.conv}>
          <Conversations conv_id={conv_id} userID={cookie.user.id} />
        </div>
        {conv_id ? (
          <div className={classes.chat}>
            <Feed messages={messages} userID={cookie.user.id} typing={typing} loadingMessages={loadingMessages}/>
            <Input sendMessage={sendMessage} userTyping={userTyping}/>
          </div>
        ) : (
          <div className={classes.emptyChat}>
            <h3>
              Select an existing conversation or browse the gigs to find a
              contractor and start chatting!
            </h3>
            <Button
              component={Link}
              to="/gigs"
              type="submit"
              size="medium"
              variant="contained"
              className={classes.gigsBtn}
            >
              Browse Gigs
            </Button>
            <div className={classes.iconContainer}>
              <ChatIcon style={{ fontSize: "20rem", color: "#E3E3E3" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <h1>Whoops! There seems to have been an error.</h1>
  );
}
