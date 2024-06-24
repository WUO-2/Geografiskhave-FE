import { IInput } from "../../../interfaces/IInput";
import "./input.scss";
import React, { useState } from "react";

const Input = ({ type, placeholder, value, onChange, onBlur,isWrong, iconShow, iconHide }: IInput) => {
  const [inputType, setInputType] = useState(
    type !== undefined ? type : "text",
  );

  // --------------------------------------
  const handleClick = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };
  
  return (
    <div className={`input_container ${isWrong? "wrong" : ""}`}>
      <input
        type={inputType}
        placeholder={placeholder}
        onChange={(e) => (onChange ? onChange(e) : {})}
        onBlur={() => onBlur ? onBlur() : {}}
        value={value}
      />
         {/* -------------------------------------- */}
      {iconShow !== undefined && iconHide !== undefined ? (
        <div className="input_icon_container" onClick={handleClick}>
          {inputType === "password" ? 
          <img src={iconHide} /> :
          <img src={iconShow} />
          }
          
        </div>
      ) : 
      ""
      }
    </div>
  );
};

export default Input;
