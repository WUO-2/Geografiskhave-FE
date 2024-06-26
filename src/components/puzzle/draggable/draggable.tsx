import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import "./draggable.scss"
import {IPuzzle} from "../../../interfaces/IPuzzle"

function Draggable({id, children}: IPuzzle) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style: React.CSSProperties | undefined = transform
    ? {
        touchAction: 'none',
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  return (
    <div className={`puzzlePiece ${id}`} ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}

export default Draggable;
