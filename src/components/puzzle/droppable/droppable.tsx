import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import "./droppable.scss"

interface DroppableProps {
  id: string;
  children: React.ReactNode;
}

function Droppable(props: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style: React.CSSProperties = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div className={`droppable ${props.id}`} ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

export default Droppable;
  