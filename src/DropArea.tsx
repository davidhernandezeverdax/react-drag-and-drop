import React, { ReactNode } from 'react';
import { useDrop } from 'react-dnd';

interface DraggableItem {
  id: string;
}

export const DropArea: React.FC<{
  onDrop: (itemId: string, areaId: string) => void;
  type: string;
  children: ReactNode;
  id: string;
}> = ({ onDrop, type, children, id }) => {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: type,
    drop: (item: DraggableItem) => {
      onDrop(item.id, id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={dropRef}
      className={`drop-area ${isOver ? 'drop-area-over' : ''}`}
    >
      {children}
    </div>
  );
};
