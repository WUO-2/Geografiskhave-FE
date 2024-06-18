import "./SignInPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../../stores/store";
import { useState } from "react";
import back from "../../../assets/icons/backIcon.svg";
import show from "../../../assets/icons/show.svg"
import hide from "../../../assets/icons/hide.svg"
import Input from "../../../components/shared/inputField/input";

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authStore } = useStore();

  const handleSignIn = async () => {
    const user = {
      email: email,
      password: password,
    };

    await authStore.loginUser(user);
  };

  const handleGoBack = () => {
    navigate("/auth");
  };

  return (
    <div className="SignIn">
      <div className="SignIn_Back" onClick={() => handleGoBack()}>
        <img src={back} alt="back" />
      </div>
      <div className="SignIn_Container">
        <h1 className="SignIn_Container_Welcome">Log ind</h1>
        <p className="SignIn_Container_Paragraph">
          Velkommen tilbage! Log ind for at forsætte med dit eventyr.{" "}
        </p>
        <div className="SignIn_Container_Form">
          <Input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Adgangskode"
            onChange={(e) => setPassword(e.target.value)}
            iconHide={hide}
            iconShow={show}
          />
          
          <div className="SignIn_Container_Form_Container">
            <div className="SignIn_Container_Form_Container_RememberMe">
              <input type="checkbox" id="checkbox" />
              { <label for="checkbox">Husk mig</label> }
            </div>
            <div className="SignIn_Container_Form_Container_Forgot">
              <Link to="/forgot" className="bold">
                Glemt password?
              </Link>
            </div>
            
          </div>
        </div>
      </div>

      <div className="SignIn_Interaction">
        <button className="SignIn_Interaction_Button" onClick={handleSignIn}>
          Log ind
        </button>
        <p className="SignIn_Interaction_Paragraph">
          Har du ikke en konto?
          <Link to="/register" className="SignIn_Interaction_Paragraph_Link">
            Tilmeld dig her
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
