import React, { useEffect, useState } from "react";
import "./success.scss";
import { observer } from "mobx-react-lite";
import Button from "../../shared/buttons/button";
import { useNavigate, useParams } from "react-router-dom";
import { Clamp } from "../../../utils/Clamp";
import Header from "../../shared/header/header.tsx";
import { useStore } from "../../../stores/store.ts";
import puzzle1 from "../../../assets/puzzlePieces/puzzle_piece1.png";
import puzzle2 from "../../../assets/puzzlePieces/puzzle_piece2.png";
import puzzle3 from "../../../assets/puzzlePieces/puzzle_piece3.png";
import puzzle4 from "../../../assets/puzzlePieces/puzzle_piece4.png";
import puzzle5 from "../../../assets/puzzlePieces/puzzle_piece5.png";
import puzzle6 from "../../../assets/puzzlePieces/puzzle_piece6.png";
import QuitMenu from "../quit/quitMenu.tsx";

const Success = () => {
  const [totalSteps, setTotalSteps] = useState(6);
  const [currentStep, setCurrentStep] = useState(2);
  const params = useParams();
  const navigate = useNavigate();
  const { treasureStore, authStore } = useStore();
  const pieces = [puzzle1, puzzle2, puzzle3, puzzle4, puzzle5, puzzle6];
  const [isQuit, setIsquit] = useState<boolean>(false);

  useEffect(() => {
    setCurrentStep(
      Clamp(Number.parseInt(params.id !== undefined ? params.id : "1"), 1, 6),
    );
  }, []);

  const listSteps = () => {
    const stepItems = [];
    for (let i = 1; i <= totalSteps; i++) {
      stepItems.push(
        <div
          key={i}
          style={{ background: i <= currentStep ? "#fd8721" : "#D9D9D9" }}
          className={`Success_Wrapper_Progress_Container_Item `}
        ></div>,
      );
    }

    return stepItems;
  };

  const handleNextStep = () => {
    treasureStore
      .startTreasureHunt(authStore.user!.id)
      .then(() => navigate("/skattejagt"));
  };

  const handleReset = async () => {
    await treasureStore
      .endTreasureHunt(authStore.user!.id)
      .then(() => {
        treasureStore.setProgress(null);
      })
      .then(() => navigate("/"));
  };

  return (
    <>
      {isQuit && (
        <QuitMenu
          forsæt={() => setIsquit(false)}
          start_forfra={() => handleReset()}
          afslut={() => navigate("/")}
        />
      )}
      <Header currentPage="Opgave klaret" onClose={() => setIsquit(true)} />
      <div className="Success">
        <div className="Success_Wrapper">
          <div className="Success_Wrapper_Info">
            <h1 className="Success_Wrapper_Info_Title">Godt klaret!</h1>
            <p className="Success_Wrapper_Info_Paragraph">Ny puslebrik</p>
          </div>
          <div className="Success_Wrapper_ImageContainer">
            <img src={pieces[currentStep - 1]} alt="treasure" />
          </div>
          <div className="Success_Wrapper_Flavor">
            <p className="Success_Wrapper_Flavor_Text">
              I gættede rigtigt og har fået en puslebrik til puslespillet
            </p>
          </div>
          <div className="Success_Wrapper_Progress">
            <p className="Success_Wrapper_Progress_Text">
              I har klaret {currentStep} ud af {totalSteps} opgaver
            </p>
            <div className="Success_Wrapper_Progress_Container">
              {listSteps()}
            </div>
          </div>
        </div>
        <div className="Success_ButtonContainer">
          <Button
            text="Næste opgave"
            size="large"
            onClick={() => handleNextStep()}
            color="green"
          />
        </div>
      </div>
    </>
  );
};

export default observer(Success);
