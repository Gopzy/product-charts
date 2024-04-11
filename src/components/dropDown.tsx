import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export default function DropdownMenu({
  options,
  onSelect,
  selectedOptions,
  disabled,
}) {
  return (
    <FormControl fullWidth>
      <InputLabel id="label">Select Categories</InputLabel>
      <Select
        disabled={disabled}
        value={options?.find(function (option) {
          return option.value === selectedOptions;
        })}
        onChange={(event) => onSelect(event.target.value)}
      >
        {options?.map((el, index) => {
          const objectType = typeof el === "object";
          return (
            <MenuItem key={index} value={objectType ? el.title : el}>
              {objectType ? el.title : el}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
