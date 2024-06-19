import "./Onboarding.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/shared/buttons/button";

const Onboarding = () => {
  // State to track the current step
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  // Function to move to the next step
  const nextStep = () => {
    setCurrentStep(currentStep < 4 ? currentStep + 1 : 4);
  };

  // Function to move to the previous step
  const prevStep = () => {
    setCurrentStep(currentStep > 1 ? currentStep - 1 : 1);
  };

  // Function to navigate to the homepage
  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div className="OnboardingPage">
      <div className="OnboardingPage_ContentContainer_Header">
        <button
          onClick={prevStep}
          className={`backButton ${currentStep === 1 ? "hidden" : ""}`}
        >
          <img src="src\assets\icons\backIcon.svg" alt="Back" />
        </button>

        <div
          className={`skipButton_wrapper ${currentStep === 4 ? "hidden" : ""}`}
        >
          <Button
            onClick={navigateToHome}
            text="Spring over"
            size="small"
            color="orange"
          />
        </div>
      </div>

      {currentStep === 1 && (
        <div className="Step1">
          <img
            src="src\assets\images\onboarding_1.png"
            alt="Brugerprofil"
            className="OnboardingPage_ImageContainer"
          />
          <div className="TextContainer">
            <h1>Brugerprofil</h1>
            <p>
              På din profil kan du se dine optjente Eventyrmønter, indløse
              præmier og se dine badges.
            </p>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="Step2">
          <img
            src="src\assets\images\onboarding_2.png"
            alt="Brugerprofil"
            className="OnboardingPage_ImageContainer"
          />
          <div className="TextContainer">
            <h1>Mønter & præmier</h1>
            <p>
              Optjen Eventyrmønter ved at løse opgaver i appen og gennemføre
              vores skattejagt. Mønterne kan du indløse til fede præmier på din
              profil.
            </p>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="Step3">
          <img
            src="src\assets\images\onboarding_3.png"
            alt="Brugerprofil"
            className="OnboardingPage_ImageContainer"
          />
          <div className="TextContainer">
            <h1>Kort over haven</h1>
            <p>
              Hold styr på, hvor du befinder dig, og hvor de næste ting du vil
              udforske er, med det interaktive kort i ‘Find vej’.
            </p>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="Step4">
          <img
            src="src\assets\images\onboarding_4.png"
            alt="Brugerprofil"
            className="OnboardingPage_ImageContainer"
          />
          <div className="TextContainer">
            <h1>Skattejagt</h1>
            <p>
              Tag på en skattejagt gennem haven og bliv klogere på Geografisk
              Have. Løs opgaver, saml puslebrikker og optjen Eventyrmønter og
              fede præmier.
            </p>
          </div>
        </div>
      )}
   
      <div className="OnboardingPage_ContentContainer_Footer">
        <div className="leftContent">
          <div className="topDiv">
            <div className="stepNumber">0{currentStep}/04</div>
          </div>
          <div className="bottomDiv">
            <div
              className={`progress ${currentStep === 1 ? "selected" : ""}`}
            ></div>
            <div
              className={`progress ${currentStep === 2 ? "selected" : ""}`}
            ></div>
            <div
              className={`progress ${currentStep === 3 ? "selected" : ""}`}
            ></div>
            <div
              className={`progress ${currentStep === 4 ? "selected" : ""}`}
            ></div>
          </div>
        </div>
        {currentStep !== 4 && (
          <div className="wrapper_Button">
            <Button onClick={nextStep} text="Næste" size="large" />
          </div>
        )}
        {currentStep == 4 && (
          <div className="wrapper_Button">
            <Button text="Kom i gang" onClick={navigateToHome} size="large" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
