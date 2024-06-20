import React, { useState, useEffect } from "react";
import "./SignUpPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../../stores/store";
import { IUserFirebase } from "../../../interfaces/IUser";
import Input from "../../../components/shared/inputField/input";
import back from "../../../assets/icons/backIcon.svg";
import show from "../../../assets/icons/show.svg"
import hide from "../../../assets/icons/hide.svg"

import { toast, Toaster, useToasterStore } from "react-hot-toast";


const SignUpPage = () => {
  const navigate = useNavigate();
  const { authStore } = useStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameCorrect, setNameCorrect] = useState<Boolean>(true);
  const [emailCorrect, setEmailCorrect] = useState<Boolean>(true);
  const [passwordCorrect, setPasswordCorrect] = useState<Boolean>(true);

  const { toasts } = useToasterStore();


  const handleGoBack = () => {
    navigate("/auth");
  };

  const handleSignUp = () => {
    if(nameCorrect && emailCorrect && passwordCorrect) {
      const user: IUserFirebase = {
        name: name,
        email: email,
        password: password,
      };

      authStore.registerUser(user);
    } else {
      toast.error("alle felter skal udfyldes korrekt", { duration: 2000 });
    };
  };

  const checkName = () => {
    let bool = name.length > 2;
    setNameCorrect(bool);
    if(!bool) {
      toast.error("dit navn skal være 3 tegn eller længere", { duration: 2000 });
    };
  };

  const checkEmail = () => {
    let bool = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setEmailCorrect(bool);
    if(!bool) {
      toast.error("emailen skal være valid", { duration: 2000 });
    };
  };

  const checkPassword = () => {
    let bool = password.length > 7;
    setPasswordCorrect(bool);
    if(!bool) {
      toast.error("din adgangskode skal være 8 tegn eller længere", { duration: 2000 });
    };
  };

  const TOAST_LIMIT = 1;

  useEffect(() => {
      toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

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
            onBlur={() => checkName()}
            isWrong={!nameCorrect}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => checkEmail()}
            isWrong={!emailCorrect}
          />
          <Input
            type="password"
            placeholder="Adgangskode"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => checkPassword()}
            iconHide={hide}
            iconShow={show}
            isWrong={!passwordCorrect}
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
      <Toaster />
    </div>
  );
};

export default SignUpPage;
