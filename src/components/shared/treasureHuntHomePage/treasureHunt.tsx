import { useNavigate } from "react-router-dom";
import "./treasureHunt.scss";
import arrowIcon from "../../../assets/icons/backIcon.svg";
import { useStore } from "../../../stores/store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { getAuth } from "firebase/auth";

const TreasureHunt = () => {
  const navigate = useNavigate();
  const { treasureStore, authStore } = useStore();
  const auth = getAuth()
  useEffect(() => {
    if (!treasureStore.progress) {
      console.log(authStore.user?.id);
      if (authStore.user) {
        treasureStore.getCurrentTask(authStore.user.id);
      }
      //treasureStore.getCurrentTask(authStore.user!.id);
    }
    //authStore.getUser(auth.currentUser!.uid)
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
                {!treasureStore.currentTask && (
                  <>
                    {authStore.user?.treasureHuntStatus === "NOT_STARTED" && (
                      <p className="TreasureHunt_InfoContainer_Content_Text">
                        Opgave{" "}
                        {treasureStore.progress ? treasureStore.progress.id : 0}{" "}
                        |{" "}
                      </p>
                    )}

                    {authStore.user?.treasureHuntStatus === "IN_PROGRESS" && (
                      <p className="TreasureHunt_InfoContainer_Content_Text">
                        Skattejagt færdig |{" "}
                      </p>
                    )}

                    {authStore.user?.treasureHuntStatus === "FINISHED" && (
                      <p className="TreasureHunt_InfoContainer_Content_Text">
                        Opgave{" "}
                        {treasureStore.progress ? treasureStore.progress.id : 0}{" "}
                        |{" "}
                      </p>
                    )}
                  </>
                )}
                {treasureStore.currentTask && (
                  <p className="TreasureHunt_InfoContainer_Content_Text">
                    Opgave{" "}
                    {treasureStore.progress ? treasureStore.progress.id : 0} |{" "}
                  </p>
                )}
              </div>
              <div className="Right1">
                {!treasureStore.currentTask && (
                  <>
                    {authStore.user?.treasureHuntStatus === "NOT_STARTED" && (
                      <p className="TreasureHunt_InfoContainer_Content_Text">
                        {treasureStore.progress
                          ? treasureStore.progress.name
                          : "Start Skattejagt"}
                      </p>
                    )}
                    {authStore.user?.treasureHuntStatus === "IN_PROGRESS" && (
                      <p className="TreasureHunt_InfoContainer_Content_Text">
                        Saml puslespil{" "}
                      </p>
                    )}
                    {authStore.user?.treasureHuntStatus === "FINISHED" && (
                      <p className="TreasureHunt_InfoContainer_Content_Text">
                        {treasureStore.progress
                          ? treasureStore.progress.name
                          : "Start Skattejagt"}
                      </p>
                    )}
                  </>
                )}

                {treasureStore.currentTask && (
                  <p className="TreasureHunt_InfoContainer_Content_Text">
                    {treasureStore.progress
                      ? treasureStore.progress.name
                      : "Start Skattejagt"}
                  </p>
                )}
              </div>
            </div>
            <div className="TreasureHunt_InfoContainer_Progress">
              <div className="Progressbar">
                <div className="Line">
                  <div
                    className="Line_Taskprogress"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
                {!treasureStore.currentTask && (
                  <>
                    {authStore.user?.treasureHuntStatus === "NOT_STARTED" && (
                      <div className="TasksProgress">
                        {treasureStore.progress ? treasureStore.progress.id : 0}
                        /6
                      </div>
                    )}
                    {authStore.user?.treasureHuntStatus === "IN_PROGRESS" && (
                      <div className="TasksProgress">6/6</div>
                    )}
                    {authStore.user?.treasureHuntStatus === "FINISHED" && (
                      <div className="TasksProgress">
                        {treasureStore.progress ? treasureStore.progress.id : 0}
                        /6
                      </div>
                    )}
                  </>
                )}
                {treasureStore.currentTask && (
                  <div className="TasksProgress">
                    {treasureStore.progress ? treasureStore.progress.id : 0}
                    /6
                  </div>
                )}
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
