import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [destinations, setDestinations] = useState([]);

  //fetch data from the server when the page starts running and set it in the state destination
  const navigate = useNavigate(0);
  useEffect(() => {
    const token = localStorage.getItem("user");
    if (!token) {
      navigate("/login")
    }

    axios.post(("http://localhost:3001/auth"),{},
    { headers: { authorization: token } })
    .then(res=> !res.data.auth? navigate("/login"):null)
    .catch(err=> console.log(err))



    axios
      .get("http://localhost:3001/users")
      .then((response) => setDestinations(response.data))
      .catch((error) => console.log("Error fetching data:", error));
  }, []);
  return (
    <>
      <h1>Travel planner</h1>
      <ul>
        {destinations.map((users) => (
          <li key={users._id}>
            <p>{users.username}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
