import Header from "../../../components/shared/header/header";
import "./PoiPage.scss";
import { IPoiPage } from "../../../interfaces/IPages";

const PoiPage = ({ showPopup, setShowPopup, selectedPoi }: IPoiPage) => {
  return (
    <div className={`selected-poi ${showPopup ? "selected-poi_active" : ""}`}>
      <Header
        currentPage={`${selectedPoi?.name}`}
        onBack={() => setShowPopup(false)}
      />
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
