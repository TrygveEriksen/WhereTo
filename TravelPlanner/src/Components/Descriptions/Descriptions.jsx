import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../API/API";
import Navbar from "../Navbar/Navbar";

function Descriptions() {
  const [destinations, setDestinations] = useState([]);
  const { id } = useParams();

  //fetch data from the server when the page starts running and set it in the state destination
  const navigate = useNavigate();
  useEffect(() => {
    load()
  }, []);


  const load = async () => {
    const res = await API.get("/auth");
    if (!res?.data?.auth) return navigate("/login");

    const destRes = await API.get(`/destinations/${id}`)
    if (destRes) {
      return setDestinations(destRes.data)
    }
  };


  return (
    <>
      <Navbar />
      
      <div>
        <h1>Description</h1>

        <p>{destinations.description}</p>
      </div>
    </>
  );

}

export default Descriptions;
