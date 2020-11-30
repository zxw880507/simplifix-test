import { useState } from "react";
export default function UseBookingMode(initial) {
  const [mode, setMode] = useState(initial);
  const [location, setLocation] = useState([initial]);
  const transition = (value, replace = false) => {
    setLocation(prev => {
      const newLocation = [...prev];
      replace ? newLocation[newLocation.length - 1] = value : newLocation.push(value);
      return newLocation;
    });
    setMode(value);
  }
  const back = () => {
    const newLocation = location.length > 1 ? location.slice(0, location.length - 1) : location;
    setLocation(newLocation);
    setMode(newLocation[newLocation.length - 1]);
  };
  return {mode, transition, back};
}
