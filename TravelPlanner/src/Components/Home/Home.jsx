import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [destinations, setDestinations] = useState([]); 

    //fetch data from the server when the page starts running and set it in the state destination
    useEffect(() => {
      axios
        .get("http://localhost:3001/destinations")
        .then((response) => setDestinations(response.data))
        .catch((error) => console.log("Error fetching data:", error));
    }, []);

  return (
    <>
    <h1>Destinations</h1>
    <ul>
      {destinations.map((destination) => (
        <li key={destination._id}>
            <Link to={`/descriptions/${destination._id}`}>
          <p>{destination.name}</p>
          </Link>
        </li>
      ))}
    </ul>
  </>
  )
}

export default Home;
    
