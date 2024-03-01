import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../../API/API";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import "./Home.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function Home() {
  const [destinations, setDestinations] = useState([]);
  const [visibleDestinations, setVisibleDestinations] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchWord, setSearchWord] = useState("");
  const [toggledFilters, setToggledFilters] = useState([]);

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

  const handleFilter = (wordToFilterOn) => {
    if (toggledFilters.includes(wordToFilterOn)) {
      // Remove from the list if already present
      setToggledFilters((prevFilters) =>
        prevFilters.filter((filter) => filter !== wordToFilterOn)
      );
      console.log(toggledFilters);
    } else {
      // Add to the list if not present
      setToggledFilters((prevFilters) => [...prevFilters, wordToFilterOn]);
      console.log(toggledFilters);
    }

    if (toggledFilters.length === 0) {
      setVisibleDestinations(destinations);
    } else {
      setVisibleDestinations(
        destinations.filter((destination) => {
          // Check if any of the toggled filters are in the destination labels
          return toggledFilters.every((filter) =>
            destination.labels.includes(filter)
          );
        })
      );
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const sWord = e.target.value;
    setSearchWord(sWord);
    window.scrollTo(0, 0);
    if (sWord === "") {
      setVisibleDestinations(destinations);
    } else {
      setVisibleDestinations(
        destinations.filter((destination) => {
          return (
            destination.place.toLowerCase().includes(sWord.toLowerCase()) ||
            destination.country.toLowerCase().includes(sWord.toLowerCase()) ||
            destination.continent.toLowerCase().includes(sWord.toLowerCase())
          );
        })
      );
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
            <input
              className="searchField"
              type="text"
              onChange={handleSearch}
              value={searchWord}
              autoFocus
              placeholder="Søk"
            ></input>
          </div>
          <FilterCheckbox handleFilter={handleFilter} />
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
            {visibleDestinations.length === 0 && (
              <li className="oneDestination">
                <a className="destAnchor">
                  <p className="destLink dest1">Ingen resultater matcher:</p>
                  <p className="destLink dest2">
                    {"<"} <span className="noResults">{searchWord}</span>
                    {">"}
                  </p>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
