import React, { useState, useEffect, useContext } from "react";
import {UserCookie} from "../../hooks/UserCookie";
import { loadStripe } from "@stripe/stripe-js";
import Fab from "@material-ui/core/Fab";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { yellow } from "@material-ui/core/colors";
import axios from "axios";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: yellow["A700"],
    },
  },
});

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51Hm2BTIXKvKnuzRhcHoz5p3sr4VK0ieZwrbWQzaf7bQ4vO9cXfwuvbu4s2aN7G1xhnBpUHopkvwRbvLnacYuTuyO00boufvjcz"
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);
export default function Stripe(props) {
  const order = props.order;
  const {state, setState} = useContext(UserCookie);
  const [message, setMessage] = useState("");
  const updateOrder = (order, state) => {
    return [...state.orders].map((item) => {
      return item.id === order.id ? {...item, ...order} : item;
    });
  }

  const ProductDisplay = ({ handleClick }) => (
    <section>
      {order.status !== "paid" && (
        <ThemeProvider theme={theme}>
          <Fab
            variant="extended"
            color="primary"
            id="checkout-button"
            disabled={order.status !== "completed"}
            role="link"
            onClick={handleClick}
          >
            <MonetizationOnIcon style={{ marginRight: "0.3em" }} />
            {order.status === "completed"
              ? `Pay $${order.final_price}`
              : `Payment`}
          </Fab>
        </ThemeProvider>
      )}
    </section>
  );

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }
    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  const handleClick = async (event) => {
    const newOrder = { ...order, status: "paid" };
    const stripe = await stripePromise;
    const response = await fetch("/create-session", {
      method: "POST",
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8",
      }),
      // PASS ORDER DATA HERE
      body: JSON.stringify({ ...order }),
    });
    const session = await response.json();
    
    const patchOrderUpdates = await axios.patch(`/api/orders/${order.id}`, newOrder);

    if (patchOrderUpdates.error) {
      console.log(patchOrderUpdates.error);
    }

    
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    const orders = await updateOrder(newOrder, state);
    await setState({...state, orders});
    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
    
  };

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay handleClick={handleClick} />
  );
}
