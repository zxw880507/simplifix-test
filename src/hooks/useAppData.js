import { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import { dispatch } from "../helpers/dataHelpers";

export default function useAppData() {
  const [cookie, setCookie] = useState(() => {
    const stickyCookie = window.localStorage.getItem("cookie");
    return stickyCookie.user ? JSON.parse(stickyCookie) : { user: null };
  });
  const [state, setState] = useState({
    gigs: [],
    categories: [],
    orders: [],
    users: [],
  });
  

  useEffect(() => {
    axios.get("/login").then((res) => {
      setCookie({ ...res.data });
    });

    const promise1 = axios.get("/api/gigs").then((res) => res.data);
    const promise2 = axios.get("/api/categories").then((res) => res.data);
    const promise3 = axios.get("/api/orders").then((res) => res.data);
    const promise4 = axios.get("/api/users").then((res) => res.data);
    Promise.all([promise1, promise2, promise3, promise4]).then((res) => {
      setState((prev) => ({
        ...prev,
        gigs: res[0],
        categories: res[1],
        orders: res[2],
        users: res[3],
      }));
    });
  }, []);

  useEffect(() => {
    const orderSocket = io(process.env.REACT_APP_WEBSOCKET_URL, {
      path: "/update",
    });

    orderSocket.on("update", (res) => {
      const message = JSON.parse(res);
      dispatch(message, state, setState);
    });

    return () => orderSocket.disconnect();
  }, [state]);

  return { cookie, setCookie, state, setState };
}
