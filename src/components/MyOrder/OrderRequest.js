import React from 'react';
import OrderItem from "./OrderItem";

export default function OrderRequest(props) {
  const role = "Contractor";
  const getUserById = props.getUserById;
  return (
    <>
      {props.ordersRequest &&
        props.ordersRequest.map((order) => {
          const user = getUserById(order.gig.contractor_id, props.users);
          const otherOrders = props.ordersRequest.filter(list => list.id !== order.id);
          return <OrderItem user={user} order={order} otherOrders={otherOrders} role={role} />;
        })}
    </>
  );
}