import React, {useState, useContext} from "react";
import DatePicker from "./DatePicker";
import BookingDetails from "./BookingDetails";
import {UserCookie} from '../../hooks/UserCookie';
import axios from "axios";

export default function Booking(props) {
  const {state, setState, cookie} = useContext(UserCookie);
  const [selectedDate, setSelectedDate] = useState(null);
  

  const bookingGig = () => {
    
    const order = {
      gig_id: props.gig.id,
      client_id: cookie.user.id,
      rating: null,
      review: null,
      status: "pending",
      order_date: selectedDate,
      finished_date: null,
      final_price: null
    }
   
    props.transition("PENDING");
    axios.put('/api/orders', order)
    .then(res => {
      props.transition("SUCCESS");
      const orders = [...state.orders, res.data];
      setState(prev => ({
        ...prev, orders
      }));
      
    });
  };
  return (
    <>
      <BookingDetails gig={props.gig} selectedDate={selectedDate} setSelectedDate={setSelectedDate} onclick={bookingGig}/>
      <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
    </>
  );
}
