import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Descriptions() {
  const [destinations, setDestinations] = useState([]);
  const { id } = useParams();

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
        `http://localhost:3001/destinations/${id}`,
        { headers: { authorization: token } }
      )
      .then((response) => setDestinations(response.data))
      .catch((error) => console.log("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>Description</h1>

      <p>{destinations.description}</p>
    </div>
  );
}

export default Descriptions;
