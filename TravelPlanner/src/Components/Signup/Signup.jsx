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

  useEffect(() => {
    setError("");
  }, [username, password, confirmPassword]);

  const load = async () => {
    if (!localStorage.getItem('user')) {
      return
    }
    const res = await API.get("/auth");
    if (!res) return;
    if (res?.data?.auth) navigate("/");
  };

  const handleSignup = async (e) => {
    setError("");
    e.preventDefault();

    if (!username) return setError("Du må ha brukernavn");
    if (!password) return setError("Du må ha passord");
    if (!confirmPassword) return setError("Du må bekrefte passord");

    if (password !== confirmPassword)
      return setError("Passordene må være like");

    try {
      const res = await API.post("/entry/signup", { username, password });
      if (res?.data?.jwtToken) {
        localStorage.setItem("user", res.data.jwtToken);
        navigate("/");
      }
    } catch (error) {
      setError("Brukernavnet er opptatt");
    }
    setError("Noe gikk");
  };

  return (
    <div className="loginContainer">
      <div className="loginDiv">
        <h1 className="loginHeader">Opprett bruker</h1>
        <form className="loginForm">
          <label className="loginLabel" htmlFor="brukernavn">
            Brukernavn
          </label>
          <input
          autoFocus
            type="text"
            className="loginInput"
            placeholder="Brukernavn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label className="loginLabel" htmlFor="passord">
            Passord
          </label>
          <input
            type="password"
            className="loginInput"
            placeholder="Passord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="loginLabel" htmlFor="passord2">
            Bekreft Passord
          </label>
          <input
            type="password"
            className="loginInput"
            placeholder="Bekreft Passord"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <input
            type="submit"
            className="submitBtn"
            value="Opprett Bruker"
            onClick={handleSignup}
          />
        </form>
        {error && <div className="error">{error}</div>}
        <div className="linkDiv">
          <p className="loginText">Har du allerede en bruker?</p>
          <Link className="loginLink" to="/login">
            Logg inn
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
