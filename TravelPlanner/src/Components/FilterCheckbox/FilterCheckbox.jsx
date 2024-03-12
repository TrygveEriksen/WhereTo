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
   }
   else {
    setVerifiedCheck(false);
   }
   changeVerified()
  
  }

  const handleUnverifiedCheck = (e) => {
    if(e) {
      if(verifiedCheck) {
        setVerifiedCheck(false);
      }
      setUnverifiedCheck(true);
    }
    else {
      setUnverifiedCheck(false);
    }

    changeVerified()
    
  }
  const changeVerified = () => {
   handleVerified(verifiedCheck)
   handleUnverified(unverifiedCheck)
  }


  return (
    <div className="filterCheckbox">
      <FormControl component="fieldset" variant="standard">
        {allLabels.map((label, index) => (
          <label key={index} className="label">
            <input
              className="checkbox"
              type="checkbox"
              tabIndex={-1}
              onChange={() => handleFilter(label)}
              name={label}
            />
            {label}
          </label>
        ))}
        <label className="label">
          <input 
          className="checkbox"
          type="checkbox"
          tabIndex={-1}
          checked = {verifiedCheck}
          onChange={(e) => handleVerifiedCheck(e.target.checked)}
          name={"verified"}
          />
          Verifisert
        </label>
        {permission ? <label className="label">
          <input 
          className="checkbox"
          type="checkbox"
          tabIndex={-1}
          checked={unverifiedCheck}
          onChange={(e)=> handleUnverifiedCheck(e.target.checked)}
          name={"unverified"}
          />
          Ikke Verifisert
          </label>:null}
      </FormControl>
    </div>
  );
}

export default FilterCheckbox;
