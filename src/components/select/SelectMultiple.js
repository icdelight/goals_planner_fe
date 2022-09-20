import React, { useState } from "react";
import Select from "react-select";

const SelectMultiple = ({ options = [] }) => {
  const [value, setValue] = useState();

  options =
    options.length === 0
      ? [
          { value: "Breadstick", label: "Breadstick" },
          { value: "Biscotti", label: "Biscotti" },
          { value: "Fougasse", label: "Fougasse" },
          { value: "Lefse", label: "Lefse" },
          { value: "Melonpan", label: "Melonpan" },
          { value: "Naan", label: "Naan" },
          { value: "Panbrioche", label: "Panbrioche" },
          { value: "Rewena", label: "Rewena" },
          { value: "Shirmal", label: "Shirmal" },
          { value: "Tunnbröd", label: "Tunnbröd" },
          { value: "Vánočka", label: "Vánočka" },
          { value: "Zopf", label: "Zopf" },
        ]
      : options;
  return (
    <Select
      classNamePrefix="react-select"
      isMulti
      options={options}
      value={value}
      onChange={setValue}
      placeholder=""
    />
  );
};

export default SelectMultiple;
