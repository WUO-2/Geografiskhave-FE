import { IQuiz } from "../../interfaces/IQuiz";
import "./quiz.scss";
import { useState } from "react";
import ReactPlayer from "react-player";
import play from "../../assets/icons/play.svg";
import pause from "../../assets/icons/pause.svg";

const Quiz = ({ text, video, answers }: IQuiz) => {
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  return (
    <div className="Quiz">
      <div className="Quiz_Info">{text}</div>
      <div className="Quiz_Video">
        <ReactPlayer url={video} playing={!isPaused} autoPlay={true} />
        <div className="Quiz_Video_Button">
          {isPaused ? (
            <img src={play} alt="play" onClick={() => setIsPaused(false)} />
          ) : (
            <img src={pause} alt="pause" onClick={() => setIsPaused(true)} />
          )}
        </div>
      </div>
      <div className="Quiz_Answers">
        <div className="Quiz_Answers_Container">
          {answers.map((answer, index) => (
            <button
              key={index}
              className={`Quiz_Answer ${selectedAnswer === index ? "Quiz_Answer_Selected" : ""}`}
              onClick={() => setSelectedAnswer(index)}
            >
              {answer}
            </button>
          ))}
        </div>
        <button className="Quiz_Answers_Button" onClick={() => {}}>
          Vælg
        </button>
      </div>
    </div>
  );
};

export default Quiz;
