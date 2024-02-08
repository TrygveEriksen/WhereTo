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

  const load = async () => {
    const res = await API.get("/auth");
    if (!res) return;
    if (res?.data?.auth) navigate("/");
  };

  const handleLogin = async (e) => {
    setError("");
    e.preventDefault();

    const res = await API.post("/users/login", { username, password });

    if (res?.data?.jwtToken) {
      localStorage.setItem("user", res.data.jwtToken);
      navigate("/");
    }
    setError("wrong username or password");
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
