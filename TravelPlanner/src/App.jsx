import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [destinations, setDestinations] = useState([]);

  //fetch data from the server when the page starts running and set it in the state destination
  useEffect(() => {
    axios
      .get("http://localhost:3001/destinations")
      .then((response) => setDestinations(response.data))
      .catch((error) => console.log("Error fetching data:", error));
  }, []);
  return (
    <>
      <h1>Travel planner</h1>
      <ul>
        {destinations.map((destination) => (
          <li key={destination._id}>
            <p>{destination.name}</p>
            <p>{destination.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
