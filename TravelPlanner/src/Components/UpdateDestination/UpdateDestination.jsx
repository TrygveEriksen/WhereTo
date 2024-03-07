import { useEffect, useState } from "react";
import { API } from "../../API/API";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./UpdateDestination.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";

function UpdateDestination() {
  const [place, setPlace] = useState("");
  const [country, setCountry] = useState("");
  const [continent, setContinent] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { id } = useParams();
  let labels = [];
  const allLabels = [
    "Strand",
    "Natur",
    "Storby",
    "Kultur",
    "Mat",
    "Arkitektur",
    "Eksotisk",
    "Historie",
    "Sol",
    "Uteliv",
    "Snø",
    "Vin",
  ];

  useEffect(() => {
    load();
  }, []);

  const navigate = useNavigate();
  const load = async () => {
    const adminData = await API.get("/admin");
    window.scrollTo(0, 0);
    if (adminData.data?.permission != 1) {
      navigate("/");
    }
    //Fra chat:
    const response = await API.get(`/destinations/${id}`); //må finne riktig destination
    const destinationData = response.data;

    setPlace(destinationData.place);
    setCountry(destinationData.country);
    setContinent(destinationData.continent);
    setDescription(destinationData.description);
  };

  const handlePlaceChange = (e) => {
    setErrorMessage("");
    const capitalizedInput = e.target.value.replace(/([a-zA-Z]+)|([\s-]+)/g, (match, word) => {
      return word ? word.charAt(0).toUpperCase() + word.slice(1) : match;
    });
    setPlace(capitalizedInput);
  };

  const handleCountryChange = (e) => {
    setErrorMessage("");
    const capitalizedInput = e.target.value.replace(/([a-zA-Z]+)|([\s-]+)/g, (match, word) => {
      return word ? word.charAt(0).toUpperCase() + word.slice(1) : match;
    });
    setCountry(capitalizedInput);
  };
  const handleContinentChange = (e) => {
    setErrorMessage("");
    const capitalizedInput = e.target.value.replace(/([a-zA-Z]+)|([\s-]+)/g, (match, word) => {
      return word ? word.charAt(0).toUpperCase() + word.slice(1) : match;
    });
    setContinent(capitalizedInput);
  };
  const handleDescriptionChange = (e) => {
    setErrorMessage("");
    setDescription(e.target.value);
  };

  const handleLabelChange = (e) => {
    setErrorMessage("");
    if (e.target.checked) {
      labels.push(e.target.name);
    } else {
      labels = labels.filter((label) => label !== e.target.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(place && country && continent && description)) {
      console.log(place + country + continent + description);
      setErrorMessage("Du må fylle ut alle feltene!");
      return;
    }

    try {
      const response = await API.put(`/destinations/update/${id}`, {
        description,
        place,
        country,
        continent,
        labels,
        isVerified: 0 //må legge til knapp for dette
      });

      // Handle success response
      console.log("Destination updated successfully:");

      setSuccessMessage("Destinasjon ble oppdatert!");
      window.history.back()
    } catch (error) {
      // Handle error
      setErrorMessage("Noe gikk galt");
      console.error("Error adding destination:", error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm("Er du sikker på at du vil slette denne destinasjonen?");
    if (confirmed) {
      try {

        const res = await API.delete(`/review/bydestination/${id}`)
        const response = await API.delete(`/destinations/delete/${id}`)
        window.location.href = "/"
      }
      catch (error) {
        setErrorMessage("Noe gikk galt");
        console.error("Error deleting destination:", error);
      }
    }
  }

  return (
    <>
      <Navbar />
      <div className="newDestinationContainer">
        <div className="newDestinationDiv">
          <h1 className="newDestinationHeader">Oppdater destinasjon</h1>

          <form onSubmit={handleSubmit} className="newDestinationForm">
            <label className="loginLabel" htmlFor="place">
              Sted:
            </label>
            <input
              autoFocus
              type="text"
              id="place"
              value={place}
              onChange={handlePlaceChange}
              placeholder="Skriv sted her"
              className="newDestinationInput"
            />
            <label className="loginLabel" htmlFor="country">
              Land:
            </label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={handleCountryChange}
              placeholder="Skriv land her"
              className="newDestinationInput"
            />
            <label className="loginLabel" htmlFor="continent">
              Kontinent:
            </label>
            <select
              value={continent}
              onChange={handleContinentChange}
              className="newDestinationInput"
            >
              <option value="">Velg et kontient</option>
              <option value="Europa">Europa</option>
              <option value="Asia">Asia</option>
              <option value="Afrika">Afrika</option>
              <option value="Nord-Amerika">Nord-Amerika</option>
              <option value="Sør-Amerika">Sør-Amerika</option>
              <option value="Oseania">Oseania</option>
            </select>

            <label className="loginLabel" htmlFor="description">
              Beskrivelse:
            </label>
            <textarea
              id="description"
              placeholder="Beskrivelse"
              value={description}
              onChange={handleDescriptionChange}
              className="descriptionInput"
            ></textarea>

            <label className="loginLabel">Egenskaper:</label>
            <Box
              sx={{
                display: "flex",
              }}
            >
              <FormControl component="fieldset" variant="standard">
                {allLabels.map((label, index) => (
                  <label key={index} className="label">
                    <input
                      type="checkbox"
                      onChange={handleLabelChange}
                      name={label}
                    />
                    {label}
                  </label>
                ))}
              </FormControl>
            </Box>


            <button className="submitBtn" type="submit">
              Oppdater
            </button>


          </form>
          <button className="submitBtn" id="deleteBtn" onClick={handleDelete}>
            Slett destinasjon
          </button>
          {errorMessage && <div className="error">{errorMessage}</div>}
          {successMessage && <p className="success"> {successMessage} </p>}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UpdateDestination;