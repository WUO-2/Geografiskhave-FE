import { useNavigate } from "react-router-dom";
import "./treasureHunt.scss";

const TreasureHunt = ({ currentTask }) => {
  const navigate = useNavigate();
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
                  Opgave 4 |{" "}
                </p>
              </div>
              <div className="Right1">
                <p className="TreasureHunt_InfoContainer_Content_Text">
                  Naturhaven
                </p>
              </div>
            </div>
            <div className="TreasureHunt_InfoContainer_Progress">
              <div className="Progressbar">
                <div className="Line">
                  <div
                    className="Line_Taskprogress"
                    style={{ width: (currentTask / 6) * 100 +'%' }}
                  ></div>
                </div>
                <div className="TasksProgress">{currentTask}/6</div>
              </div>
              <div className="TreasureHunt_BackButton">
                <img src="./src/assets/icons/edit.svg" alt="Back Arrow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreasureHunt;
