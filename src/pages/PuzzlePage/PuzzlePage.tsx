
import React, { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import Droppable from '../../components/puzzle/droppable/droppable';
import Draggable from '../../components/puzzle/draggable/draggable';
import "./PuzzlePage.scss";

function Example() {
  const [parent, setParent] = useState<string | null>(null);

  const draggable = (
    <Draggable id="draggable">
      Go ahead, drag me.
    </Draggable>
  );

  const handleDragEnd = ({ over }: DragEndEvent) => {
    setParent(over ? String(over.id) : null);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!parent ? draggable : null}
      <Droppable id="droppable">
        {parent === "droppable" ? draggable : 'Drop here'}
      </Droppable>
    </DndContext>
  );
}

export default Example;
  