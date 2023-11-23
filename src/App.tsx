import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DraggableItem } from './DraggadableItem';
import { DropArea } from './DropArea';
import './style.css';

export const App: React.FC = () => {
  const [items, setItems] = useState<{ [areaId: string]: string[] }>({
    area1: ['item1', 'item2', 'item3', 'item4', 'item5'],
    area2: ['item6', 'item7', 'item8', 'item9', 'item10'],
  });

  const handleDrop = (itemId: string, newAreaId: string) => {
    setItems((prevItems) => {
      const newItems = { ...prevItems };

      const currentAreaId = Object.keys(newItems).find((areaId) =>
        newItems[areaId].includes(itemId)
      );
      if (currentAreaId) {
        newItems[currentAreaId] = newItems[currentAreaId].filter(
          (id) => id !== itemId
        );
      }

      newItems[newAreaId].push(itemId);

      return newItems;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="drag-and-drop-container">
        <DropArea id="area1" onDrop={handleDrop} type="ITEM">
          {items['area1'].map((itemId) => (
            <DraggableItem key={itemId} id={itemId} type="ITEM">
              Arrástrame {itemId}
            </DraggableItem>
          ))}
        </DropArea>
        <DropArea id="area2" onDrop={handleDrop} type="ITEM">
          {items['area2'].map((itemId) => (
            <DraggableItem key={itemId} id={itemId} type="ITEM">
              Arrástrame {itemId}
            </DraggableItem>
          ))}
        </DropArea>
      </div>
    </DndProvider>
  );
};
