// src/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NoteProvider } from './context/NoteContext';
import NoteListScreen from './screens/NoteListScreen';
import NoteDetailScreen from './screens/NoteDetailScreen';
import { ErrorBoundary } from './components/ErrorBoundary';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ErrorBoundary>
      <NoteProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="ListaNotatek">
            <Stack.Screen
              name="ListaNotatek"
              component={NoteListScreen}
              options={{ title: 'Moje Notatki' }}
            />
            <Stack.Screen
              name="SzczegolyNotatki"
              component={NoteDetailScreen}
              options={{ title: 'Szczegóły Notatki' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NoteProvider>
    </ErrorBoundary>
  );
}
