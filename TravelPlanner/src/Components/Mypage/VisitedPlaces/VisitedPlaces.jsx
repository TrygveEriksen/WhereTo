import "../Mypage.css";
import "./VisitedPlaces.css";
import Loading from "../../Loading/Loading";
import { API } from "../../../API/API";
import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";



function VisitedPlaces() {

    const [destinations, setDestinations] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const res = await API.get(`/destinations/getVisitedPlaces`);
        setDestinations(res.data);
        setLoading(false);
        return res.data;
    }



    return (
        <div className="myReviews">
            <h1>Steder jeg har vært</h1>
            {isLoading && <Loading />}
            <ul className="reviewUl">
                {destinations.map((dest) => (
                    <Link to={`/descriptions/${dest._id}`} className="linkToDestination" key={dest._id}>
                        <li className="oneDestination" key={dest._id}>
                            <p className="">{dest.place}, {dest.country}</p>

                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}



export default VisitedPlaces;