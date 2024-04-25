import { IQuiz } from "../../interfaces/IQuiz";
import "./quiz.scss";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import play from "../../assets/icons/play.svg";
import pause from "../../assets/icons/pause.svg";
import { useStore } from "../../stores/store";
import { IAnswer, ITask } from "../../interfaces/ITreasureHunt";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import { GetVideoById } from "../../utils/VideoUtil";
import { Clamp } from "../../utils/Clamp";
import Header from "../shared/header/header";
import Wrong from "./wrong/wrong";

const Quiz = () => {
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [selectedAnswer, setSelectedAnswer] = useState<IAnswer | null>(null);
  const [video, setVideo] = useState<any>();
  const [wrongAnswer, setWrongAnswer] = useState<boolean>(false);
  const { treasureStore } = useStore();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (treasureStore.currentTask === null) {
      const taskId = Clamp(parseInt(id), 1, 6);
      treasureStore.fetchTask(taskId);
      setVideo(GetVideoById(taskId));
    }
    return () => {
      treasureStore.setCurrentTask(null);
    };
  }, []);

  const checkAnswer = () => {
    if (selectedAnswer === null) {
      return;
    }
    if (selectedAnswer.isCorrect) {
      navigate(`/quiz/success/${treasureStore.currentTask?.id || id}`);
    } else {
      setWrongAnswer(true);
    }
  };

  const handleBack = () => {
    console.log("back");
  };
  const handleClose = () => {
    console.log("close");
  };

  return (
    <>
      {wrongAnswer && <Wrong onClick={() => setWrongAnswer(false)} />}
      <Header
        currentPage={`Opgave ${Clamp(parseInt(id), 1, 6)}`}
        onBack={() => handleBack()}
        onClose={() => handleClose()}
      />
      <div className="Quiz">
        <div className="Quiz_Info">
          {treasureStore.currentTask?.description}
        </div>
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
            {treasureStore.currentTask?.answers.map((answer, index) => (
              <button
                key={index}
                className={`Quiz_Answer ${selectedAnswer === answer ? "Quiz_Answer_Selected" : ""}`}
                onClick={() => setSelectedAnswer(answer)}
              >
                {answer.answer}
              </button>
            ))}
          </div>
          <button className="Quiz_Answers_Button" onClick={() => checkAnswer()}>
            Vælg
          </button>
        </div>
      </div>
    </>
  );
};

export default observer(Quiz);
