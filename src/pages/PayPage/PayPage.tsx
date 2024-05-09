import React, { useEffect } from "react";
import Header from "../../components/shared/header/header";
import "./PayPage.scss";
import { useNavigate } from "react-router-dom";
import  SwipeableButton  from "../../components/shared/swipe/SwipeableButton"
import { toast, Toaster, useToasterStore } from "react-hot-toast";
import { useStore } from "../../stores/store";

const PayPage = () => {

  const price = 35
  const navigate = useNavigate();
  const { treasureStore, authStore } = useStore();
  
  const handleBack = () => {
    navigate(-1);
  }

  const handlePay = () => {
    console.log(authStore.user?.points + " " + price);
    if (price <= authStore.user!.points) {
      handleUpdatePoints(-price);
      navigate(-1);
    }else{
      toast.error("Du har ikke nok mønter", { duration: 2000 });
      console.log("øv");
    }
  };

  const handleUpdatePoints = async (points: number) => {
    const response = await treasureStore.updatePoints(authStore.user!.id, points);
    await authStore.getUser(authStore.user!.id);
    console.log(response.totalPoints);
  }

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
        <div className="PayPage_ImageContainer"></div>

        <div className="PayPage_ContentContainer">
          <div className="PayPage_ContentContainer_Header">
            Skarø is
          </div>
          <div className="bold Orange_Text">
            {price} Eventyrmønter
          </div>
          <div className="PayPage_ContentContainer_Text">
            Nyd en forfriskende kugle is fra Skarø! Denne lækre præmie gælder for 2x is med én kugle. Præmien kan indløses i Geografisk Haves café, og køb kan ikke fortrydes.
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