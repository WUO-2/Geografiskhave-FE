import Header from "../../../components/shared/header/header";
import { useNavigate } from "react-router-dom";
import "./SeasonPassPage.scss";

const SeasonPassPage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Header currentPage="Årskort" onBack={handleBack} />
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
