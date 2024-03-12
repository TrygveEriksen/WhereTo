import FormControl from "@mui/material/FormControl";
import "./FilterCheckbox.css";

function FilterCheckbox({ handleFilter, handleVerified }) {
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
            id={"verified"}
            defaultChecked
            onChange={() => handleVerified()}
            name={"verified"}
          />
          <label htmlFor={"verified"} className="label">
            Verifisert
          </label>
        </div>
      </FormControl>
    </div>
  );
}

export default FilterCheckbox;
