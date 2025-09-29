import React from 'react';
import { View, FlatList, StyleSheet, Image } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { usePhotoGallery } from '../hooks/usePhotoGallery';

const HomeScreen: React.FC = () => {
  const { photos, takePhoto } = usePhotoGallery();

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        📸 Fotos con Ubicación
      </Text>

      <Button
        mode="contained"
        onPress={takePhoto}
        style={styles.button}
        buttonColor="#9b59b6"
        textColor="#fff"
      >
        Tomar Foto
      </Button>

      <FlatList
        data={photos}
        keyExtractor={(item) => item.timestamp.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Image source={{ uri: item.uri }} style={styles.image} />
            <Card.Content>
              <Text>Lat: {item.latitude.toFixed(5)}, Lon: {item.longitude.toFixed(5)}</Text>
              <Text>{new Date(item.timestamp).toLocaleString()}</Text>
            </Card.Content>
          </Card>
        )}
        style={styles.list}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { textAlign: 'center', marginBottom: 16 },
  button: { marginBottom: 16 },
  list: { flex: 1 },
  card: { marginBottom: 12 },
  image: { width: '100%', height: 200, borderRadius: 8 },
});
