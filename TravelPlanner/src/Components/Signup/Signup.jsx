import axios from "axios";
import { useState, useEffect } from "react";
import "../Login/Login.css";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="loginDiv">
      <h1>Opprett bruker</h1>
      <form className="loginForm">
        <label htmlFor="brukernavn">Brukernavn</label>
        <input type="text" placeholder="Brukernavn" />
        <label htmlFor="passord">Passord</label>
        <input type="password" placeholder="Passord" />
        <label htmlFor="passord2">Bekreft Passord</label>
        <input type="password" placeholder="Bekreft Passord" />
        <input type="submit" value="Opprett Bruker" />
      </form>
      <p>
        Har du allerede en bruker? <Link to="/login">Logg inn</Link>
      </p>
    </div>
  );
}

export default Signup;
