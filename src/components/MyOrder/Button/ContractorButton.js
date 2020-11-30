import React from "react";
import CompleteButton from "./CompleteButton";
import ConfirmButton from "./ConfirmButton";

export default function ContractorButton(props) {
  
  const {order} = props;
 return <>
 {order.status === "pending" && <ConfirmButton order={order}/>}
 {order.status === "confirmed" && <CompleteButton order={order}/>}
 </>
}
