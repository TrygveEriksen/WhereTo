import { useState, useEffect } from "react";
import "../Login/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../API/API";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await API.get("/auth");
    if (!res) return;
    if (res?.data?.auth) navigate("/");
  };

  const handleSignup = async (e) => {
    setError("");
    e.preventDefault();

    if (password !== confirmPassword)
      return setError("Passordene må være like");

    const res = await API.post("/users/signup", { username, password });

    if (res.status === 400) {
      return setError(res.data.error);
    }

    if (res.status > 300 && res.status < 200) {
      return setError("unkown server error");
    }

    if (res?.data?.jwtToken) {
      localStorage.setItem("user", res.data.jwtToken);
      navigate("/");
    }
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
