import { useState } from "react";
import Navbar from "../Navbar/Navbar";

function AddAd() {
	const [imageText, setImagetext] = useState("");
	const [fileKey, setFileKey] = useState(0);
	const [adName, setAdName] = useState("");

	const handleSubmit = async (e) =>{
		e.preventDefault();
		console.log("Submitted yehaaaa");
		console.log(adName);
	};

	const handleFile = (e) => {
		const file = e.target.files[0];
	}

	const handleAdNameChange = (e) => {
		setAdName(e.target.value);
	}



	return(
		<>
			<Navbar />

			
			
			<div><h1>dette er en test</h1></div>

			<form onSubmit={handleSubmit}>
				<label htmlFor="adName">
					Description
					<input 
						type="text" 
						name="adName" 
						id="adName" 
						placeholder="Skriv inn firmanavn..."
						value={adName}
						onChange={handleAdNameChange}
					/>

				</label>	
				<label htmlFor="inputImage">

            		<p className="button">Choose File</p >{!imageText && <p>No file chosen</p>}
            		<input id="inputImage" type="file" key={fileKey} onChange={handleFile} accept=".jpeg, .jpg, .png"></input>
              	</label>			
				<button className="submitBtn" type="submit">
					Legg til
				</button>
			</form>
		</>
	);
}
export default AddAd;