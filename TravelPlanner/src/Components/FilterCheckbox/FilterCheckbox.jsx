import FormControl from "@mui/material/FormControl";
import "./FilterCheckbox.css";

function FilterCheckbox({ handleFilter, handleVerified}) {
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
          defaultChecked
          onChange={() => handleVerified()}
          name={"verified"}
          />
          Verifisert
        </label>
      </FormControl>
    </div>
  );
}

export default FilterCheckbox;
