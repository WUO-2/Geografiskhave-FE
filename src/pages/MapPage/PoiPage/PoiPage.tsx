import Header from "../../../components/shared/header/header";
import "./PoiPage.scss";
import { IPoiPage } from "../../../interfaces/IPages";
import { useStore } from "../../../stores/store";
import { ERole } from "../../../interfaces/IUser";
import UpdatePoi from "../UpdatePoi/UpdatePoi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/shared/buttons/button";

const PoiPage = ({ showPopup, setShowPopup, selectedPoi }: IPoiPage) => {
  const { authStore, mapStore } = useStore();
  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!authStore.user) return;
    if (!selectedPoi) return;
    await mapStore.deletePoi(selectedPoi!.id, authStore.user?.id).then(() => {
      setShowPopup(false);
    });
  };

  const handleEdit = () => {
    navigate("/kort/update");
  };

  return (
    <>
      <div className={`selected-poi ${showPopup ? "selected-poi_active" : ""}`}>
        <Header
          currentPage={`${selectedPoi?.name}`}
          onBack={() => {
            setShowPopup(false);
          }}
        />
        {authStore.user?.role === ERole.ADMIN && (
          <div className="selected-poi-buttons">
            <Button
              onClick={handleEdit}
              text="Opdater"
              size="small"
              color="orange"
            />
            <Button
              onClick={handleDelete}
              text="Slet"
              size="small"
              color="orange"
            />
          </div>
        )}
        <img
          src={selectedPoi?.imageURL}
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
    </>
  );
};

export default PoiPage;
