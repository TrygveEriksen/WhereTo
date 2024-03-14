import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./AddAd.css";
import { API } from "../../API/API";


function AddAd() {
	const [imageText, setImageText] = useState("");
	const [fileKey, setFileKey] = useState(0);
	const [adName, setAdName] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [isDragOverBody, setIsDragOverBody] = useState(false);
	const [imgLink, setImgLink] = useState("");
	const [allAds, setAllAds] = useState([]);


	useEffect(() => {
		load();
	}, []);

	const load = async () => {
		const response = await API.get("/advertisements/all");
		setAllAds(response.data);

		window.scrollTo(0, 0);
	}


	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrorMessage("");

		if (!(adName && imageText && link)) {
			setErrorMessage("Du må fylle ut alle feltene!");
			return;
		}

		try {
			const response = await API.post("/advertisements/new", {
				title: adName,
				img: imageText,
				imgLink,
			});

			// Reset form fields after submission

			setAdName("");
			setErrorMessage("");
			setImgLink("");
			setSuccessMessage("Reklame lagt til! Hurra!");
			setImageText("");
			setFileKey((prevKey) => prevKey + 1);

			setAllAds((prev)=> [...prev, response.data])



		} catch (error) {
			// Handle error
			setErrorMessage("Noe gikk galt");
			console.error("Error adding destination:", error);
		}
	};


	const handleFile = (e) => {
		const file = e.target.files[0];
		setErrorMessage("");
		setImageText("");
		if (!file) {
			setFileKey((prevKey) => prevKey + 1);
			return;
		}
		if (file.type !== "image/jpeg" && file.type !== "image/png") {
			setErrorMessage("Bildet må være av type jpeg eller png");
			setFileKey((prevKey) => prevKey + 1);
			return;

		}
		if (file.size > 1000000) {
			setErrorMessage("Bildet er for stort, maks 1MB");
			setFileKey((prevKey) => prevKey + 1);
			return;
		}
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			const base64 = reader.result;
			setImageText(base64);


		};
	};

	const handleDragOver = (e) => {
		e.preventDefault();
	};

	const handleAdNameChange = (e) => {
		setErrorMessage("");
		setAdName(e.target.value);
	}

	const handleLinkChange = (e) => {
		setErrorMessage("");
		setImgLink(e.target.value);
	}

	const handleDragBody = (e) => {
		e.preventDefault();
		setIsDragOverBody(true);
	};

	const handleDropBody = (e) => {
		e.preventDefault();
		setIsDragOverBody(false);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		setImageText("");
		setErrorMessage("");
		setIsDragOverBody(false);
		const file = e.dataTransfer.files[0];
		if (!file) {
			return;
		}
		if (file.type !== "image/jpeg" && file.type !== "image/png") {
			setErrorMessage("Bildet må være av type jpeg eller png");
			setFileKey((prevKey) => prevKey + 1);
			return;

		}
		if (file.size > 1000000) {
			setErrorMessage("Bildet er for stort, maks 1MB");
			setFileKey((prevKey) => prevKey + 1);
			return;
		}
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			const base64 = reader.result;
			setImageText(base64);

		};
	};

	const handleDelete = async (e) => {
		e.preventDefault();
		const confirm = window.confirm("Er du sikker på at du vil slette denne reklamen?");
		if(!confirm){
			return;
		}
		try{
			const response = await API.delete(`/advertisements/${e.target.id}`);

			setAllAds(allAds.filter(item=> {
				return item._id != response.data._id;
			}))

		}catch{
			alert("Ooops, det skjedde en feil");
		}


	}


	return (
		<>
			<Navbar />


			<div className="addAdContainer" onDragOver={handleDragBody} onDragLeave={handleDropBody}>
				<div className="addAdDiv">
					<h1 className="addAdHeader">Legg til ny reklame</h1>

					<form onSubmit={handleSubmit} className="addAdForm">
						<label htmlFor="adName" className="loginLabel">
							Description
						</label>
						<input
							type="text"
							name="adName"
							id="adName"
							placeholder="Skriv inn firmanavn..."
							value={adName}
							onChange={handleAdNameChange}
							className="addAdInput"
						/>

						<label htmlFor="link" className="loginLabel">
							Link
						</label>
						<input
							type="text"
							name="link"
							id="link"
							placeholder="Legg til link"
							value={imgLink}
							onChange={handleLinkChange}
							className="addAdInput"
						/>



						<div className={`imgDiv ${isDragOverBody ? "dropzone" : ""}`} onDrop={handleDrop} onDragOver={handleDragOver}>
							<label htmlFor="inputImage">

								<p className="button">Choose File</p >{!imageText && <p>No file chosen</p>}
								<input id="inputImage" type="file" key={fileKey} onChange={handleFile} accept=".jpeg, .jpg, .png"></input>
							</label>
							{imageText && (<img src={imageText} alt="destination" className="imgPreview" />)}
						</div>
						<button className="submitBtn" type="submit">
							Legg til
						</button>
					</form>
					{errorMessage && <div className="error">{errorMessage}</div>}
					{successMessage && <p className="success"> {successMessage} </p>}
				</div>

				<div className="allAdsDiv">
					<h1 className="adHeader">Oversikt reklamer</h1>
					<ul className="allAdsUl">
						{allAds && allAds.map((ad, index) => (
							<li key={index} className="adLi">
								<p>{ad.title}</p>
								<img
									src="/images/SVG/Abort.svg"
									alt="delete"
									className="deleteLi"
									height="15px"
									id={ad._id}
									onClick={handleDelete}
								/>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}
export default AddAd;