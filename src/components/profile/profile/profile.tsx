import ProfilePic from "../shared/profilePic/profilePic";
import "./profile.scss";
import Mønt from "../../../assets/Mønt.png";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { authStore } = useStore();
  const navigate = useNavigate();

  return (
    <div className="Profile">
      <div
        className="Profile_ImageContainer"
        onClick={() => {
          navigate("/editprofile");
        }}
      >
        <ProfilePic
          imgSrc={
            authStore.user?.imageURL ||
            "http://localhost:5000/assets/avatars/bird.png"
          }
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
