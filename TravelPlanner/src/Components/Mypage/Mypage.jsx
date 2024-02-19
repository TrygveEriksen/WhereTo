import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import { API } from "../../API/API";
import "./Mypage.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import myImage from "./Picture/myprofile.png";
import StaredPlaces from "./StaredPlaces/StaredPlaces";
import MyReviews from "./MyReviews/MyReviews";
import Footer from "../Footer/Footer";

function Mypage() {
  const [user, setUser] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const username = await API.get("/getUser");
    setUser(username.data.username);
  };

  return (
    <>
      <Navbar />
      <div className="myPageContainer">
        <div className="divBox">
          <div className="myPageContent">
            <div className="divMypage">
              <h1 className="myPage">Min side</h1>
              <img
                src={myImage}
                alt="My profile picture"
                className="profile-image"
              ></img>
              <h3>Brukernavn: {user}</h3>
            </div>
          </div>
        </div>
        <div className="viewBox">
          <MyReviews />
          <br />
          <StaredPlaces />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Mypage;
