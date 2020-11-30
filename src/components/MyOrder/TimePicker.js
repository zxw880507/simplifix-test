import React, { useState } from "react";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { dateBooked } from "../../helpers/dataHelpers";

export default function TimePicker(props) {
 
  const orderDate = new Date(props.orderDate);
  const [selectedDate, handleDateChange] = useState(orderDate);
  const disabledDate = props.disabledDate;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDateTimePicker
       disabled={props.status === "completed"}
        shouldDisableDate={(date) => dateBooked(date, disabledDate)}
        value={selectedDate}
        onChange={handleDateChange}
        label="Confirm Schedule"
        onError={console.log}
        minDate={new Date("2018-01-01T00:00")}
        format="yyyy/MM/dd hh:mm a"
      />
    </MuiPickersUtilsProvider>
  );
}
