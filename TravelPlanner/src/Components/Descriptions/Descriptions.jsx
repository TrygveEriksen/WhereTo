import React from "react";
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { API } from "../../API/API";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import "./Descriptions.css";
import DescriptionReview from "./DescriptionReview/DescriptionReview";
import NewReview from "./NewReview/NewReview";
import { Link } from "react-router-dom";
import Advertisement from "../Advertisement/Advertisement";

function Descriptions() {
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [reloadReviews, setReloadDescription] = useState(false);
  const [transition, setTransition] = useState(false);
  const { id } = useParams();
  //for å endre greier:
  const [currentImage, setCurrentImage] = useState("unvisited.svg");
  const [visit, setVisit] = useState("");
  //her legger vi til admin-tilganger
  const [permission, setPermission] = useState(0);

  //fetch data from the server when the page starts running and set it in the state destination
  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    window.scrollTo(0, 0);
    const isAdmin = await API.get("/admin");
    setPermission(isAdmin.data.permission);
    try {
      const destRes = await API.get(`/destinations/${id}`);
      const user = await API.get("/getUser");
      if (destRes) {
        window.scrollTo(0, 0);
        setDestinations(destRes.data);
        if (user) {
          setVisitButton(user.data.visited.includes(id));
        }
        return setLoading(false);
      }
    } catch (error) {
      window.location.href = "/";
    }
  };

  const handleVisited = async () => {
    const user = await API.get("/getUser");
    const res = await API.put("/user/toggleVisited", {
      id: id,
      userId: user.data._id,
    });

    if (res.data.message === "success") {
      setVisitButton(!user.data.visited.includes(id));
    }
  };

  const setVisitButton = (visited) => {
    const button = document.getElementById("visitedButton");
    if (visited) {
      setCurrentImage("/images/SVG/visited.svg");
      setVisit("Besøkt");
    } else {
      setCurrentImage("/images/SVG/unvisited.svg");
      setVisit("Ikke besøkt");
    }
  };

  const handleReviewSubmit = () => {
    setReloadDescription((prevState) => !prevState);
  };

  const handleImageLoad = () => {
    setTimeout(() => {
      setTransition(true);
    }, 1);
  };

  return (
    <>
      <Navbar />

      <div className="destinationContainer">
        <div className="advertContainer">
          <div className="img hiddenAdd"></div>
        </div>
        <div className="descriptionContent">
          <div className="imageContainer">
            {isLoading || !destinations.img ? (
              <Loading />
            ) : (
              <img
                className={`destImage ${transition ? "loaded":""}`}
                src={destinations.img}
                alt="Bilde av destinasjon"
                onLoad={handleImageLoad}
              />
            )}
          </div>

          <div className="interContainer">
            <div className="column-container">
              
              {permission == 1 && (
                <Link to={`/editdestination/${id}`} className="destAnchorPen">
                  <i className="fa fa-pen editDest"></i>
                </Link>
              )}
              <div className="areaContainer">
                <h1 className="descriptionsHeader">
                  {destinations.place}
                  {destinations.isVerified ? (
                    <img
                      className="checkmark"
                      src="/images/SVG/checkmark.svg"
                      alt="verification"
                    />
                  ) : null}
                </h1>
                <h2>
                  <span className="icon">
                    <i className="fas fa-globe"></i>
                  </span>
                  {destinations.country}, {destinations.continent}
                </h2>
              </div>

              <div className="visitedButtonContainer">

              <div className="visitedButton" onClick={handleVisited}>
                <img src={currentImage} alt="Visited" className="visited" />
                <p className="buttonText">{visit}</p>
              </div>
              </div>
              <div className="labels">
                <h3 className="destinationHeader">Egenskaper:</h3>
                <ul className="destinationLabels">
                  {destinations?.labels?.map((destinationLabel) => (
                    <li className="label" key={destinationLabel}>
                      {destinationLabel}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="descriptionContainer">
              <h3 className="descriptionHeader">Beskrivelse:</h3>
              {destinations?.description?.split("\n").map((line, index) => (
                <p key={index} className="descriptionText">
                  {line}
                </p>
              ))}
            </div>
          </div>

          <NewReview
            destinationId={destinations._id}
            onReviewSubmit={handleReviewSubmit}
          />
          <DescriptionReview
            destinationId={destinations._id}
            key={reloadReviews}
          />

          <p>Authored by: {destinations.authoredBy}</p>
        </div>

        <Advertisement />
      </div>
      <Footer />
    </>
  );
}

export default Descriptions;
