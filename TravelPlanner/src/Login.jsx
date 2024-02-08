import axios from "axios";
import { useState, useEffect } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="loginDiv">
      <h1>Logg inn</h1>
      <form className="loginForm">
        <label htmlFor="brukernavn">Brukernavn</label>
        <input type="text" placeholder="Brukernavn" />
        <label htmlFor="passord">Passord</label>
        <input type="password" placeholder="Passord" />
        <input type="submit" value="Logg inn" />
      </form>
      <p>Ny her? <Link to="/signup">Opprett bruker</Link></p>
    </div>
  );
}

export default Login;
