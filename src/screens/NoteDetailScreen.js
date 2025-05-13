import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { NoteContext } from '../context/NoteContext';
import { Camera } from 'expo-camera'; // компонент
import * as CameraFunctions from 'expo-camera'; // функции

export default function NoteDetailScreen({ route, navigation }) {
  const { noteId } = route.params || {};
  const { notatki, dodajNotatke, usunNotatke } = useContext(NoteContext);

  const existing = notatki.find(n => n.id === noteId);
  const [tytul, setTytul] = useState(existing ? existing.tytul : '');
  const [tresc, setTresc] = useState(existing ? existing.tresc : '');
  const [photoUri, setPhotoUri] = useState(existing ? existing.photoUri : null);

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await CameraFunctions.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const openCamera = () => {
    if (hasPermission) {
      setIsCameraOpen(true);
    } else {
      Alert.alert('Brak dostępu', 'Uprawnienia do kamery odrzucone');
    }
  };

  const takePicture = async () => {
    if (cameraRef) {
      const foto = await cameraRef.takePictureAsync({ quality: 0.5 });
      setPhotoUri(foto.uri);
      setIsCameraOpen(false);
    }
  };

  const handleSave = () => {
    if (!tytul.trim() || !tresc.trim()) return;
    if (existing) {
      usunNotatke(noteId);
    }
    dodajNotatke(tytul, tresc, photoUri);
    navigation.goBack();
  };

  return isCameraOpen ? (
    <Camera
      style={styles.camera}
      ref={ref => setCameraRef(ref)}
    >
      <View style={styles.snapContainer}>
        <TouchableOpacity onPress={takePicture} style={styles.snapButton}>
          <Text style={styles.snapText}>Zrób zdjęcie</Text>
        </TouchableOpacity>
      </View>
    </Camera>
  ) : (
    <View style={styles.kontener}>
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

      <TouchableOpacity style={styles.fotoPrzycisk} onPress={openCamera}>
        <Text style={styles.fotoTekst}>
          {photoUri ? 'Zmień zdjęcie' : 'Dodaj zdjęcie'}
        </Text>
      </TouchableOpacity>

      {photoUri && (
        <Image source={{ uri: photoUri }} style={styles.preview} />
      )}

      <TouchableOpacity style={styles.przycisk} onPress={handleSave}>
        <Text style={styles.przyciskTekst}>{existing ? 'Zapisz' : 'Dodaj'}</Text>
      </TouchableOpacity>

      {existing && (
        <TouchableOpacity
          style={styles.usunPrzycisk}
          onPress={() => {
            usunNotatke(noteId);
            navigation.goBack();
          }}
        >
          <Text style={styles.usunTekst}>Usuń</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  kontener: { flex: 1, padding: 20 },
  camera: { flex: 1 },
  snapContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  snapButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 50,
  },
  snapText: { fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
  },
  textarea: { height: 100, textAlignVertical: 'top' },
  fotoPrzycisk: {
    marginTop: 15,
    backgroundColor: '#6c757d',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  fotoTekst: { color: '#fff' },
  preview: {
    width: '100%',
    height: 200,
    marginTop: 15,
    borderRadius: 5,
  },
  przycisk: {
    backgroundColor: '#0066cc',
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  przyciskTekst: { color: '#fff', fontSize: 16 },
  usunPrzycisk: {
    marginTop: 10,
    alignItems: 'center',
  },
  usunTekst: { color: 'red', fontSize: 16 },
});
