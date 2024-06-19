import React from "react";
import children from "../../assets/images/IllustrationChildren.svg";
import "./AuthPage.scss";
import { useNavigate } from "react-router-dom";
const AuthPage = () => {
  const navigate = useNavigate();

  const handleTilmeld = () => {
    navigate("/register");
  };
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="AuthPage">
      <h1 className="AuthPage_Welcome">
        Velkommen til <br />
        Geografisk Have
      </h1>
      <div className="AuthPage_Image">
        <img src={children} alt="Illustration of children" />
      </div>
      <p className="AuthPage_Paragraph">
        Tag med på eventyr og udforsk vores botaniske have!
      </p>
      <div className="AuthPage_Interaction">
        <button
          className="AuthPage_Interaction_Button Tilmeld"
          onClick={() => handleTilmeld()}
        >
          Tilmeld
        </button>
        <button
          className="AuthPage_Interaction_Button"
          onClick={() => handleLogin()}
        >
          Log ind
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
