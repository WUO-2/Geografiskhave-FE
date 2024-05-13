import React, { useEffect } from "react";
import Header from "../../components/shared/header/header";
import "./PayPage.scss";
import { useNavigate } from "react-router-dom";
import SwipeableButton from "../../components/shared/swipe/SwipeableButton";
import { toast, Toaster, useToasterStore } from "react-hot-toast";
import { useStore } from "../../stores/store";
import BackImg from "../../assets/images/is.jpg";
import { AchievementType, checkAchievement } from "../../utils/achievementUtil";
import { getAuth } from "firebase/auth";

const PayPage = () => {
  const navigate = useNavigate();
  const { treasureStore, authStore } = useStore();
  const auth = getAuth();
  const price = authStore.selectedItem.price;

  const handleBack = () => {
    navigate(-1);
  };

  const handlePay = () => {
    if (price <= authStore.user!.points) {
      handleUpdatePoints(-price);
      checkAchievement(authStore.user!.id, AchievementType.PURCHASE)
        .then((response) => {
          if (response.message === undefined) {
            authStore.getUser(auth.currentUser!.uid);
          }
        })
        .finally(() => {
          navigate(-1);
        });
    } else {
      toast.error("Du har ikke nok mønter", { duration: 2000 });
      console.log("øv");
    }
  };

  const handleUpdatePoints = async (points: number) => {
    const response = await treasureStore.updatePoints(
      authStore.user!.id,
      points,
    );
    await authStore.getUser(authStore.user!.id);
    console.log(response.totalPoints);
  };

  const { toasts } = useToasterStore();
  const TOAST_LIMIT = 1;
  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  return (
    <>
      <div className="PayPage">
        <Header currentPage="Brug mønter" onBack={() => handleBack()} />
        <div className="PayPage_ImageContainer">
          <img src={authStore.selectedItem.imageUrl} alt="" />
        </div>

        <div className="PayPage_ContentContainer">
          <div className="PayPage_ContentContainer_Header">
            {authStore.selectedItem.name}
          </div>
          <div
            className={`bold Orange_Text ${authStore.selectedItem.price == 0 ? "Hidden" : ""}`}
          >
            {authStore.selectedItem.price} Eventyrmønter
          </div>
          <div className="PayPage_ContentContainer_Text">
            {authStore.selectedItem.description}
          </div>
          <div className="Swipe_Container">
            <SwipeableButton
              onSuccess={handlePay}
              text="Brug Eventyrmønter"
              text_unlocked="Betalt"
            />
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default PayPage;

