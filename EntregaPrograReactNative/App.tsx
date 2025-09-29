// App.tsx
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

/**
 * Tema personalizado lilas para toda la app
 */
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#9b59b6', // lila oscuro
    accent: '#d1c4e9',  // lila claro
  },
};

/**
 * Componente principal de la aplicación React Native
 */
const App: React.FC = () => {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Barra de estado */}
        <StatusBar barStyle="light-content" />

        {/* Navegación principal */}
        <AppNavigator />
      </SafeAreaView>
    </PaperProvider>
  );
};

export default App;
