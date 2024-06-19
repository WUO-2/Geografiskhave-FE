import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./CreatePoi.scss";
import "../../../../node_modules/leaflet/dist/leaflet.css";
import { observer } from "mobx-react-lite";
import Header from "../../../components/shared/header/header";
import { MapContainer, TileLayer, Marker, useMapEvent } from "react-leaflet";
import { useStore } from "../../../stores/store";
import { transformIcon } from "../../../utils/IconUtil";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/shared/buttons/button";
import { ERole } from "../../../interfaces/IUser";
import Loader from "../../../components/shared/loader/loader.tsx";
import toast, { Toaster } from "react-hot-toast";
import placeholder from "../../../assets/images/upload_image.webp";

const MapEvents = ({ handleClick }: { handleClick: (e: any) => void }) => {
  useMapEvent("click", (e) => {
    handleClick(e);
  });

  return false;
};

const CreatePoi = () => {
  const { authStore, mapStore } = useStore();
  const navigate = useNavigate();
  const [newPoi, setNewPoi] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [selectedIcon, setSelectedIcon] = useState<string>(mapStore.Icons[0]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File>();
  const [imagePreview, setImagePreview] = useState<any>();

  useEffect(() => {
    load();
  }, [mapStore.Pois, mapStore.Icons]);

  const handleClick = (e: any) => {
    setNewPoi({
      id: 0,
      latitude: e.latlng.lat,
      longitude: e.latlng.lng,
      iconURL: selectedIcon,
    });
  };

  const load = async () => {
    if (authStore.user === null) return navigate("/auth");
    if (authStore.user?.role !== ERole.ADMIN) return navigate("/kort");

    if (mapStore.Pois.length > 0 && mapStore.Icons.length > 0) {
      setLoading(false);
      return;
    }
    await mapStore.fetchPois().then(async () => {
      await mapStore.fetchIcons().then(() => {
        setSelectedIcon(mapStore.Icons[0]);
        setLoading(false);
      });
    });
  };

  const handleSelectImage = (e: any) => {
    setImage(e.target.files[0]);
    console.log(image);
  };

  useEffect(() => {
    if (!image) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(image);
  }, [image]);

  const handleCreatePoi = async () => {
    if (name === "" || description === "" || image === undefined) {
      toast.error("Udfyld alle felter");
      return;
    }

    if (authStore.user === null) return navigate("/auth");

    const formData = new FormData();
    formData.append("userId", authStore.user.id);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("latitude", newPoi.latitude.toString());
    formData.append("longitude", newPoi.longitude.toString());
    formData.append("iconURL", selectedIcon);
    await mapStore.createPoi(formData).then(() => {
      navigate("/kort");
    });
  };

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div className="CreatePoi">
          <Toaster />
          {step === 1 && (
            <>
              <Header currentPage="Opret Poi" onBack={() => navigate(-1)} />
              <div className="CreatePoi_IconContainer">
                {mapStore.Icons.map((icon: string) => (
                  <div
                    className={`Icon ${selectedIcon === icon ? "selected" : ""}`}
                    onClick={() => setSelectedIcon(icon)}
                  >
                    <img src={icon} alt="icon" className={`Icon_image `} />
                  </div>
                ))}
              </div>

              <MapContainer
                center={[mapStore.Pois[0].latitude, mapStore.Pois[0].longitude]}
                zoom={17}
                scrollWheelZoom={true}
                id="Leaflet"
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {mapStore.Pois.map((poi) => (
                  <Marker
                    key={poi.id}
                    position={[poi.latitude, poi.longitude]}
                    icon={transformIcon(poi.iconURL, "test")}
                  ></Marker>
                ))}
                {newPoi && (
                  <Marker
                    position={[newPoi.latitude, newPoi.longitude]}
                    icon={transformIcon(newPoi.iconURL, "test")}
                  ></Marker>
                )}
                <MapEvents handleClick={handleClick} />
              </MapContainer>
              {newPoi && (
                <div className="CreatePoi_ButtonContainer">
                  <Button
                    onClick={() => setStep(2)}
                    text="Videre"
                    size="large"
                    color="green"
                  />
                </div>
              )}
            </>
          )}
          {step === 2 && (
            <>
              <Header currentPage="Opret Poi" onBack={() => setStep(1)} />
              <div className="CreatePoi_Form">
                <div className="CreatePoi_Form_ImageContainer">
                  <p className="CreatePoi_Form_ImageContainer_text">
                    Klik på billedet for at ændre
                  </p>
                  <img
                    src={` ${imagePreview !== undefined ? imagePreview : placeholder}`}
                    alt="placeholder"
                    className="CreatePoi_Form_ImageContainer_image"
                  />
                  <input
                    className="fileInput"
                    type="file"
                    onChange={handleSelectImage}
                    accept=".png, .jpg, jpeg"
                  />
                </div>
                <div className="CreatePoi_Form_input">
                  <input
                    className="CreatePoi_Form_input_Name"
                    type="text"
                    placeholder="Navn"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <textarea
                    className="CreatePoi_Form_input_Description"
                    placeholder="Beskrivelse"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Button
                    text="Opret Point Of Interest"
                    onClick={handleCreatePoi}
                    size="large"
                    color="green"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default observer(CreatePoi);
