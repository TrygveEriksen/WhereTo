import FormControl from "@mui/material/FormControl";
import "./FilterCheckbox.css";

function FilterCheckbox({ handleFilter }) {
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
              onChange={() => handleFilter(label)}
              name={label}
            />
            {label}
          </label>
        ))}
      </FormControl>
    </div>
  );
}

export default FilterCheckbox;
