import FormControl from "@mui/material/FormControl";
import "./FilterCheckbox.css";

function FilterCheckbox({ handleFilter, handleVerified,handleUnverified,permission}) {
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
          defaultChecked
          onChange={(e) => handleVerified(e.target.checked)}
          name={"verified"}
          />
          Verifisert
        </label>
        {permission ? <label className="label">
          <input 
          className="checkbox"
          type="checkbox"
          tabIndex={-1}
          onChange={(e)=> handleUnverified(e.target.checked)}
          name={"unverified"}
          />
          Ikke Verifisert
          </label>:null}
      </FormControl>
    </div>
  );
}

export default FilterCheckbox;
