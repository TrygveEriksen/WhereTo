import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../../API/API";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import "./Home.css";

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
      <div className="homeContainer">
        <div className="homeContent">
          
          {isLoading && <Loading />}

          <ul className="destinations">
            {destinations.map((destination) => (
              <li className="oneDestination" key={destination._id}>
                <Link
                  className="destAnchor"
                  to={`/descriptions/${destination._id}`}
                >
                  <p className="destLink dest1">{destination.place}, </p>
                  <p className="destLink dest2">{destination.country}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}
 
export default Home;
