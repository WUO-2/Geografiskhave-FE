import Profile from "../../components/profile/profile/profile";
import { EProfilePage } from "../../interfaces/EProfilePage";
import "./ProfilePage.scss";
import PrizePage from "./PrizePage/PrizePage";
import BadgePage from "./BadgePage/BadgePage";
import { useState } from "react";
import Header from "../../components/shared/header/header";

const ProfilePage = () => {
  const [page, setPage] = useState<EProfilePage>(EProfilePage.PRIZES);

  return (
    <>
      <Header currentPage="Profil" />
      <div className="ProfilePage">
        <Profile />
        <div className="ProfilePage_Interaction">
          <button
            className={`ProfilePage_Interaction_Button ${page === EProfilePage.PRIZES ? "ProfilePage_Interaction_Button_Active" : ""}`}
            onClick={() => setPage(EProfilePage.PRIZES)}
          >
            Præmier
          </button>
          <button
            className={`ProfilePage_Interaction_Button ${page === EProfilePage.BADGES ? "ProfilePage_Interaction_Button_Active" : ""}`}
            onClick={() => setPage(EProfilePage.BADGES)}
          >
            Badges
          </button>
        </div>
        <div className="ProfilePage_PageContainer">
          {page === EProfilePage.PRIZES && <PrizePage />}
          {page === EProfilePage.BADGES && <BadgePage />}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
