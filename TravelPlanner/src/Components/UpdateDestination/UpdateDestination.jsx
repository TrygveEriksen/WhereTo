import { useEffect, useState } from "react";
import { API } from "../../API/API";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./UpdateDestination.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";

function UpdateDestination() {
  const [place, setPlace] = useState("");
  const [country, setCountry] = useState("");
  const [labels, setLabels] = useState([]);
  const [continent, setContinent] = useState("");
  const [description, setDescription] = useState("");
  const [isVerified,setIsVerified] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [imageText, setImageText] = useState("");
  const [fileKey, setFileKey] = useState(0);
  const [isDragOverBody, setIsDragOverBody] = useState(false);
  const { id } = useParams();

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
    setLabels(destinationData.labels);
    setPlace(destinationData.place);
    setCountry(destinationData.country);
    setContinent(destinationData.continent);
    setDescription(destinationData.description);
    setImageText(destinationData.img);
    if(destinationData.isVerified != 1) {
      setIsVerified(0);
    }
    else {
      setIsVerified(1);
    }

  };

  const handlePlaceChange = (e) => {
    setErrorMessage("");
    const capitalizedInput = e.target.value.replace(/([a-zA-ZæøåÆØÅ]+)|([\s-]+)/g, (match, word) => {
      return word ? word.charAt(0).toUpperCase() + word.slice(1) : match;
    });
    setPlace(capitalizedInput);
  };

  const handleCountryChange = (e) => {
    setErrorMessage("");
    const capitalizedInput = e.target.value.replace(/([a-zA-ZæøåÆØÅ]+)|([\s-]+)/g, (match, word) => {
      return word ? word.charAt(0).toUpperCase() + word.slice(1) : match;
    });
    setCountry(capitalizedInput);
  };
  const handleContinentChange = (e) => {
    setErrorMessage("");
    const capitalizedInput = e.target.value.replace(/([a-zA-ZæøåÆØÅ]+)|([\s-]+)/g, (match, word) => {
      return word ? word.charAt(0).toUpperCase() + word.slice(1) : match;
    });
    setContinent(capitalizedInput);
  };


  const handleDescriptionChange = (e) => {
    setErrorMessage("");
    setDescription(e.target.value)

  };

  const handleLabelChange = (e) => {
    setErrorMessage("");
    if (e.target.checked) {
      setLabels([...labels, e.target.name]);
    } else {
      setLabels(labels.filter((label) => label !== e.target.name));
    }
  };

  const handleIsVerified = (e) => {
    setErrorMessage("");
    if(e.target.checked) {
      setIsVerified(1);
    }
    else {
      setIsVerified(0);
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(place && country && continent && description && imageText)) {
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
        isVerified,
        img: imageText,
      });

      // Handle success response


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



  const handleFile = (e) => {
    const file = e.target.files[0];
    setErrorMessage("");
    setImageText("");
    if (!file) {
      setFileKey((prevKey) => prevKey + 1);
      return;
    }
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      setErrorMessage("Bildet må være av type jpeg eller png");
      setFileKey((prevKey) => prevKey + 1);
      return;
      
    }
    if (file.size > 1000000) {
      setErrorMessage("Bildet er for stort, maks 1MB");
      setFileKey((prevKey) => prevKey + 1);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result;
      setImageText(base64);
    

    };
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setImageText("");
    setErrorMessage("");
    setIsDragOverBody(false);
    const file = e.dataTransfer.files[0];
    if (!file) {
      return;
    }    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      setErrorMessage("Bildet må være av type jpeg eller png");
      setFileKey((prevKey) => prevKey + 1);
      return;
      
    }
    if (file.size > 1000000) {
      setErrorMessage("Bildet er for stort, maks 1MB");
      setFileKey((prevKey) => prevKey + 1);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result;
      setImageText(base64);
    };
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };


  const handleDragBody = (e) => {
    e.preventDefault();
    setIsDragOverBody(true);
  };

  const handleDropBody = (e) => {
    e.preventDefault();
    setIsDragOverBody(false);
  };


  return (
    <>
      <Navbar />
      <div className="newDestinationContainer" onDragOver={handleDragBody} onDragLeave={handleDropBody}>
        <div className="newDestinationDiv">
          <h1 className="newDestinationHeader">Oppdater destinasjon</h1>

          <form onSubmit={handleSubmit} className="newDestinationForm">
            <div className="verifiedDiv">
              <label className ="loginLabel" htmlFor="verified">Verifisert:</label>
              <input 
              type="checkbox"
              id="verified"
              checked={isVerified === 1}
              onChange={handleIsVerified}
              />
            </div>

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
              <FormControl
                component="fieldset"
                variant="standard"
                className="filterCheckbox"
              >
                {allLabels.map((label, index) => (
                  <div className="labelBox" key={index}>
                    <input
                      className="checkbox"
                      type="checkbox"
                      id={"label" + index}
                      onChange={handleLabelChange}
                      name={label}
                      checked={labels.includes(label)}
                    />
                    <label className="label" htmlFor={"label" + index}>
                      {label}
                    </label>
                  </div>
                ))}
              </FormControl>
            </Box>

            <div className={`imgDiv ${isDragOverBody?"dropzone":""}`} onDrop={handleDrop} onDragOver={handleDragOver}>
              <label htmlFor="inputImage">

              <p className="button">Choose File</p >{!imageText && <p>No file chosen</p>}
              <input id="inputImage" type="file" key={fileKey} onChange={handleFile} accept=".jpeg, .jpg, .png" ></input>
              </label>
              {imageText && (<img src={imageText} alt="destination" className="imgPreview" />)}
            </div>


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