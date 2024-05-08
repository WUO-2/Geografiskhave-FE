import Header from "../../components/shared/header/header";
import "./PayPage.scss";
import { useNavigate } from "react-router-dom";
import { SwipeableButton } from "react-swipeable-button";

const TreasureHuntPage = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="PayPage">
        <Header currentPage="Brug mønter" onBack={() => handleBack()} />
        <div className="PayPage_ImageContainer"></div>

        <div className="PayPage_ContentContainer">
          <div className="PayPage_ContentContainer_Header">
            Skarø is
          </div>
          <div className="bold Orange_Text">
            35 Eventyrmønter
          </div>
          <div className="PayPage_ContentContainer_Text">
            Nyd en forfriskende kugle is fra Skarø! Denne lækre præmie gælder for 2x is med én kugle. Præmien kan indløses i Geografisk Haves café, og køb kan ikke fortrydes.
          </div>

           <SwipeableButton
                onSuccess={() => console.log("bob")}
                text="Brug Eventyrmønter"
                text_unlocked="Betalt"
           />

        </div>
      </div>
    </>
  );
};

export default TreasureHuntPage;