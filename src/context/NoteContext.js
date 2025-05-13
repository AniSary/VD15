// src/context/NoteContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notatki, setNotatki] = useState([]);

  // Загрузка сохранённых заметок при старте
  useEffect(() => {
    const wczytajNotatki = async () => {
      try {
        const json = await AsyncStorage.getItem('@moje_notatki');
        if (json !== null) {
          setNotatki(JSON.parse(json));
        }
      } catch (e) {
        console.error('Błąd przy wczytywaniu notatek:', e);
      }
    };
    wczytajNotatki();
  }, []);

  // Функция для сохранения списка в AsyncStorage
  const zapiszNotatki = async (lista) => {
    try {
      await AsyncStorage.setItem('@moje_notatki', JSON.stringify(lista));
    } catch (e) {
      console.error('Błąd przy zapisywaniu notatek:', e);
    }
  };

  // Добавление новой заметки (с опциональным photoUri)
  const dodajNotatke = (tytul, tresc, photoUri = null) => {
    const nowa = {
      id: Date.now().toString(),
      tytul,
      tresc,
      photoUri,
    };
    const updated = [nowa, ...notatki];
    setNotatki(updated);
    zapiszNotatki(updated);
  };

  // Удаление заметки по id
  const usunNotatke = (id) => {
    const updated = notatki.filter(n => n.id !== id);
    setNotatki(updated);
    zapiszNotatki(updated);
  };

  return (
    <NoteContext.Provider value={{ notatki, dodajNotatke, usunNotatke }}>
      {children}
    </NoteContext.Provider>
  );
};
