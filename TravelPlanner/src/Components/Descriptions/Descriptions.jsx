import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../API/API";
import Navbar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import "./Descriptions.css"

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
      console.log(destRes.data)
      return setLoading(false);
    }
  };


  return (
    <>
      <Navbar />
      
      <div>
        <div className="descriptionsContainer">
        {isLoading && <Loading/>}
        <h1 className="descriptionsHeader">{destinations.place}</h1>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet" />
        <h2> <span class="icon"><i class="fas fa-globe"></i></span>
          {destinations.country}, {destinations.continent}</h2>
        </div>
        <div className="column-container">
          <div className="labels">
            <h3>Egenskaper:</h3>
            <p>{destinations.labels}</p> {/* må fikses*/}
          </div>

          <div className="descriptionContainer">
            <h3>Beskrivelse:</h3>
            <p className="descriptionsText">{destinations.description}</p>
          </div>

          <div>
            <h3></h3>
          </div>

        </div>
      </div>
    </>
  );

}

export default Descriptions;
