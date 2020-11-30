import React from "react";
import OrderItem from "./OrderItem";

export default function OrderReceived(props) {
  const role = "Client";
  const getUserById = props.getUserById;
  return (
    <>
      {props.ordersReceived &&
        props.ordersReceived.map((order) => {
          const user = getUserById(order.client_id, props.users);
          const otherOrders = props.ordersReceived.filter(list => list.id !== order.id);
          return <OrderItem key={order.id} user={user} order={order} otherOrders={otherOrders} role={role}/>;
        })}
    </>
  );
}
