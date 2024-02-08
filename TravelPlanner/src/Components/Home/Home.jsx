import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [destinations, setDestinations] = useState([]);

  //fetch data from the server when the page starts running and set it in the state destination
  const navigate = useNavigate(0);
  useEffect(() => {
    const token = localStorage.getItem("user");
    if (!token) {
      navigate("/login");
    }

    axios
      .post(
        "http://localhost:3001/auth",
        {},
        { headers: { authorization: token } }
      )
      .then((res) => (!res.data.auth ? navigate("/login") : null))
      .catch((err) => console.log(err));

    axios
      .get(
        "http://localhost:3001/destinations",
        { headers: { authorization: token } }
      )
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
  );
}

export default Home;
