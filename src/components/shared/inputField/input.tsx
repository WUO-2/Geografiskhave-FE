import { IInput } from "../../../interfaces/IInput";
import "./input.scss";
import React, { useState } from "react";

const Input = ({ type, placeholder, value, onChange, icon }: IInput) => {
  const [inputType, setInputType] = useState(
    type !== undefined ? type : "text",
  );
  const handleClick = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <div className="input_container">
      <input
        type={inputType}
        placeholder={placeholder}
        onChange={(e) => (onChange ? onChange(e) : {})}
        value={value}
      />
      {icon !== undefined && (
        <div className="input_icon_container" onClick={handleClick}>
          <img src={icon} />
        </div>
      )}
    </div>
  );
};

export default Input;
