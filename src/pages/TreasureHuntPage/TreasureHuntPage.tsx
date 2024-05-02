import Header from "../../components/shared/header/header";
import "./TreasureHuntPage.scss";
import Button from "../../components/shared/buttons/button";
import TimeIcon from "../../assets/icons/timeIcon.svg";
import Distanceicon from "../../assets/icons/distanceIcon.svg";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../stores/store";
import { useEffect, useState } from "react";
import TreasurehuntTask from "./TreasurehuntTask/TreasurehuntTask";

const TreasureHuntPage = () => {
  const navigate = useNavigate();
  const { treasureStore, authStore } = useStore();

  const handleClick = async () => {
    await treasureStore.startTreasureHunt(authStore.user!.id).then(() => {
      //setShowTask(true);
      navigate("/skattejagt/task");
    });
  };

  useEffect(() => {
    if (treasureStore.currentTask) {
      navigate("/skattejagt/task");
    }
  }, [treasureStore.currentTask]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="TreasureHuntPage">
        <Header currentPage="Skattejagt" onBack={() => handleBack()} />
        <div className="TreasureHuntPage_ImageContainer"></div>

        <div className="TreasureHuntPage_ContentContainer">
          <div className="TreasureHuntPage_ContentContainer_Header">
            Geografisk eventyr
          </div>
          <div className="TreasureHuntPage_ContentContainer_Text">
            Er I klar til en spændende skattejagt gennem Geografisk Have?
            <br />
            <br />I haven venter der spændende og sjove opgaver, og ikke mindst
            et puslespil, som I skal samle sammen til under skattejagten. Når
            jeres eventyr er fuldført, venter der en skøn præmie til alle
            skattejægerne!
          </div>

          <div className="TreasureHuntPage_ContentContainer_Icons">
            <div className="Time_Icon bold">
              {" "}
              <img src={TimeIcon} alt="Tids ikon" />
              30 minutter
            </div>
            <div className="Distance_Icon bold">
              {" "}
              <img src={Distanceicon} alt="Tids ikon" />1 kilometer
            </div>
          </div>

          <div className="TreasureHuntPage_ContentContainer_StartButton">
            <Button
              text="Start skattejagt"
              size="large"
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TreasureHuntPage;
