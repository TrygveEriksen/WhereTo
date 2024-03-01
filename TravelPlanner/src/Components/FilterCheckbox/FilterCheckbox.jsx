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
    "Ute liv",
  ];

  return (
    <div>
      <FormControl component="fieldset" variant="standard">
        {allLabels.map((label, index) => (
          <label key={index} className="label">
            <input
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
