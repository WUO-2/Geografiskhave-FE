
import React from 'react';
import { useDroppable } from '@dnd-kit/core';

interface DroppableProps {
  id: string;
  children: React.ReactNode;
}

function Droppable(props: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });
  const style: React.CSSProperties = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

export default Droppable;
  