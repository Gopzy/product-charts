import { useState } from "react";

export default function DropdownMenu({
  options,
  onSelect,
  selectedCategories,
}) {
  return (
    <select
      value={selectedCategories}
      // value={options?.find(function (option) {
      //   return option.value === selectedCategories;
      // })}
      onChange={(event) => onSelect(event.target.value)}
    >
      <option value="">Select Categories</option>
      {options?.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
