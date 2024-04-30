import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import "./draggable.scss"

interface DraggableProps {
  id: string;
  children: React.ReactNode;
}

function Draggable(props: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style: React.CSSProperties | undefined = transform
    ? {
        touchAction: 'none',
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  return (
    <div className={`puzzlePiece ${props.id}`} ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
}

export default Draggable;
