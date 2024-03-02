import { useEffect, useState } from "react";
import { API } from "../../API/API";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./NewDestination.css";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";

function NewDestination() {
  const [place, setPlace] = useState("");
  const [country, setCountry] = useState("");
  const [continent, setContinent] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isVerified,setVerified] = useState("");
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
    "Ute liv",
  ];

  useEffect(() => {
    load();
  }, []);

  const navigate = useNavigate();
  const load = async () => {
    const adminData = await API.get("/admin");

    if(adminData.data.permission != 1) {
      setVerified(0)
    }
    else {
      setVerified(1)
    }
    
    window.scrollTo(0, 0);
  };


  const handlePlaceChange = (e) => {
    const capitalizedInput = e.target.value.replace(/([a-zA-ZæÆøØåÅ]+)|([\s-]+)/g, (match, word) => {
      return word ? word.charAt(0).toUpperCase() + word.slice(1) : match;
    });
    setPlace(capitalizedInput);
  };

  const handleCountryChange = (e) => {
    const capitalizedInput = e.target.value.replace(/([a-zA-ZæÆøØåÅ]+)|([\s-]+)/g, (match, word) => {
      return word ? word.charAt(0).toUpperCase() + word.slice(1) : match;
    });
    setCountry(capitalizedInput);
  };
  const handleContinentChange = (e) => {
    const capitalizedInput = e.target.value.replace(/([a-zA-ZæÆøØåÅ]+)|([\s-]+)/g, (match, word) => {
      return word ? word.charAt(0).toUpperCase() + word.slice(1) : match;
    });
    setContinent(capitalizedInput);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleLabelChange = (e) => {
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
      const response = await API.post("/destinations/new", {
        description,
        place,
        country,
        continent,
        labels,
        isVerified
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

      // Uncheck all checkboxes
      document
        .querySelectorAll('input[type="checkbox"]')
        .forEach((checkbox) => {
          checkbox.checked = false;
        });
    } catch (error) {
      // Handle error
      setErrorMessage("Noe gikk galt");
      console.error("Error adding destination:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="newDestinationContainer">
        <div className="newDestinationDiv">
          <h1 className="newDestinationHeader">Legg til destinasjon</h1>

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

            <label className="loginLabel">Egneskaper:</label>

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
              Legg til
            </button>
          </form>
          {errorMessage && <div className="error">{errorMessage}</div>}
          {successMessage && <p className="success"> {successMessage} </p>}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NewDestination;
