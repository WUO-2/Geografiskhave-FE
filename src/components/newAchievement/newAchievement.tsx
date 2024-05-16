import React from "react";
import { useStore } from "../../stores/store";
import Header from "../shared/header/header";
import "./newAchievement.scss";
import { observer } from "mobx-react-lite";
import ReactConfetti from "react-confetti";
import Button from "../shared/buttons/button";

const NewAchievement = () => {
  const { authStore } = useStore();

  return (
    <>
      <div className="Achievement">
        <div className="Achievement_Header">
          <Header
            currentPage="Nyt Badge"
            onClose={() => authStore.setNewAchievement(null)}
          />{" "}
        </div>
        <div className="Achievement_Container">
          <ReactConfetti numberOfPieces={100} gravity={0.025} />
          <h1 className="Achievement_Container_Title">Tillykke!</h1>
          <p className="Achievement_Container_Paragraph">
            Du har låst et nyt badge op
          </p>
          <div className="Achievement_Container_Image_Container">
            <img src={authStore.newAchievement?.imageURL} alt="badge" />
          </div>
          <Button
            text="Luk"
            onClick={() => authStore.setNewAchievement(null)}
            size="large"
          />
        </div>
      </div>
    </>
  );
};

export default observer(NewAchievement);
