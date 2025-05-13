// src/screens/NoteListScreen.js
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import * as Location from 'expo-location';
import { NoteContext } from '../context/NoteContext';

export default function NoteListScreen({ navigation }) {
  const { notatki } = useContext(NoteContext);
  const [lokalizacja, setLokalizacja] = useState(null);

  // Запрос прав и получение геопозиции
  const pobierzGeo = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Brak zgody', 'Nie przyznano uprawnień do lokalizacji');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLokalizacja({
        latitude: loc.coords.latitude.toFixed(6),
        longitude: loc.coords.longitude.toFixed(6),
      });
    } catch (e) {
      Alert.alert('Błąd', 'Nie udało się pobrać lokalizacji');
      console.error(e);
    }
  };

  useEffect(() => {
    // можно автоматически подгружать при старте, но пока по кнопке
  }, []);

  return (
    <View style={styles.kontener}>
      <TouchableOpacity style={styles.geoPrzycisk} onPress={pobierzGeo}>
        <Text style={styles.geoTekst}>Pokaż moją lokalizację</Text>
      </TouchableOpacity>

      {lokalizacja && (
        <Text style={styles.geoDane}>
          Szerokość: {lokalizacja.latitude},{'\n'}
          Długość: {lokalizacja.longitude}
        </Text>
      )}

      <FlatList
        data={notatki}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.element}
            onPress={() =>
              navigation.navigate('SzczegolyNotatki', { noteId: item.id })
            }
          >
            <Text style={styles.tytul}>{item.tytul}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.dodajPrzycisk}
        onPress={() => navigation.navigate('SzczegolyNotatki')}
      >
        <Text style={styles.dodajTekst}>+ Dodaj notatkę</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  kontener: { flex: 1, padding: 20 },
  geoPrzycisk: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  geoTekst: { color: '#fff', fontSize: 16 },
  geoDane: {
    marginBottom: 20,
    fontStyle: 'italic',
  },
  element: {
    padding: 15,
    backgroundColor: '#f1f1f1',
    marginBottom: 10,
    borderRadius: 5,
  },
  tytul: { fontSize: 18 },
  dodajPrzycisk: {
    backgroundColor: '#0066cc',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  dodajTekst: { color: '#fff', fontSize: 16 },
});
