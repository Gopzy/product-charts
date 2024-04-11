import { useState } from "react";

export default function ProductDropDownMenu({
  options,
  onSelect,
  selectedCategories,
  disabled,
}) {
  return (
    <select
      disabled={disabled}
      // value={selectedCategories}
      value={options?.find(function (option) {
        return option.value === selectedCategories;
      })}
      onChange={(event) => onSelect(event.target.value)}
    >
      <option value="">Select Products</option>
      {options?.map(({ title, price }, index) => (
        <option key={index} value={title}>
          {title}
        </option>
      ))}
    </select>
  );
}
