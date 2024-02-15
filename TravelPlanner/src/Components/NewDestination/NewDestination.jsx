import { useEffect, useState } from "react";
import { API } from "../../API/API";
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer";
import "./NewDestination.css"
import { useNavigate } from "react-router-dom";

function NewDestination() {
  const [place, setPlace] = useState("");
  const [country, setCountry] = useState("");
  const [continent, setContinent] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  useEffect(() => {
    load();
  }, []);

  const navigate = useNavigate();
  const load = async () => {
    const adminData = await API.get("/admin");
    if (adminData.data?.permission != 1) {
      navigate('/')
    }
  };




  const handlePlaceChange = (e) => {
    setPlace(e.target.value);
  }
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  }
  const handleContinentChange = (e) => {
    setContinent(e.target.value);
  }
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(place && country && continent && description)) {
      setErrorMessage('Du må fylle ut alle feltene!');
      return;
    }

    try {
      const response = await API.post("/destinations/new", {
        description,
        place,
        country,
        continent
      });

      // Handle success response
      console.log("Destination added successfully:");
      
      // Reset form fields after submission
      setPlace("");
      setCountry("");
      setContinent("");
      setDescription("");
      setErrorMessage("");
      setSuccessMessage("Destinasjon lagt til!");

    } catch (error) {
      // Handle error
      setErrorMessage("Noe gikk galt");
      console.error("Error adding destination:", error);
    }
  };
  

  return (
    <>
    <Navbar />
    <div className="newDestinationCont">
      {errorMessage && (<p className="error"> {errorMessage} </p>)}
      <form onSubmit={handleSubmit}>
        <label htmlFor="place">Sted:</label>
        <input
          type="text"
          id="place"
          value={place}
          onChange={handlePlaceChange}
          placeholder="Skriv sted her"
        />
        <label htmlFor="country">Land:</label>
        <input
          type="text"
          id="country"
          value={country}
          onChange={handleCountryChange}
          placeholder="Skriv land her"
        />
        <label htmlFor="continent">Kontinent:</label>
        <input
          type="text"
          id="continent"
          value={continent}
          onChange={handleContinentChange}
          placeholder="Skriv kontinent her"
        />

        <label htmlFor="description">Beskrivelse:</label>
        <textarea
          id="description"
          placeholder="Beskrivelse"
          value={description}
          onChange={handleDescriptionChange}
        >
          
        </textarea>

        <button type="submit">Submit</button>
      </form>
      {successMessage && (<p className="success"> {successMessage} </p>)}
    </div>
    <Footer />
    </>
  );
  }

export default NewDestination;