// Importaciones necesarias para React Native, navegación y APIs nativas
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useLocation } from '../hooks/useLocation';
import { usePhotoGallery } from '../hooks/usePhotoGallery';

/**
 * Definición de tipos para las props del componente SettingsScreen
 */
type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

/**
 * Componente de la pantalla de configuración (Settings)
 * 
 * Esta pantalla utiliza múltiples APIs nativas:
 * - 📍 Geolocalización: Muestra ubicación actual e historial
 * - 📸 Galería de fotos: Muestra estadísticas de fotos tomadas
 * - 💾 Almacenamiento: Accede a datos persistidos localmente
 */
const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  // 🔗 Integración con APIs nativas a través de custom hooks
  const { location, history: locationHistory, errorMsg } = useLocation();
  const { photos } = usePhotoGallery();
  
  // 🎛️ Estado local para controlar la UI
  const [showLocationHistory, setShowLocationHistory] = useState(false);

  /**
   * Función para limpiar todos los datos almacenados
   */
  const clearAllData = () => {
    Alert.alert(
      '🗑️ Limpiar Datos',
      '¿Estás seguro de que quieres eliminar todas las fotos y ubicaciones?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('✅ Datos eliminados', 'Reinicia la app para ver los cambios');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* 🎯 Título principal de la pantalla */}
      <Text style={styles.title}>⚙️ Configuración & Estadísticas</Text>

      {/* 📍 SECCIÓN: INFORMACIÓN DE UBICACIÓN ACTUAL */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📍 Ubicación Actual</Text>
        {errorMsg ? (
          <Text style={styles.errorText}>{errorMsg}</Text>
        ) : location ? (
          <View>
            <Text>🌍 Latitud: {location.latitude.toFixed(6)}</Text>
            <Text>🌍 Longitud: {location.longitude.toFixed(6)}</Text>
            <Text>⏰ Actualizado: {new Date(location.timestamp).toLocaleString()}</Text>
          </View>
        ) : (
          <Text>🔄 Obteniendo ubicación...</Text>
        )}
      </View>

      {/* 📊 SECCIÓN: ESTADÍSTICAS GENERALES */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📊 Estadísticas de la App</Text>
        <Text>📸 Fotos tomadas: {photos.length}</Text>
        <Text>📍 Ubicaciones registradas: {locationHistory.length}</Text>
        <Text>💾 Datos almacenados: {photos.length + locationHistory.length} registros</Text>
      </View>

      {/* 📋 SECCIÓN: HISTORIAL DE UBICACIONES */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📋 Historial de Ubicaciones</Text>
        <Button
          mode="outlined"
          onPress={() => setShowLocationHistory(!showLocationHistory)}
          style={styles.button}
        >
          {showLocationHistory ? 'Ocultar Historial' : 'Mostrar Historial'}
        </Button>
        
        {showLocationHistory && (
          <View style={styles.historyContainer}>
            {locationHistory.length > 0 ? (
              locationHistory.slice(0, 5).map((loc, index) => (
                <View key={loc.timestamp} style={styles.historyItem}>
                  <Text>📍 Ubicación {index + 1}</Text>
                  <Text>Lat: {loc.latitude.toFixed(4)}, Lon: {loc.longitude.toFixed(4)}</Text>
                  <Text>{new Date(loc.timestamp).toLocaleTimeString()}</Text>
                </View>
              ))
            ) : (
              <Text>No hay ubicaciones en el historial</Text>
            )}
          </View>
        )}
      </View>

      {/* 🛠️ SECCIÓN: HERRAMIENTAS DE GESTIÓN */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🛠️ Herramientas</Text>
        <Button
          mode="contained"
          onPress={clearAllData}
          style={[styles.button, styles.dangerButton]}
          buttonColor="#e74c3c"
        >
          🗑️ Limpiar Todos los Datos
        </Button>
        
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('Home')}
          style={styles.button}
        >
          🏠 Volver al Home
        </Button>
      </View>

      {/* 💡 SECCIÓN: INFORMACIÓN TÉCNICA */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>💡 APIs Nativas Utilizadas</Text>
        <Text>✅ expo-location (Geolocalización)</Text>
        <Text>✅ expo-image-picker (Cámara)</Text>
        <Text>✅ @react-native-async-storage (Almacenamiento)</Text>
        <Text>✅ React Navigation (Navegación)</Text>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;

/**
 * Estilos para el componente SettingsScreen
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2c3e50',
  },
  button: {
    marginVertical: 8,
  },
  dangerButton: {
    marginTop: 16,
  },
  errorText: {
    color: '#e74c3c',
    fontStyle: 'italic',
  },
  historyContainer: {
    marginTop: 16,
  },
  historyItem: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#3498db',
  },
});
