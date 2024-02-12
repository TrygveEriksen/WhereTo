import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../API/API";
import Navbar from "../Navbar/Navbar";


function Home() {
  const [destinations, setDestinations] = useState([]);

  //fetch data from the server when the page starts running and set it in the state destination
  const navigate = useNavigate();
  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await API.get("/auth");
    if (!res?.data?.auth) return navigate("/login");

    const destRes = await API.get("/destinations");
    if (destRes) {
      return setDestinations(destRes.data);
    }
  };

  return (
    <>
      <Navbar />
      <h1>Destinations</h1>
      <ul>
        {destinations.map((destination) => (
          <li key={destination._id}>
            <Link to={`/descriptions/${destination._id}`}>
              <p>{destination.place}, {destination.country}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/login" className="signup" onClick={() => localStorage.removeItem("user")}>
        Logg ut
      </Link>
    </>
  );
}

export default Home;
