import axios from "axios";
import { useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  useEffect(() =>  {
    const token = localStorage.getItem("user");
    if (!token) {
      return;
    }

  axios.post(("http://localhost:3001/auth"),{},
      { headers: { authorization: token } })
      .then(res=> res.data.auth? navigate("/"):null)
      .catch(err=> console.log(err))

  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    setError("");
    e.preventDefault();

    axios
      .post("http://localhost:3001/users/login", {
        username,
        password,
      })
      .then((res) => {
        if (res.data.jwtToken) {
          localStorage.setItem("user", res.data.jwtToken);
          navigate("/");
        }
        setError("wrong username or password");
      })
      .catch((error) => setError("wrong username or password"));
  };

  return (
    <div className="loginDiv">
      <h1>Logg inn</h1>
      <form className="loginForm">
        <label htmlFor="brukernavn">Brukernavn</label>
        <input
          type="text"
          placeholder="Brukernavn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="passord">Passord</label>
        <input
          type="password"
          placeholder="Passord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input type="submit" value="Logg inn" onClick={handleLogin} />
      </form>
      <p>
        Ny her? <Link to="/signup">Opprett bruker</Link>
      </p>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default Login;
