import React, { useEffect, useState } from "react";
import "./prize.scss";
import { IPrize } from "../../interfaces/IPrize";
import Mønt from "../../assets/Mønt.png";
import { useStore } from "../../stores/store";
import { toast, Toaster, useToasterStore } from "react-hot-toast";

const Prize = ({ name, price, imageUrl }: IPrize) => {
  const getCoinText = (price: number) => {
    return price > 0 ? price.toString() + " Eventyrmønter" : "Gratis præmie";
  };

  const { treasureStore, authStore } = useStore();
  const handlePay = () => {
    console.log(authStore.user?.points + " " + price);
    if (price <= authStore.user!.points) {
      handleUpdatePoints(-price);
    }else{
      toast.error("Du har ikke nok mønter", { duration: 2000 });
      console.log("øv");
    }
  }
  
  const { toasts } = useToasterStore();
  const TOAST_LIMIT = 1;
  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  const handleUpdatePoints = async (points: number) => {
    const response = await treasureStore.updatePoints(authStore.user!.id, points);
    await authStore.getUser(authStore.user!.id);
    console.log(response.totalPoints);
  }

  return (
    <div onClick={handlePay} className="Prize" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="Prize_Info">
        {price > 0 && (
          <div className="Prize_Info_CoinContainer">
            <img src={Mønt} alt="mønt" />
          </div>
        )}
        <div className="Prize_Info_Text">
          <p className="Prize_Info_Text_Title">{name}</p>{" "}
          <p className="Prize_Info_Text_Price">{getCoinText(price)}</p>
        </div>
      </div>
    </div>
  );
};

export default Prize;
