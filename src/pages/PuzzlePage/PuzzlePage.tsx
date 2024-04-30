import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragStartEvent, closestCorners } from '@dnd-kit/core';
import Droppable from '../../components/puzzle/droppable/droppable';
import Draggable from '../../components/puzzle/draggable/draggable';
import "./PuzzlePage.scss";
import Piece1 from "../../assets/puzzlePieces/puzzle_piece1.png";
import Piece2 from "../../assets/puzzlePieces/puzzle_piece2.png";
import Piece3 from "../../assets/puzzlePieces/puzzle_piece3.png";
import Piece4 from "../../assets/puzzlePieces/puzzle_piece4.png";
import Piece5 from "../../assets/puzzlePieces/puzzle_piece5.png";
import Piece6 from "../../assets/puzzlePieces/puzzle_piece6.png";

function PuzzlePage() {
  const [pieces, setPieces] = useState([
  (<Draggable id='piece0'>
    <img src={Piece1} alt="" />
  </Draggable>),
  (<Draggable id='piece1'>
    <img src={Piece2} alt="" />
  </Draggable>),
  (<Draggable id='piece2'>
    <img src={Piece3} alt="" />
  </Draggable>),
  (<Draggable id='piece3'>
    <img src={Piece4} alt="" />
  </Draggable>),
  (<Draggable id='piece4' isWonck>
    <img src={Piece5} alt="" />
  </Draggable>),
  (<Draggable id='piece5' isWonck>
    <img src={Piece6} alt="" />
  </Draggable>),
  (<div></div>),

  ]);
  
  const [toPlayPeices, setToPlayPeices] = useState([
    {content: pieces[0]},
    {content: pieces[1]},
    {content: pieces[2]},
    {content: pieces[3]},
    {content: pieces[4]},
    {content: pieces[5]},
    {content: null},
  ])

  const [placedContent, setplacedContent] = useState([
    { content: null},
    { content: null},
    { content: null},
    { content: null},
    { content: null},
    { content: null},
    { content: pieces[6]}
  ]);

  let currentlyHeld:any

  const handleDragStart = (event: DragStartEvent) => {
    console.log(event);
    currentlyHeld = Number(event.active.id.toString().replace("piece", ""))
    console.log(currentlyHeld);
  };

  const handleDragEnd = ({ over }: DragEndEvent) => {
    console.log(over);
    if(over) {
      let overId = Number(over?.id.toString());
      if(placedContent[overId].content == null){
        setplacedContent(prevState => {
          const updatedContent = [...prevState];
          //remove
          let toNullId = updatedContent.findIndex(content => content.content == pieces[currentlyHeld]);
          if(toNullId != -1){
            updatedContent[toNullId].content = null;
          };
          
          //add
          if(updatedContent[overId].content == null){
            updatedContent[overId].content = pieces[currentlyHeld];
          }
          return updatedContent;
        });

        setToPlayPeices(prevState => {
          const updatedContent = [...prevState];
          updatedContent[currentlyHeld].content = null;
          return updatedContent;
        });
      };
    }else{
      setToPlayPeices(prevState => {
        const updatedContent = [...prevState];
        updatedContent[currentlyHeld].content = (pieces[currentlyHeld]);
        return updatedContent;
      });

      setplacedContent(prevState => {
        const updatedContent = [...prevState];
        let toNullId = updatedContent.findIndex(content => content.content == pieces[currentlyHeld])
        if(toNullId != -1){
          updatedContent[toNullId].content = null;
        };
        return updatedContent;
      });
    };
  };

  return (
    <div className='puzzlePage'>
      <h2>Saml dit puslespil</h2>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className='dropArea top'>
          <Droppable id="0">
            {placedContent[0].content}
          </Droppable>
          <Droppable id="1">
            {placedContent[1].content}
          </Droppable>
          <Droppable id="2">
            {placedContent[2].content}
          </Droppable>
        </div>
        <div className='dropArea bottom'>
          <Droppable id="3">
            {placedContent[3].content}
          </Droppable>
          <Droppable id="4">
            {placedContent[4].content}
          </Droppable>
          <Droppable id="5">
            {placedContent[5].content}
          </Droppable>
        </div>
          
        <div className='piecesArea'>
          {toPlayPeices.map((piece, index) => (
            <div key={index} id={index.toString()}>
              {piece.content}
            </div>
          ))}
        </div>
        
      </DndContext>
    </div>
  );
}

export default PuzzlePage;
  