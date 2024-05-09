import { useNavigate } from "react-router-dom";
import Header from "../../../components/shared/header/header";
import "./EditProfilePage.scss";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <Header currentPage="Rediger profil" onBack={handleBack} />
      <div className="EditProfilePage">
        <h2>Rediger din profil</h2>
        <div className="EditProfilePage_Form">
          <input
            type="text"
            placeholder="Navn"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfilePage;
