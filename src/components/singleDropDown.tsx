import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { catagories, products } from "../types/type";

export default function SingleDropdownMenu({
  options,
  onSelect,
  selectedOptions,
  disabled,
}: {
  options: catagories | products[];
  onSelect: Function;
  selectedOptions: any;
  disabled: boolean;
}) {
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    setSelectedValue(selectedOptions);
  }, [selectedOptions]);

  return (
    <FormControl fullWidth>
      <InputLabel id="label">Select Categories</InputLabel>
      <Select
        disabled={disabled}
        value={selectedValue}
        onChange={(event) => onSelect(event.target.value)}
      >
        {options?.map((el, index) => {
          return (
            <MenuItem key={index} value={el}>
              {el}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
