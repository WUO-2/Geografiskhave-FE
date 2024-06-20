import Header from "../../../components/shared/header/header";
import { useNavigate } from "react-router-dom";
import "./SeasonPassPage.scss";
import { useStore } from "../../../stores/store";
import { useEffect } from "react";

const SeasonPassPage = () => {
  const navigate = useNavigate();
  const { authStore } = useStore();
  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    authStore.getSeasonPass(authStore.user!.id).then((seasonPass) => {
      console.log("SEASONPASS :-)" + seasonPass);
    });
  });

  return (
    <>
      <Header currentPage="Årskort/billet" onBack={handleBack} />
      <div className="SeasonPassPage">
        <div className="SeasonPassPage_SeasonPass">
          <h1>Årskort</h1>
          <p>Her kan du se dit årskort.</p>
        </div>
      </div>
    </>
  );
};

export default SeasonPassPage;
