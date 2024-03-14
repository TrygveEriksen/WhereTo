import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import { API } from "../../API/API";
import "./Mypage.css";
import VisitedPlaces from "./VisitedPlaces/VisitedPlaces";
import MyReviews from "./MyReviews/MyReviews";
import Footer from "../Footer/Footer";

function Mypage() {
  const [username, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const username = await API.get("/getUser");
    window.scrollTo(0, 0);
    setUserName(username.data.username);
    setUserId(username.data._id);
  };

  return (
    <>
      <Navbar />
      <div className="myPageContainerBox">
        <div className="myPageContainer">
          <div className="divBox">
            <div className="myPageContent">
              <div className="divMypage">
                <h1 className="myPage">Min side</h1>
                <img
                  src="/images/SVG/mypage.svg"
                  alt="My profile picture"
                  className="profile-image"
                ></img>
                <h3>Brukernavn: {username}</h3>
              </div>
            </div>
          </div>
          <div className="viewBox">
            <MyReviews userId={userId} />

            <VisitedPlaces />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Mypage;
