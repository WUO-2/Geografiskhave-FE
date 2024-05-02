import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import "./droppable.scss"
import {IPuzzle} from "../../../interfaces/IPuzzle"

function Droppable({id, children}: IPuzzle) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  const style: React.CSSProperties = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div className={`droppable ${id}`} ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}

export default Droppable;
  