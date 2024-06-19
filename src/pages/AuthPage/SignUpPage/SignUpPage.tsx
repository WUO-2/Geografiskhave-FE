import React, { useState } from "react";
import "./SignUpPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../../stores/store";
import { IUserFirebase } from "../../../interfaces/IUser";
import Input from "../../../components/shared/inputField/input";
import back from "../../../assets/icons/backIcon.svg";
import show from "../../../assets/icons/show.svg"
import hide from "../../../assets/icons/hide.svg"


const SignUpPage = () => {
  const navigate = useNavigate();
  const { authStore } = useStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailWrong, setEmailWrong] = useState<Boolean>(true)
  const [passwordWrong, setPasswordWrong] = useState<Boolean>(true)


  const handleGoBack = () => {
    navigate("/auth");
  };

  const handleSignUp = () => {
    const user: IUserFirebase = {
      name: name,
      email: email,
      password: password,
    };

    authStore.registerUser(user);
  };

  const checkEmail = (email : string) => {
    setEmailWrong(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
  }

  const checkPassword = (password : string) => {
    setPasswordWrong(password.length > 7)
  }

  return (
    <div className="SignUp">
      <div className="SignUp_Back" onClick={() => handleGoBack()}>
        <img src={back} alt="back" />
      </div>
      <div className="SignUp_Container">
        <h1 className="SignUp_Container_Title">Tilmeld</h1>
        <p className="SignUp_Container_Paragraph">
          Velkommen til! Tilmeld dig for at begynde dit eventyr.
        </p>
        <form className="SignUp_Container_Form">
          <Input
            type="text"
            placeholder="Fornavn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => checkEmail(e.target.value)}
            isWrong={!emailWrong}
          />
          <Input
            type="password"
            placeholder="Adgangskode"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={(e) => checkPassword(e.target.value)}
            iconHide={hide}
            iconShow={show}
            isWrong={!passwordWrong}
          />
          
        </form>
      </div>
      <div className="SignUp_Interaction">
        <button className="SignUp_Interaction_Button" onClick={handleSignUp}>
          Tilmeld
        </button>
        <p className="SignUp_Interaction_Paragraph">
          Har du allerede en konto?
          <Link to="/login" className="SignUp_Interaction_Paragraph_Link">
            Log ind her
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
