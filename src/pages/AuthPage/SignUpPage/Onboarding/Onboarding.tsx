import "./Onboarding.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import back from "../../../../backIcon.svg";

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

        <button
          className={`skipButton ${currentStep === 4 ? "hidden" : ""}`}
          onClick={navigateToHome}
        >
          Spring over
        </button>
      </div>

      {currentStep === 1 && (
        <div className="Step1">
          <img
            src="src\assets\images\onboarding_1.png"
            alt="Brugerprofil"
            className="OnboardingPage_ImageContainer"
          />
          <h1>1.Brugerprofil</h1>
          <p>
            På din profil kan du se dine optjente Eventyrmønter, indløse præmier
            og se dine badges.
          </p>
        </div>
      )}

      {currentStep === 2 && (
        <div className="Step2">
          <img
            src="src\assets\images\onboarding_2.png"
            alt="Brugerprofil"
            className="OnboardingPage_ImageContainer"
          />
          <h1>2Mønter & præmier</h1>
          <p>
            Optjen Eventyrmønter ved at løse opgaver i appen og gennemføre vores
            skattejagt. Mønterne kan du indløse til fede præmier på din profil.
          </p>
          <div className="OnboardingPage_ContentContainer_Footer"></div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="Step3">
          <img
            src="src\assets\images\onboarding_3.png"
            alt="Brugerprofil"
            className="OnboardingPage_ImageContainer"
          />
          <h1>3Kort over haven</h1>
          <p>
            Hold styr på, hvor du befinder dig, og hvor de næste ting du vil
            udforske er, med det interaktive kort i ‘Find vej’.
          </p>
          <div className="OnboardingPage_ContentContainer_Footer"></div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="Step4">
          <img
            src="src\assets\images\onboarding_4.png"
            alt="Brugerprofil"
            className="OnboardingPage_ImageContainer"
          />
          <h1>4Skattejagt</h1>
          <p>
            Tag på en skattejagt gennem haven og bliv klogere på Geografisk
            Have. Løs opgaver, saml puslebrikker og optjen Eventyrmønter og fede
            præmier.
          </p>
          <div className="OnboardingPage_ContentContainer_Footer"></div>
        </div>
      )}
      {currentStep !== 4 && (
        <button
          onClick={nextStep}
          className={currentStep === 4 ? "nextButton" : ""}
        >
          Næste
        </button>
      )}
    </div>
  );
};

export default Onboarding;
