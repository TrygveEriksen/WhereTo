import { useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../API/API";
import { DarkModeToggle } from "../DarkModeToggle/DarkModeToggle";

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
    if (!localStorage.getItem('user')) {
      return
    }
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
      const res = await API.post("/entry/login", { username, password });
      if (res?.data?.jwtToken) {
        localStorage.setItem("user", res.data.jwtToken);
        navigate("/");
      }
    } catch (error) {
      return setError("Brukernavn eller Passord er feil");
    }

    setError("Noe gikk galt");
  };

  return (
    <>
      <nav className="login-navbar">
        <div className='navbar-item' id='navbar-left'>
            <img src='/images/SVG/logo_home.svg' alt="logo" className='nav-logo' height="50px" />
            <DarkModeToggle />
        </div>
      </nav>


      <div className="loginContainer">
        <div className="loginDiv">
          <h1 className="loginHeader">Logg inn</h1>
          <form className="loginForm">
            <label className="loginLabel" htmlFor="brukernavn">
              Brukernavn
            </label>
            <input
              autoFocus
              className="loginInput"
              type="text"
              placeholder="Brukernavn"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label className="loginLabel" htmlFor="passord">
              Passord
            </label>
            <input
              className="loginInput"
              type="password"
              placeholder="Passord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="submit"
              className="submitBtn"
              data-testid="submit-test"
              value="Logg inn"
              onClick={handleLogin}
            />
          </form>
          {error && <div className="error">{error}</div>}
          <div className="linkDiv">
            <p className="loginText">Ny her? </p>
            <Link className="loginLink" to="/signup"> Opprett bruker</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
