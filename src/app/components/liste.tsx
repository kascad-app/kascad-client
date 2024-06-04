// components/List.tsx
import React, { useState } from 'react';

type ListItem = {
  id: number;
  text: string;
};

const List: React.FC = () => {
  const [items, setItems] = useState<ListItem[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleAddItem = () => {
    if (inputValue.trim() !== '') {
      const newItem: ListItem = {
        id: Date.now(),
        text: inputValue,
      };
      setItems([...items, newItem]);
      setInputValue('');
    }
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      <h2>Liste des éléments</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Ajouter un nouvel élément"
      />
      <button onClick={handleAddItem}>Ajouter</button>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => handleRemoveItem(item.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
