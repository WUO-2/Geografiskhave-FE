import React from "react";
import "./header.scss";
import { IHeader } from "../../../interfaces/IHeader";
import back from "../../../assets/icons/backIcon.svg";
import close from "../../../assets/icons/closeIcon.svg";
import { useStore } from "../../../stores/store";
import { useNavigate } from "react-router-dom";

const Header = ({ currentPage, onBack, onClose }: IHeader) => {
  const { authStore, treasureStore } = useStore();
  const navigate = useNavigate();

  const handleBack = async () => {
    if (authStore.user?.id === undefined) return;
    if (onBack === undefined) return;
    await treasureStore.getCurrentTask(authStore.user.id).then(() => {
      onBack();
    });
  };

  const handleClose = async () => {
    if (authStore.user?.id === undefined) return;
    if (onClose === undefined) return;
    await treasureStore.getCurrentTask(authStore.user.id).then(() => {
      onClose();
    });
  };

  return (
    <div className="header">
      <div
        className="left-icon"
        onClick={() => handleBack()}
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
        onClick={() => handleClose()}
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
