import FormControl from "@mui/material/FormControl";
import "./FilterCheckbox.css";
import React, {useState} from "react";

function FilterCheckbox({ handleFilter, handleVerified,handleUnverified,permission}) {
  const [verifiedCheck,setVerifiedCheck] = useState(true);
  const [unverifiedCheck,setUnverifiedCheck] = useState(false);

  const allLabels = [
    "Strand",
    "Natur",
    "Storby",
    "Kultur",
    "Mat",
    "Arkitektur",
    "Eksotisk",
    "Historie",
    "Sol",
    "Uteliv",
    "Snø",
    "Vin",
  ];

  const handleVerifiedCheck = (e) => {
   if(e) {
    if(permission && unverifiedCheck) {
      setUnverifiedCheck(false);
    }
    setVerifiedCheck(true);
    changeVerified(true,false)
   }
   else {
    setVerifiedCheck(false);
    changeVerified(false,false)
   }
  
  }

  const handleUnverifiedCheck = (e) => {
    if(e) {
      if(verifiedCheck) {
        setVerifiedCheck(false);
      }
      setUnverifiedCheck(true);
      changeVerified(false,true);
    }
    else {
      setUnverifiedCheck(false);
      changeVerified(false,false)
    }

    
  }
  const changeVerified = (verified,unverified) => {
   handleVerified(verified)
   handleUnverified(unverified)
  }


  return (
    <div className="filterCheckbox">
      <FormControl component="fieldset" variant="standard">
        {allLabels.map((label, index) => (
          <div className="labelBox" key={index}>
            <input
              className="checkbox"
              type="checkbox"
              tabIndex={-1}
              id={"label" + index}
              onChange={() => handleFilter(label)}
              name={label}
            />
            <label className="label" htmlFor={"label" + index}>
              {label}
            </label>
          </div>
        ))}
        <div className="labelBox" key={"verified"}>
          <input
            className="checkbox"
            type="checkbox"
            tabIndex={-1}
            id={"verified"}
            checked = {verifiedCheck}
            onChange={(e) => handleVerifiedCheck(e.target.checked)}
            name={"verified"}
          />
          <label htmlFor={"verified"} className="label">
            Verifisert
          </label>
        </div>


        {permission==1 &&
        <div className="labelBox" key={"not-verified"}>

          <input 
          className="checkbox"
          type="checkbox"
          tabIndex={-1}
          id={"not-verified"}
          checked={unverifiedCheck}
          onChange={(e)=> handleUnverifiedCheck(e.target.checked)}
          name={"not-verified"}
          />
         <label className="label" htmlFor={"not-verified"}>
          Ikke Verifisert
          </label>
          </div>}
      </FormControl>
    </div>
  );
}

export default FilterCheckbox;
