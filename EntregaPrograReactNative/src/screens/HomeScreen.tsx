// Importaciones necesarias para React Native y navegación
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

/**
 * Definición de tipos para las props del componente HomeScreen
 * 
 * Esto asegura que el componente reciba las props correctas de navegación
 * específicamente para la pantalla 'Home' definida en RootStackParamList
 */
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

/**
 * Componente de la pantalla principal (Home)
 * 
 * Esta es la primera pantalla que ve el usuario al abrir la aplicación.
 * Características:
 * - Muestra un título de bienvenida con emoji
 * - Incluye un botón para navegar a la pantalla de configuración
 * - Utiliza el objeto navigation para cambiar de pantalla
 * 
 * @param navigation - Objeto que permite navegar entre pantallas
 */
const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Título principal de la pantalla con emoji decorativo */}
      <Text style={styles.title}>🏠 Home Screen</Text>
      
      {/* Botón que navega a la pantalla de configuración */}
      <Button 
        title="Ir a Configuración" 
        onPress={() => navigation.navigate('Settings')} 
      />
    </View>
  );
};

export default HomeScreen;

/**
 * Estilos para el componente HomeScreen
 * 
 * - container: Centra el contenido vertical y horizontalmente
 * - title: Define el tamaño y peso de la fuente del título
 */
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  title: { 
    fontSize: 22, 
    fontWeight: '600', 
    marginBottom: 12 
  },
});
