import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Header from "../../../components/shared/header/header";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/shared/buttons/button";
import "./UpdatePoi.scss";
import { useStore } from "../../../stores/store";
import Loader from "../../../components/shared/loader/loader";
import toast, { Toaster } from "react-hot-toast";
import { IPoiPage } from "../../../interfaces/IPages";
import { IPoi } from "../../../interfaces/IPois";

const UpdatePoi = () => {
  const navigate = useNavigate();
  const { authStore, mapStore } = useStore();
  const [name, setName] = useState<string>(
    mapStore.selectedPoi !== null ? mapStore.selectedPoi?.name : "",
  );
  const [description, setDescription] = useState<string>(
    mapStore.selectedPoi !== null ? mapStore.selectedPoi?.description : "",
  );
  const [image, setImage] = useState<File>();
  const [imagePreview, setImagePreview] = useState<any>();

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

  useEffect(() => {
    console.log(mapStore.selectedPoi);
    return () => {
      mapStore.setSelectedPoi(null);
    };
  }, []);

  const handleUpdatePoi = async () => {
    try {
      console.log(mapStore.selectedPoi);
      if (mapStore.selectedPoi === null) return;

      if (name === "" || description === "") {
        toast.error("Udfyld alle felter");
        return;
      }

      if (authStore.user === null) return navigate("/auth");
      const formData = new FormData();

      formData.append("userId", authStore.user!.id);
      formData.append("name", name);
      formData.append("description", description);
      if (image !== undefined) {
        formData.append("image", image);
      } else {
        formData.append("imageURL", mapStore.selectedPoi.imageURL);
      }
      formData.append("latitude", mapStore.selectedPoi.latitude.toString());
      formData.append("longitude", mapStore.selectedPoi.longitude.toString());
      formData.append("iconURL", mapStore.selectedPoi.iconURL);
      await mapStore.updatePoi(mapStore.selectedPoi!.id, formData).then(() => {
        navigate("/kort");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const test = () => {
    console.log(mapStore.selectedPoi);
    if (mapStore.selectedPoi === null) return;

    if (name === "" || description === "") {
      toast.error("Udfyld alle felter");
      return;
    }

    if (authStore.user === null) return navigate("/auth");
    const formData = new FormData();

    formData.append("userId", authStore.user!.id);
    formData.append("name", name);
    formData.append("description", description);
    if (image !== undefined) {
      formData.append("image", image);
    } else {
      formData.append("imageURL", mapStore.selectedPoi.imageURL);
    }
    formData.append("latitude", mapStore.selectedPoi.latitude.toString());
    formData.append("longitude", mapStore.selectedPoi.longitude.toString());
    formData.append("iconURL", mapStore.selectedPoi.iconURL);
    console.log(formData);
  };

  return (
    <div className="UpdatePoi">
      <>
        <Toaster />
        <Header
          currentPage="Opdater Point of Interest"
          onBack={() => navigate("/kort")}
        />
        <div className="UpdatePoi_Form">
          <div className="UpdatePoi_Form_ImageContainer">
            <p className="UpdatePoi_Form_ImageContainer_text">
              Klik på billedet for at ændre
            </p>
            <img
              src={` ${imagePreview !== undefined ? imagePreview : mapStore.selectedPoi !== null ? mapStore.selectedPoi!.imageURL : ""}`}
              alt="placeholder"
              className="UpdatePoi_Form_ImageContainer_image"
            />
            <input
              className="fileInput"
              type="file"
              onChange={handleSelectImage}
              accept=".png, .jpg, jpeg"
            />
          </div>
          <div className="UpdatePoi_Form_input">
            <input
              className="UpdatePoi_Form_input_Name"
              type="text"
              placeholder="Navn"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <textarea
              className="UpdatePoi_Form_input_Description"
              placeholder="Beskrivelse"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <Button
              text="Opdater Point Of Interest"
              onClick={() => handleUpdatePoi()}
              size="large"
              color="green"
            />
          </div>
        </div>
      </>
    </div>
  );
};

export default UpdatePoi;
