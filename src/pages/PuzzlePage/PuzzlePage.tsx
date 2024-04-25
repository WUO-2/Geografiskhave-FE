import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragStartEvent, closestCorners } from '@dnd-kit/core';
import Droppable from '../../components/puzzle/droppable/droppable';
import Draggable from '../../components/puzzle/draggable/draggable';
import "./PuzzlePage.scss";
import Piece from "../../assets/icons/puzzle-piece.svg";
import Placeholder from "../../assets/icons/placeholder.svg";

function PuzzlePage() {
  const [pieces, setPieces] = useState([
  (<Draggable id='piece0'>
    <img src={Piece} alt="" />
  </Draggable>),
  (<Draggable id='piece1'>
    <img src={Placeholder} alt="" />
  </Draggable>),
  (<Draggable id='piece2'>
  <img src={Placeholder} alt="" />
</Draggable>),
  (<Draggable id='piece6'>
  <img src={Placeholder} alt="" />
</Draggable>),

  ]);
  
  const [toPlayPeices, setToPlayPeices] = useState([
    {content: pieces[0]},
    {content: pieces[1]},
    {content: pieces[2]},
    {content: null},
  ])

  const [placedContent, setplacedContent] = useState([
    { content: null},
    { content: null},
    { content: null},
    { content: null},
    { content: null},
    { content: null},
    { content: pieces[3]}
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
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Droppable id="0">
          {placedContent[0].content}
        </Droppable>
        <Droppable id="1">
          {placedContent[1].content}
        </Droppable>
        <Droppable id="2">
          {placedContent[2].content}
        </Droppable>
          {toPlayPeices.map((piece, index) => (
            <div key={index} id={index.toString()}>
              {piece.content}
            </div>
          ))}
      </DndContext>
    </div>
  );
}

export default PuzzlePage;
  