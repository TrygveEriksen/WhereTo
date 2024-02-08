import axios from "axios";
import { useState, useEffect } from "react";
import "../Login/Login.css";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("user");
    if (!token) {
      return;
    }

    axios
      .post(
        "http://localhost:3001/auth",
        {},
        { headers: { authorization: token } }
      )
      .then((res) => (res.data.auth ? navigate("/") : null))
      .catch((err) => console.log(err));

    userLoggedIn().catch(console.error);
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    setError("");
    e.preventDefault();

    if (confirmPassword !== password) {
      setError("Passordene må være like");
      return;
    }

    axios
      .post("http://localhost:3001/users/signup", {
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
      <h1>Opprett bruker</h1>
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
        <label htmlFor="passord2">Bekreft Passord</label>
        <input
          type="password"
          placeholder="Bekreft Passord"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <input type="submit" value="Opprett Bruker" onClick={handleSignup} />
      </form>
      {error && <div className="error">{error}</div>}
      <p>
        Har du allerede en bruker? <Link to="/login">Logg inn</Link>
      </p>
    </div>
  );
}

export default Signup;
