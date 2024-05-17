import React, { useState } from "react";
import Droppable from "../../components/puzzle/droppable/droppable";
import Draggable from "../../components/puzzle/draggable/draggable";
import "./PuzzlePage.scss";

import Piece1 from "../../assets/puzzlePieces/puzzle_piece1.png";
import Piece2 from "../../assets/puzzlePieces/puzzle_piece2.png";
import Piece3 from "../../assets/puzzlePieces/puzzle_piece3.png";
import Piece4 from "../../assets/puzzlePieces/puzzle_piece4.png";
import Piece5 from "../../assets/puzzlePieces/puzzle_piece5.png";
import Piece6 from "../../assets/puzzlePieces/puzzle_piece6.png";

import DefButton from "../../components/shared/buttons/button";
import { useNavigate } from "react-router-dom";
import Header from "../../components/shared/header/header";
import { useStore } from "../../stores/store";

function PuzzleCompletePage() {
  const { authStore, treasureStore } = useStore();
  const [pieces, setPieces] = useState([
    <Draggable id="piece0">
      <img src={Piece1} alt="" />
    </Draggable>,
    <Draggable id="piece1">
      <img src={Piece2} alt="" />
    </Draggable>,
    <Draggable id="piece2">
      <img src={Piece3} alt="" />
    </Draggable>,
    <Draggable id="piece3">
      <img src={Piece4} alt="" />
    </Draggable>,
    <Draggable id="piece4">
      <img src={Piece5} alt="" />
    </Draggable>,
    <Draggable id="piece5">
      <img src={Piece6} alt="" />
    </Draggable>,
  ]);

  const navigate = useNavigate();

  const handleComplete = async () => {
    await treasureStore
      .endTreasureHunt(authStore.user!.id)
      .then(() => navigate("/prize"));
  };

  return (
    <>
      <Header currentPage="Puslespil samlet" />
      <div className="puzzlePage completedPage">
        <div className="puzzlePage_Title">
          <h2>Godt gået!</h2>
          <p className="underTitle">Jeres skattejagt-puslespil er samlet</p>
        </div>
        <div className="dropArea ">
          <Droppable id="0">{pieces[0]}</Droppable>
          <Droppable id="1">{pieces[1]}</Droppable>
          <Droppable id="2">{pieces[2]}</Droppable>
          <Droppable id="3">{pieces[3]}</Droppable>
          <Droppable id="4">{pieces[4]}</Droppable>
          <Droppable id="5">{pieces[5]}</Droppable>
        </div>
        <div className="leftAligned">
          <p>
            I har samlet alle puslebrikkerne og fuldført den eventyrlige
            skattejagt gennem Geografisk Have.
          </p>
          <br />
          <p>
            Afslut skattejagten for at indsamle jeres præmie og Eventyrmønter.
          </p>
        </div>

        <div className="buttonContainer">
          <DefButton
            text="Afslut skattejagt"
            size="large"
            onClick={() => {
              handleComplete();
            }}
            size="large"
          />
        </div>
      </div>
    </>
  );
}

export default PuzzleCompletePage;
