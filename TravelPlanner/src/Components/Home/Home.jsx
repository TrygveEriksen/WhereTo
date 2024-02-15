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
  const [visibleDestinations, setVisibleDestinations] = useState([]);
  const [isLoading, setLoading] = useState(true);

  //fetch data from the server when the page starts running and set it in the state destination
  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const destRes = await API.get("/destinations");
    if (destRes) {
      setDestinations(destRes.data);
      setVisibleDestinations(destRes.data);
      return setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchWord = e.target.value;
    if (searchWord === "") {
      setVisibleDestinations(destinations);
    }
    else {
      setVisibleDestinations(destinations.filter((destination) => {
        return (destination.place.toLowerCase().includes(searchWord.toLowerCase()) 
        || destination.country.toLowerCase().includes(searchWord.toLowerCase())
        || destination.continent.toLowerCase().includes(searchWord.toLowerCase()))
      }));
    }


  };


  if (visibleDestinations.length === 0) {
    window.scrollTo(0, 0);
  }


  return (
    <>
      <Navbar />
      <div className="homeContainer">
        <div className="homeContent">
          
          {isLoading && <Loading />}
          <div className="searchBox">
            <input className="searchField" type="text" onChange={handleSearch} autoFocus></input>
          </div>
          <ul className="destinations">
            {visibleDestinations.map((destination) => (
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
