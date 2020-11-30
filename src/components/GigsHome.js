import React, { useEffect, useState } from 'react';
import Categories from './Categories';
import GigGrid from "./Gigs/GigGrid";
import axios from 'axios';

export default function GigsHome() {

  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    axios.get('/api/gigs')
    .then(response => {
      setGigs(response.data)
    })
  },[])

  return(
    <div>
      <Categories />
      <h1>Browse Gigs</h1>
      <GigGrid gigs={gigs}/>
    </div>
  )
}