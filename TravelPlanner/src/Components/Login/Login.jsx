import { useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../API/API";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    setError("");
  }, [username, password]);

  const load = async () => {
    const res = await API.get("/auth");
    if (!res) return;
    if (res?.data?.auth) navigate("/");
  };

  const handleLogin = async (e) => {
    setError("");
    e.preventDefault();

    if (!username) return setError("Du må ha brukernavn");
    if (!password) return setError("Du må ha passord");

    try {
      const res = await API.post("/users/login", { username, password });
      if (res?.data?.jwtToken) {
        localStorage.setItem("user", res.data.jwtToken);
        navigate("/");
      }
    } catch (error) {
      return setError("Brukernavn eller Passord er feil");
    }

    setError("Noe gikk");
  };

  return (
    <div className="loginDiv">
      <h1>Logg inn</h1>
      <form className="loginForm">
        <label htmlFor="brukernavn">Brukernavn</label>
        <input
          autoFocus
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
      {error && <div className="error">{error}</div>}
      <p className="signup">
        <Link to="/signup">Opprett bruker</Link>
      </p>
    </div>
  );
}

export default Login;
