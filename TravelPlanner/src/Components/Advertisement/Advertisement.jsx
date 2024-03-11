import { useState } from "react";
import "./Advertisement.css";
import { useEffect } from "react";
import { API } from "../../API/API";

function Advertisement() {
	const [advertisement, setAdvertisement] = useState("");

	useEffect(() => {
		load();
	}, []);

	const load = async () => {
		const result = await API.get("/advertisements");
		setAdvertisement(result.data);
		console.log(result);
		console.log(result.data.img)
	}
	return(
		<>
		<div id="advertContainer">
			<a href={advertisement.imgLink} target="_blank" rel="noreferrer noopener">
			<img src={advertisement.img} alt={advertisement.title} />
			</a>
		</div>
		</>
	);
}	
export default Advertisement;