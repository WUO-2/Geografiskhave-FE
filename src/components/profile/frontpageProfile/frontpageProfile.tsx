import React from "react";
import "./frontpageProfile.scss";
import ProfilePic from "../shared/profilePic/profilePic";
import Mønt from "../../../assets/Mønt.png";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
const FrontpageProfile = () => {
  const { authStore } = useStore();

  return (
    <div className="frontPageProfile_Container">
      <div className="frontpageProfile_ImageContainer">
        <ProfilePic
          imgSrc="https://via.placeholder.com/150"
          alt="profile"
          editable={false}
        />
      </div>
      <div className="frontpageProfile_InfoContainer">
        <p className="frontpageProfile_Greeting">Goddag</p>
        <p className="frontpageProfile_Username">
          {authStore.userFirebase?.displayName}
        </p>
      </div>
      <div className="frontpageProfile_CoinContainer">
        <div className="frontpageProfile_CoinWrapper">
          <img src={Mønt} alt="coin" className="frontpageProfile_CoinIcon" />
          <p className="frontpageProfile_CoinText">{authStore.user?.points}</p>
        </div>
      </div>
    </div>
  );
};

export default observer(FrontpageProfile);
