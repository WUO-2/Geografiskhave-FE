import React from "react";
import "./header.scss";
import { IHeader } from "../../../interfaces/IHeader";
import back from "../../../assets/icons/backIcon.svg";
import close from "../../../assets/icons/closeIcon.svg";

const Header = ({ currentPage, onBack, onClose }: IHeader) => {
  return (
    <div className="header">
      <div
        className="left-icon"
        onClick={onBack}
        style={{
          opacity: onBack ? "100%" : "0",
          pointerEvents: onBack ? "auto" : "none",
        }}
      >
        <img src={back} alt="back" />
      </div>
      <div className="currentPage">{currentPage}</div>
      <div
        className="right-icon"
        onClick={onClose}
        style={{
          opacity: onClose ? "100%" : "0",
          pointerEvents: onClose ? "auto" : "none",
        }}
      >
        <img src={close} alt="close" />
      </div>
    </div>
  );
};

export default Header;

