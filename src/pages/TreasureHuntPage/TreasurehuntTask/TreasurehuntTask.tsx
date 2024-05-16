import React, { useEffect, useState } from "react";
import TreasurehuntMap from "../TreasurehuntMap/TreasurehuntMap";
import Header from "../../../components/shared/header/header";
import { useStore } from "../../../stores/store";
import "./TreasurehuntTask.scss";
import Button from "../../../components/shared/buttons/button";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import QuitMenu from "../../../components/quiz/quit/quitMenu";

const TreasurehuntTask = () => {
  const { treasureStore, authStore } = useStore();
  const [loading, setLoading] = useState(true);
  const [isQuit, setIsquit] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (treasureStore.currentTask === null) {
      load();
    } else {
      setLoading(false);
    }
  }, [authStore.user, treasureStore.currentTask]);

  const load = async () => {
    await treasureStore.startTreasureHunt(authStore.user!.id).then(() => {
      console.log(treasureStore.currentTask);
      setLoading(false);
    });
  };

  const handleClose = () => {
    console.log("close");
    setIsquit(true);
  };

  const handleReset = async () => {
    await treasureStore
      .endTreasureHunt(authStore.user!.id)
      .then(() => {
        treasureStore.setProgress(null)
      })
      .then(() => navigate("/"));
  }

  return (
    <>
      {!loading && (
        <div className={`TreasurehuntTask  TreasurehuntTask_Show`}>
          {isQuit && <QuitMenu 
            forsæt={() => setIsquit(false)} 
            start_forfra={() => handleReset()}
            afslut={() => navigate("/")}/>}
          <Header
            currentPage={`Opgave ${treasureStore.currentTask?.id}`}
            onClose={() => handleClose()}
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
      )}
      {loading && <h1>Loading..</h1>}
    </>
  );
};

export default observer(TreasurehuntTask);
