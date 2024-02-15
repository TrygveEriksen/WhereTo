import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../API/API";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";

function Descriptions() {
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

  //fetch data from the server when the page starts running and set it in the state destination
  useEffect(() => {
    load()
  }, []);


  const load = async () => {
    const destRes = await API.get(`/destinations/${id}`)
    if (destRes) {
      setDestinations(destRes.data)
      return setLoading(false);
    }
  };


  return (
    <>
      <Navbar />
      
      <div>
        <h1>Description</h1>
        {isLoading && <Loading/>}
        <p>{destinations.description}</p>
      </div>

      <Footer />
    </>
  );

}

export default Descriptions;
