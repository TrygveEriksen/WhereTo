import "../Mypage.css";
import { API } from "../../../API/API";
import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";



function VisitedPlaces() {

    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const visited = await API.get("/getUser");
        const res = await API.put("/destinations/getVisitedPlaces", { visited: visited.data.visited });
        setDestinations(res.data);
        return res.data;
    }



    return (
        <div className="visitedPlaces">
            <ul className="destinations">
                {destinations.map((destination) => (
                    <li className="oneDestination" key={destination._id}>
                        <Link
                            className="destAnchor"
                            to={`/descriptions/${destination._id}`}
                        >
                            <p className="destLink dest1">{destination.place}, {destination.country} </p>
                        </Link>
                    </li>
                ))}
                {destinations.length === 0 && (
                    <li className="Du har ikke besøkt noen steder">
                        <a className="destAnchor">
                            <p className="destLink dest1">Ingen resultater matcher:</p>
                        </a>
                    </li>
                )}
            </ul>
        </div>
    );
}



export default VisitedPlaces;