// Importaciones necesarias para la navegación en React Native
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importación de las pantallas de la aplicación
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

/**
 * Definición de tipos TypeScript para las rutas de navegación
 * 
 * Esto ayuda a garantizar que la navegación sea type-safe,
 * especificando qué parámetros puede recibir cada pantalla.
 * 'undefined' significa que estas pantallas no reciben parámetros.
 */
export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
};

// Creación del navegador de pila (stack navigator) con tipos TypeScript
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Componente principal de navegación
 * 
 * Este componente configura toda la estructura de navegación de la aplicación:
 * - Envuelve las pantallas en un NavigationContainer
 * - Define las rutas disponibles (Home y Settings)
 * - Establece 'Home' como pantalla inicial
 * - Configura los títulos personalizados para cada pantalla
 */
const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Pantalla principal con título personalizado */}
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
        
        {/* Pantalla de configuración con título personalizado */}
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Configuración' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
