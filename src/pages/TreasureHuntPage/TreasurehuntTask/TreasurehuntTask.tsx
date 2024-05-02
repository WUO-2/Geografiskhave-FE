import React, { useEffect, useState } from "react";
import TreasurehuntMap from "../TreasurehuntMap/TreasurehuntMap";
import Header from "../../../components/shared/header/header";
import { useStore } from "../../../stores/store";
import "./TreasurehuntTask.scss";
import Button from "../../../components/shared/buttons/button";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

const TreasurehuntTask = () => {
  const { treasureStore, authStore } = useStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (authStore.user !== null && treasureStore.currentTask === null) {
      treasureStore.startTreasureHunt(authStore.user!.id);
    }
  }, [authStore.user, treasureStore.currentTask]);
  return (
    <>
      <div className={`TreasurehuntTask  TreasurehuntTask_Show`}>
        <Header
          currentPage={`Opgave ${treasureStore.currentTask?.id}`}
          onClose={() => navigate("/")}
        />
        <div className="TreasurehuntTask_Wrapper">
          <img
            className="TreasurehuntTask_Wrapper_Image"
            src={treasureStore.currentTask?.imageURL}
            alt=""
          />
          <div className="TreasurehuntTask_Wrapper_Content">
            <h1 className="TreasurehuntTask_Wrapper_Content_Title">
              Opgave {treasureStore.currentTask?.id}:{" "}
              {treasureStore.currentTask?.name}
            </h1>
            <p className="TreasurehuntTask_Wrapper_Content_Description">
              {treasureStore.currentTask?.info}{" "}
            </p>
            <Button
              onClick={() => navigate("/skattejagt/map")}
              text="Se lokation"
              size="large"
              color="green"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(TreasurehuntTask);
