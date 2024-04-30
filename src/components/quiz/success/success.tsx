import React, { useEffect, useState } from "react";
import "./success.scss";
import { observer } from "mobx-react-lite";
import Button from "../../shared/buttons/button";
import { useNavigate, useParams } from "react-router-dom";
import { Clamp } from "../../../utils/Clamp";
import Header from "../../shared/header/header.tsx";
import { useStore } from "../../../stores/store.ts";

const Success = () => {
  const [totalSteps, setTotalSteps] = useState(6);
  const [currentStep, setCurrentStep] = useState(2);
  const params = useParams();
  const navigate = useNavigate();
  const { treasureStore, authStore } = useStore();

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
    // navigate(`/quiz/${currentStep + 1}`);
  };

  return (
    <>
      <Header currentPage="Opgave klaret!" onClose={() => console.log("asd")} />
      <div className="Success">
        <div className="Success_Wrapper">
          <div className="Success_Wrapper_Info">
            <h1 className="Success_Wrapper_Info_Title">Godt klaret!</h1>
            <p className="Success_Wrapper_Info_Paragraph">Ny puslebrik</p>
          </div>
          <div className="Success_Wrapper_ImageContainer">
            <img
              src="https://www.pngkey.com/png/full/115-1150152_treasure-chest-png-clip-art-image-pirate-treasure.png"
              alt="treasure"
            />
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
