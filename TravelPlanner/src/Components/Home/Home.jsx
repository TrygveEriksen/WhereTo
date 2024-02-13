import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../../API/API";
import Navbar from "../Navbar/Navbar";


function Home() {
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setLoading] = useState(true);

  //fetch data from the server when the page starts running and set it in the state destination
  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const destRes = await API.get("/destinations");
    if (destRes) {
      setDestinations(destRes.data);
      return setLoading(false);
    }
  };


  return (
    <>
      <Navbar />
      <h1>Destinations</h1>
      {isLoading && <h3>Loading...</h3>}
      
      <ul>
        {destinations.map((destination) => (
          <li key={destination._id}>
            <Link to={`/descriptions/${destination._id}`}>
              <p>{destination.place}, {destination.country}</p>
            </Link>
          </li>
        ))}
      </ul>
      
    </>
  );
}

export default Home;
