import React from "react";
import {ICard} from "../../../interfaces/ICard"
import "./card.scss"
 
const Button = ({ text, icon, link }: ICard ) => {
  return (
    <a href={link} target="_blank" className="card">
        <img src={icon} alt="test" />
        <p className="bold">{text}</p>
    </a>
  );
};

export default Button;