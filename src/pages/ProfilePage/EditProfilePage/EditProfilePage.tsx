import Header from "../../../components/shared/header/header";
import "./EditProfilePage.scss";

const EditProfilePage = () => {
  return (
    <>
      <Header currentPage="Rediger profil" />
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
