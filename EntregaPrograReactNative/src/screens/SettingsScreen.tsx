// Importaciones necesarias para React Native y navegación
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

/**
 * Definición de tipos para las props del componente SettingsScreen
 * 
 * Esto asegura que el componente reciba las props correctas de navegación
 * específicamente para la pantalla 'Settings' definida en RootStackParamList
 */
type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

/**
 * Componente de la pantalla de configuración (Settings)
 * 
 * Esta pantalla permite al usuario acceder a las configuraciones de la app.
 * Características:
 * - Muestra un título identificativo con emoji
 * - Incluye un botón para regresar a la pantalla principal
 * - Utiliza el objeto navigation para navegar de vuelta al Home
 * 
 * @param navigation - Objeto que permite navegar entre pantallas
 */
const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Título de la pantalla de configuración con emoji decorativo */}
      <Text style={styles.title}>⚙️ Settings Screen</Text>
      
      {/* Botón que regresa a la pantalla principal (Home) */}
      <Button 
        title="Volver al Home" 
        onPress={() => navigation.navigate('Home')} 
      />
    </View>
  );
};

export default SettingsScreen;

/**
 * Estilos para el componente SettingsScreen
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
