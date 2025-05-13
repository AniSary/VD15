// src/screens/NoteScreen.js
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { NoteContext } from '../context/NoteContext';

export default function NoteScreen() {
  const { notes, addNote, removeNote } = useContext(NoteContext);
  const [tytul, setTytul] = useState('');
  const [tresc, setTresc] = useState('');

  const handleAdd = () => {
    if (!tytul.trim() || !tresc.trim()) return;
    addNote(tytul, tresc);
    setTytul('');
    setTresc('');
  };

  return (
    <View style={styles.kontener}>
      <Text style={styles.naglowek}>Dodaj notatkę</Text>

      <TextInput
        style={styles.input}
        placeholder="Tytuł"
        value={tytul}
        onChangeText={setTytul}
      />

      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Treść"
        value={tresc}
        onChangeText={setTresc}
        multiline
      />

      <TouchableOpacity style={styles.przycisk} onPress={handleAdd}>
        <Text style={styles.przyciskTekst}>Dodaj</Text>
      </TouchableOpacity>

      <Text style={[styles.naglowek, { marginTop: 30 }]}>Twoje notatki</Text>
      {notes.length === 0 ? (
        <Text style={styles.pusty}>Brak notatek</Text>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <View style={styles.notatka}>
              <View style={styles.notatkaTekst}>
                <Text style={styles.tytulNotatki}>{item.tytul}</Text>
                <Text>{item.tresc}</Text>
              </View>
              <TouchableOpacity onPress={() => removeNote(item.id)}>
                <Text style={styles.usun}>Usuń</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  kontener: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  naglowek: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: width - 40,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  przycisk: {
    marginTop: 15,
    backgroundColor: '#0066cc',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  przyciskTekst: {
    color: '#fff',
    fontSize: 16,
  },
  pusty: {
    marginTop: 10,
    fontStyle: 'italic',
  },
  notatka: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  notatkaTekst: {
    flex: 1,
    paddingRight: 10,
  },
  tytulNotatki: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  usun: {
    color: 'red',
  },
});
