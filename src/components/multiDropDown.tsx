import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { catagories, products } from "../types/type";

const MultiDropDown = ({
  options,
  onSelect,
  selectedOptions,
  disabled,
}: {
  options: catagories | products[];
  onSelect: Function;
  selectedOptions: any;
  disabled: boolean;
}) => {
  const [selectedOption, setSelectedValue] = useState<string[]>([]);

  const selectedTitleArray = selectedOptions.map(({ title }) => title);

  useEffect(() => {
    setSelectedValue(selectedTitleArray);
  }, [selectedTitleArray]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedValue(typeof value === "string" ? value.split(",") : value);
    onSelect(value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="label">Select Option</InputLabel>
      <Select
        multiple
        value={selectedOption}
        onChange={handleChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => selected.join(", ")}
        disabled={disabled}
      >
        {options?.map((el, index) => {
          return (
            <MenuItem key={index} value={el?.title}>
              <Checkbox checked={selectedOption?.indexOf(el?.title) > -1} />
              <ListItemText primary={el?.title} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default MultiDropDown;
