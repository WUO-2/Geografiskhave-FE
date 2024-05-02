import { useNavigate } from "react-router-dom";
import "./treasureHunt.scss";
import arrowIcon from "../../../assets/icons/backIcon.svg";
import { useStore } from "../../../stores/store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

const TreasureHunt = () => {
  const navigate = useNavigate();
  const { treasureStore, authStore } = useStore();
  useEffect(() => {
    if (!treasureStore.progress) {
      console.log(authStore.user?.id);
      if (authStore.user) {
        treasureStore.getCurrentTask(authStore.user.id);
      }
      //treasureStore.getCurrentTask(authStore.user!.id);
    }
    console.log("TreasureHunt useEffect ", treasureStore.progress);
  }, [treasureStore.progress, authStore.user]);

  const completionPercentage = treasureStore.progress
  ? (treasureStore.progress.id / 6) * 100 
  : 0;

  const handleClick = () => {
    navigate("/skattejagt");
  };

  return (
    <div className="TreasureHunt" onClick={handleClick}>
      <div className="TreasureHunt_Container">
        <div className="TreasureHunt_ImageContainer">
          <div className="TreasureHunt_InfoContainer">
            <div className="TreasureHunt_InfoContainer_Header">
              Geografisk eventyr
            </div>
            <div className="TreasureHunt_InfoContainer_Content">
              <div className="Left1">
                <p className="TreasureHunt_InfoContainer_Content_Text">
                  Opgave{" "}
                  {treasureStore.progress ? treasureStore.progress.id : 0} |{" "}
                </p>
              </div>
              <div className="Right1">
                <p className="TreasureHunt_InfoContainer_Content_Text">
                  {treasureStore.progress
                    ? treasureStore.progress.name
                    : "Start Skattejagt"}
                </p>
              </div>
            </div>
            <div className="TreasureHunt_InfoContainer_Progress">
              <div className="Progressbar">
                <div className="Line">
                  <div className="Line_Taskprogress" style={{ width: `${completionPercentage}%` }}></div>
                </div>
                <div className="TasksProgress">
                  {treasureStore.progress ? treasureStore.progress.id : 0}
                  /6
                </div>
              </div>
              <div className="TreasureHunt_InfoContainer_Progress_Arrow">
                <img src={arrowIcon} alt="arrow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(TreasureHunt);
