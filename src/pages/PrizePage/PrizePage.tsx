import React, { useEffect, useState } from "react";

import "./PrizePage.scss";
import Coin from "../../assets/Mønt.png";
import BadgeTest from "../../assets/images/badges/BadgeProfil.png";
import DefButton from "../../components/shared/buttons/button";

import Confetti from "react-confetti";

import { useNavigate } from "react-router-dom";

import { useStore } from "../../stores/store";
import { getAuth } from "firebase/auth";
import { AchievementType, checkAchievement } from "../../utils/achievementUtil";
import { observer } from "mobx-react-lite";
import { IBadge } from "../../interfaces/IUser";

function PrizePage() {
  const [achievementUnlock, setAchievementUnlock] = useState(false);
  const [badgeImage, setBadgeImage] = useState("");
  const navigate = useNavigate();
  const { treasureStore, authStore } = useStore();
  const auth = getAuth();

  useEffect(() => {
    checkAchievement(authStore.user!.id, AchievementType.TREASUREHUNT).then(
      (response) => {
        if (response.message === undefined) {
          setAchievementUnlock(true);
          setBadgeImage(findBadge(response.badgeId));
          authStore.getUser(auth.currentUser!.uid);
        }
      },
    );
  }, []);

  const findBadge = (id: number) => {
    const badge = authStore.user?.badges.find((badge) => {
      return badge.badgeId === id;
    });
    console.log(badge?.badge.imageURL);
    return badge !== undefined
      ? badge?.badge.imageURL
      : authStore.user!.badges[0].badge.imageURL;
  };

  const handleUpdatePoints = async (points: number) => {
    const response = await treasureStore.updatePoints(
      authStore.user!.id,
      points,
    );
    await authStore.getUser(authStore.user!.id);
    console.log(response.totalPoints);
  };

  return (
    <div className="prizePage">
      <Confetti numberOfPieces={100} gravity={0.025} />
      <h2>Tillykke!</h2>
      {achievementUnlock && (
        <>
          <p className="underTitle">Nyt badge</p>
          <img className="badge" src={badgeImage} alt="" />
        </>
      )}
      <h2>Skatteeventyrer</h2>
      {achievementUnlock && (
        <p className="underTitle">
          Godt gådt! Du har gennemført din første skattejagt gennem haven.
        </p>
      )}
      {!achievementUnlock && (
        <p className="underTitle">
          Godt gået! du har gennemført skattejagten gennem haven.
        </p>
      )}

      <div className="yellowBubble bold">
        Plus <img className="coin" src={Coin} alt="" /> 55 Eventyrmønter og en
        hemmelig præmie
      </div>

      <DefButton
        text="Indløs præmie"
        onClick={() => {
          handleUpdatePoints(55);
          navigate("/profile");
        }}
      />
    </div>
  );
}

export default observer(PrizePage);

