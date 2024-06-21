import Profile from "../../components/profile/profile/profile";
import { EProfilePage } from "../../interfaces/EProfilePage";
import "./ProfilePage.scss";
import PrizePage from "./PrizePage/PrizePage";
import BadgePage from "./BadgePage/BadgePage";
import { useEffect, useState } from "react";
import Header from "../../components/shared/header/header";
import { useStore } from "../../stores/store";
import { AchievementType, checkAchievement } from "../../utils/achievementUtil";
import { getAuth } from "firebase/auth";
import { observer } from "mobx-react-lite";
import Button from "../../components/shared/buttons/button";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [page, setPage] = useState<EProfilePage>(EProfilePage.PRIZES);
  const { authStore } = useStore();
  const auth = getAuth();
  const navigate = useNavigate();


  useEffect(() => {
    checkAchievement(authStore.user!.id, AchievementType.PROFILE).then(
      (response) => {
        if (response.message === undefined) {
          authStore.getUser(auth.currentUser!.uid);
          authStore.setNewAchievement(response.badge);
        }
      },
    );
  }, []);

  useEffect(() => {
    authStore.getSeasonPass(authStore.user!.id).then(() => {
      console.log("SEASONPASS :-)" + authStore.seasonPass);
    });
  });

  return (
    <>
      <Header currentPage="Profil" />
      <div className="ProfilePage">
        <Profile />
        <div className="Button_Wrapper">
        <Button
        text="Årskort/billet"
        onClick={() => navigate("/seasonpass")}
        />
        </div>
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

export default observer(ProfilePage);
