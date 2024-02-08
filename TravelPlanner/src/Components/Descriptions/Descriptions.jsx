import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function Descriptions() {
    const [destinations, setDestinations] = useState([]); 
    const {id} = useParams();

    //fetch data from the server when the page starts running and set it in the state destination
    useEffect(() => {
      axios
        .get(`http://localhost:3001/destinations/${id}`)
        .then((response) => setDestinations(response.data))
        .catch((error) => console.log("Error fetching data:", error));
    }, []);

  
    return (
    <div>
      <h1>Description</h1>
      
          <p>{destinations.description}</p>
    </div>
  )
}

export default Descriptions

