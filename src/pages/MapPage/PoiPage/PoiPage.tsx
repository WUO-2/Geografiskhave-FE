import React, { Dispatch, SetStateAction } from "react";
import Header from "../../../components/shared/header/header";
import { IPoi } from "../../../interfaces/IPois";
import "./PoiPage.scss";

const PoiPage = ({
  showPopup,
  setShowPopup,
  selectedPoi,
}: {
  showPopup: boolean;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
  selectedPoi: IPoi | null;
}) => {
  return (
    <div className={`selected-poi ${showPopup ? "selected-poi_active" : ""}`}>
      <Header
        currentPage={`${selectedPoi?.name}`}
        onBack={() => setShowPopup(false)}
      />{" "}
      <img
        src="https://via.placeholder.com/390x300"
        alt="placeholder"
        className="selected-poi-image"
      />
      <div className="selected-poi-wrapper">
        <h1 className="selected-poi-title">
          {selectedPoi !== null ? selectedPoi.name : ""}
        </h1>
        <p className="selected-poi-description">
          {selectedPoi !== null ? selectedPoi.description : ""}
        </p>
      </div>
    </div>
  );
};

export default PoiPage;
