import React, { useEffect, useState } from "react";
import TreasurehuntMap from "../TreasurehuntMap/TreasurehuntMap";
import Header from "../../../components/shared/header/header";
import { useStore } from "../../../stores/store";
import "./TreasurehuntTask.scss";
import Button from "../../../components/shared/buttons/button";

const TreasurehuntTask = ({
  showTask,
  setShowTask,
}: {
  showTask: boolean;
  setShowTask: any;
}) => {
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
          <img src="https://via.placeholder.com/150" alt="placeholder" />
          <div className="TreasurehuntTask_Wrapper_Content">
            <h1 className="TreasurehuntTask_Wrapper_Content_Title">
              Opgave {treasureStore.currentTask?.id}:{" "}
              {treasureStore.currentTask?.name}
            </h1>
            <p className="TreasurehuntTask_Wrapper_Content_Description">
              Lorem ipsum dolor sit amet, officia excepteur ex fugiat
              reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit
              ex esse exercitation amet. Nisi anim cupidatat excepteur officia.
              Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet
              voluptate voluptate dolor minim nulla est proident. Nostrud
              officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex
              occaecat reprehenderit commodo officia dolor Lorem duis laboris
              cupidatat officia voluptate. Culpa proident adipisicing id nulla
              nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua
              reprehenderit commodo ex non excepteur duis sunt velit enim.
              Voluptate laboris sint cupidatat ullamco ut ea consectetur et est
              culpa et culpa duis.
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
