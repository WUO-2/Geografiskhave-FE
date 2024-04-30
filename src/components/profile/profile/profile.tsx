import ProfilePic from "../shared/profilePic/profilePic";
import "./profile.scss";
import Mønt from "../../../assets/Mønt.png";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";

const Profile = () => {
  const { authStore } = useStore();

  return (
    <div className="Profile">
      <div className="Profile_ImageContainer">
        <ProfilePic
          imgSrc="https://via.placeholder.com/150"
          alt="profile"
          editable={true}
        />
      </div>
      <div className="Profile_InfoContainer">
        <p className="Profile_Username">
          {authStore.userFirebase?.displayName}
        </p>
      </div>
      <div className="Profile_CoinContainer">
        <div className="Profile_CoinWrapper">
          <img src={Mønt} alt="coin" className="Profile_CoinIcon" />
          <p className="Profile_CoinText">{authStore.user?.points}</p>
        </div>
        <p className="Profile_CoinText">Eventyrmønter</p>
      </div>
    </div>
  );
};

export default observer(Profile);
