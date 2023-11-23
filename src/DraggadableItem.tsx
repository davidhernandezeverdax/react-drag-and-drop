import React, { ReactNode } from 'react';
import { useDrag } from 'react-dnd';

export const DraggableItem: React.FC<{
  id: string;
  type: string;
  children: ReactNode;
}> = ({ id, type, children }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type,
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef}
      className={`draggable-item ${isDragging ? 'dragging' : ''}`}
    >
      {children}
    </div>
  );
};
