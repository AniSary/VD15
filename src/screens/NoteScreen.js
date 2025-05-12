import React, { useContext, useState } from 'react';
import { NoteContext } from '../context/NoteContext';

const NoteScreen = () => {
  const { notes, addNote, removeNote } = useContext(NoteContext);
  const [tytul, setTytul] = useState('');
  const [tresc, setTresc] = useState('');

  const handleAddNote = () => {
    if (tytul.trim() === '' || tresc.trim() === '') return;
    addNote(tytul, tresc);
    setTytul('');
    setTresc('');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Dodaj nową notatkę</h2>
      <input
        type="text"
        placeholder="Tytuł"
        value={tytul}
        onChange={(e) => setTytul(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Treść"
        value={tresc}
        onChange={(e) => setTresc(e.target.value)}
        rows={4}
        cols={40}
      />
      <br />
      <button onClick={handleAddNote}>Dodaj notatkę</button>

      <h2>Twoje notatki</h2>
      {notes.length === 0 && <p>Brak notatek</p>}
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <strong>{note.tytul}</strong>: {note.tresc}
            <button onClick={() => removeNote(note.id)}>Usuń</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteScreen;
