import React, { useEffect, useRef, useState } from "react";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
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
import { toast, Toaster, useToasterStore } from "react-hot-toast";
import Header from "../../components/shared/header/header";

function PuzzlePage() {
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

  const draggableAreaRef = useRef<HTMLDivElement>(null);

  const [randomPositions, setRandomPositions] = useState<Map>([
    { top: 0, left: 0 },
    { top: 0, left: 0 },
    { top: 0, left: 0 },
    { top: 0, left: 0 },
    { top: 0, left: 0 },
    { top: 0, left: 0 },
    { top: 0, left: 0 },
  ]);

  useEffect(() => {
    for (let i = 0; i < 6; i++) {
      setRandomPositions((prevState) => {
        const updatedPositions = [...prevState];
        updatedPositions[i] = generateRandomPosition();
        return updatedPositions;
      });
    }
  }, []);

  const generateRandomPosition = () => {
    // Random number between 0 and 300
    console.log(draggableAreaRef.current?.clientHeight);
    console.log(draggableAreaRef.current?.clientWidth);
    const randomTop = Math.floor(
      Math.random() * (draggableAreaRef.current!.clientHeight - 100),
    );
    const randomLeft = Math.floor(
      Math.random() * (draggableAreaRef.current!.clientWidth - 100),
    );
    return { top: randomTop, left: randomLeft };
  };

  const [toPlayPeices, setToPlayPeices] = useState([
    { content: pieces[0] },
    { content: pieces[1] },
    { content: pieces[2] },
    { content: pieces[3] },
    { content: pieces[4] },
    { content: pieces[5] },
  ]);

  const [placedContent, setplacedContent] = useState([
    { content: null },
    { content: null },
    { content: null },
    { content: null },
    { content: null },
    { content: null },
  ]);

  let currentlyHeld: any;

  const handleDragStart = (event: DragStartEvent) => {
    console.log(event);
    currentlyHeld = Number(event.active.id.toString().replace("piece", ""));
    console.log(currentlyHeld);
  };

  const handleDragEnd = ({ over }: DragEndEvent) => {
    console.log(over);
    if (over) {
      const overId = Number(over?.id.toString());
      if (placedContent[overId].content == null) {
        setplacedContent((prevState) => {
          const updatedContent = [...prevState];
          //remove
          const toNullId = updatedContent.findIndex(
            (content) => content.content == pieces[currentlyHeld],
          );
          if (toNullId != -1) {
            updatedContent[toNullId].content = null;
          }

          //add
          if (updatedContent[overId].content == null) {
            updatedContent[overId].content = pieces[currentlyHeld];
          }
          return updatedContent;
        });

        setToPlayPeices((prevState) => {
          const updatedContent = [...prevState];
          updatedContent[currentlyHeld].content = null;
          return updatedContent;
        });
      }
    } else {
      setToPlayPeices((prevState) => {
        const updatedContent = [...prevState];
        updatedContent[currentlyHeld].content = pieces[currentlyHeld];
        return updatedContent;
      });

      setplacedContent((prevState) => {
        const updatedContent = [...prevState];
        const toNullId = updatedContent.findIndex(
          (content) => content.content == pieces[currentlyHeld],
        );
        if (toNullId != -1) {
          updatedContent[toNullId].content = null;
        }
        return updatedContent;
      });
    }
  };
  const puzzleCompletionChecker = () => {
    if (
      placedContent[0].content == pieces[0] &&
      placedContent[1].content == pieces[1] &&
      placedContent[2].content == pieces[2] &&
      placedContent[3].content == pieces[3] &&
      placedContent[4].content == pieces[4] &&
      placedContent[5].content == pieces[5]
    ) {
      console.log("hurray");
      navigate("/puzzle/complete");
    } else {
      toast.error("Puslespillet er ikke samlet korrekt", { duration: 2000 });
      console.log("øv");
    }
  };

  const navigate = useNavigate();
  const { toasts } = useToasterStore();

  const TOAST_LIMIT = 1;

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  return (
    <>
      <Header currentPage="Saml puslespil" onClose={() => navigate("/")} />
      <div className="puzzlePage">
        <h2>Saml dit puslespil</h2>
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="dropArea ">
            <Droppable id="0">{placedContent[0].content}</Droppable>
            <Droppable id="1">{placedContent[1].content}</Droppable>
            <Droppable id="2">{placedContent[2].content}</Droppable>
            <Droppable id="3">{placedContent[3].content}</Droppable>
            <Droppable id="4">{placedContent[4].content}</Droppable>
            <Droppable id="5">{placedContent[5].content}</Droppable>
          </div>

          <div className="piecesArea" ref={draggableAreaRef}>
            {toPlayPeices.map((piece, index) => (
              <div
                className="Draggable"
                style={{
                  top: randomPositions[index].top,
                  left: randomPositions[index].left,
                }}
                key={index}
                id={index.toString()}
              >
                {piece.content}
              </div>
            ))}
          </div>
        </DndContext>
        <div className="buttonContainer">
          <DefButton
            text="Godkend puslespil"
            size="large"
            onClick={() => {
              puzzleCompletionChecker();
            }}
          />
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default PuzzlePage;
