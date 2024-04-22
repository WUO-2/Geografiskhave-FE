import React from "react";
import Input from "../../components/shared/inputField/input";
import backIcon from "../../assets/icons/backIcon.svg";
import TreasureHunt from "../../components/shared/treasureHuntHomePage/treasureHunt";
import video1 from "../../assets/videos/Video1.mp4";
import Quiz from "../../components/quiz/quiz";

const TestPage = () => {
  return (
    <Quiz
      text="Hvad er hovedstaden i Danmark?"
      video={video1}
      answers={["København", "Aarhus", "Odense"]}
    />
  );
};

export default TestPage;
