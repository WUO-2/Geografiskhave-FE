import { useNavigate } from "react-router-dom";
import "./treasureHunt.scss";
import arrowIcon from "../../../assets/icons/backIcon.svg";

const TreasureHunt = () => {
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
                  <div className="Line_Taskprogress"></div>
                </div>
                <div className="TasksProgress">4/6</div>
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

export default TreasureHunt;
