import { useNavigate } from "react-router-dom";
import Header from "../../../components/shared/header/header";
import "./EditProfilePage.scss";
import { useStore } from "../../../stores/store";
import ProfilePic from "../../../components/profile/shared/profilePic/profilePic";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Input from "../../../components/shared/inputField/input";
import Button from "../../../components/shared/buttons/button";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const { selectedImage, setSelectedImage } = useState<any | null>(null);
  const { authStore } = useStore();
  useEffect(() => {
    authStore.getAvatars();
  }, [authStore]);

  return (
    <>
      <Header currentPage="Rediger profil" onBack={handleBack} />
      <div className="EditProfilePage">
        <h2>Rediger din profil</h2>
        <div className="EditProfilePage_Form">
          <Input
            placeholder="Fornavn"
            value={authStore.user?.firstName}
            onChange={(e) => authStore.setFirstName(e.target.value)}
          />
        </div>
        <div className="EditProfilePage_Avatars">
          {authStore.avatars.map((avatar) => (
            <div className="EditProfilePage_Avatar">
              <ProfilePic
                imgSrc={avatar.imageURL}
                alt="profile"
                onClick={() => setSelectedImage(avatar)}
              />
            </div>
          ))}
        </div>

        <div className="EditProfilePage_Button">
          <Button
            text="Gem"
            size="large"
            color="green"
            onClick={() => authStore.updateUser(selectedImage)} ></Button>
        </div>
      </div>
    </>
  );
};

export default observer(EditProfilePage);
