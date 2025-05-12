import React, { createContext, useState } from 'react';

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const addNote = (tytul, tresc) => {
    const nowaNotatka = {
      id: Date.now().toString(),
      tytul,
      tresc,
    };
    setNotes([nowaNotatka, ...notes]);
  };

  const removeNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, removeNote }}>
      {children}
    </NoteContext.Provider>
  );
};
