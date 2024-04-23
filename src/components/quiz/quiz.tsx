import { IQuiz } from "../../interfaces/IQuiz";
import "./quiz.scss";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import play from "../../assets/icons/play.svg";
import pause from "../../assets/icons/pause.svg";
import { useStore } from "../../stores/store";
import { IAnswer, ITask } from "../../interfaces/ITreasureHunt";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { GetVideoById } from "../../utils/VideoUtil";

const Quiz = () => {
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [selectedAnswer, setSelectedAnswer] = useState<IAnswer | null>(null);
  const [video, setVideo] = useState<any>();
  const { treasureStore } = useStore();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (treasureStore.currentTask === null) {
      const taskId = id ? parseInt(id) : 1;
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
      console.log("Correct");
    } else {
      console.log("Incorrect");
    }
  };

  return (
    <div className="Quiz">
      <div className="Quiz_Info">{treasureStore.currentTask?.description}</div>
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
  );
};

export default observer(Quiz);
