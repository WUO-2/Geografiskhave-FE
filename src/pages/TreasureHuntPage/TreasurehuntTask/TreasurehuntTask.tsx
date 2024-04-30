import React, { useEffect, useState } from "react";
import TreasurehuntMap from "../TreasurehuntMap/TreasurehuntMap";
import Header from "../../../components/shared/header/header";
import { useStore } from "../../../stores/store";
import "./TreasurehuntTask.scss";
import Button from "../../../components/shared/buttons/button";
import { ITreasurehuntTask } from "../../../interfaces/IPages";

const TreasurehuntTask = ({ showTask, setShowTask }: ITreasurehuntTask) => {
  const [showMap, setShowMap] = useState(false);
  const { treasureStore } = useStore();

  return (
    <>
      <div
        className={`TreasurehuntTask ${showTask && !showMap ? "TreasurehuntTask_Show" : ""}`}
      >
        <Header
          currentPage={`Opgave ${treasureStore.currentTask?.id}`}
          onClose={() => setShowTask(false)}
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
              onClick={() => setShowMap(true)}
              text="Se lokation"
              size="large"
              color="green"
            />
          </div>
        </div>
      </div>
      {showMap && <TreasurehuntMap show={showMap} setShow={setShowMap} />}
    </>
  );
};

export default TreasurehuntTask;
