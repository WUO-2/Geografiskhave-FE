import { useNavigate } from "react-router-dom";
import Header from "../../../components/shared/header/header";
import "./EditProfilePage.scss";
import { useStore } from "../../../stores/store";
import ProfilePic from "../../../components/profile/shared/profilePic/profilePic";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Input from "../../../components/shared/inputField/input";
import Button from "../../../components/shared/buttons/button";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { set } from "firebase/database";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const auth = getAuth();

  const [selectedImage, setSelectedImage] = useState<any>();
  const { authStore } = useStore();
  const [loaded, setLoaded] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  useEffect(() => {
    if (authStore.avatars.length === 0) {
      authStore.getAvatars();
    }

    const avatar = authStore.avatars.find(
      (avatar) => avatar.imageURL === authStore.user?.imageURL
    );

    setSelectedImage(avatar);

    console.log(selectedImage);

    if (selectedImage !== null) {
      setLoaded(true);
    }
  }, [authStore.user, authStore.avatars]);

  const handleSelectedImage = (avatar: any) => {
    if (!selectedImage) return false;
    return selectedImage.imageURL === avatar.imageURL;
  };

  const handleSave = () => {
    authStore.updateUserAvatar(selectedImage);
    authStore.updateUserName(newUsername);
    navigate("/profile");
  };

  return (
    <>
      {loaded && (
        <>
          <Header currentPage="Rediger profil" onBack={handleBack} />
          <div className="EditProfilePage">
            <h2>Rediger din profil</h2>
            <div className="EditProfilePage_Form">
              <Input
                placeholder="Fornavn"
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </div>
            <div className="EditProfilePage_Avatars">
              {authStore.avatars.map((avatar) => (
                <div
                  className={`EditProfilePage_Avatar ${
                    handleSelectedImage(avatar) ? "selected" : ""
                  } `}
                >
                  <ProfilePic
                    imgSrc={avatar.imageURL}
                    alt="profile"
                    onClick={() => {
                      setSelectedImage(avatar);
                      console.log(avatar);
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="EditProfilePage_Button">
              <Button
                text="Gem"
                size="large"
                color="green"
                onClick={() => handleSave()}
              ></Button>
            </div>
          </div>
        </>
      )}
      {!loaded && <div>Loading...</div>}
    </>
  );
};

export default observer(EditProfilePage);
