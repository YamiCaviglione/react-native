// Importaciones necesarias para React y componentes de Expo
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';

/**
 * Componente principal de la aplicación React Native
 * 
 * Este componente actúa como punto de entrada de la aplicación.
 * Configura la barra de estado y renderiza el navegador principal.
 */
const App: React.FC = () => {
  return (
    <>
      {/* Configuración de la barra de estado con estilo automático */}
      <StatusBar style="auto" />
      
      {/* Componente de navegación principal que maneja todas las pantallas */}
      <AppNavigator />
    </>
  );
};

export default App;
