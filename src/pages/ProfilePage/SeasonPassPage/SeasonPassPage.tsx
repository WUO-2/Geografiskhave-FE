import Header from "../../../components/shared/header/header";
import { useNavigate } from "react-router-dom";
import "./SeasonPassPage.scss";
import SeasonPass from "../../../components/seasonPass/seasonPass";
import { useStore } from "../../../stores/store";

const SeasonPassPage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const { authStore } = useStore();

  return (
    <>
      <Header currentPage="Årskort/billet" onBack={handleBack} />
      <div className="SeasonPassPage">
        <div className="SeasonPassPage_SeasonPass">
          {authStore.seasonPass !== null ? (
            <SeasonPass />
          ) : (
            <div className="NoSeasonPass">
              Der er ingen årskort tilknyttet :-)
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SeasonPassPage;
