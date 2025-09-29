import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { saveData, getData } from '../utils/storage';

export interface Photo {
  uri: string;
  latitude: number;
  longitude: number;
  timestamp: number;
}

export const usePhotoGallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const loadPhotos = async () => {
      const stored = (await getData<Photo[]>('photos')) || [];
      setPhotos(stored);
    };
    loadPhotos();
  }, []);

  const takePhoto = async () => {
    try {
      // Permisos de cámara
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') return alert('Permiso de cámara denegado');

      // Permisos de ubicación
      const locationStatus = await Location.requestForegroundPermissionsAsync();
      if (locationStatus.status !== 'granted') return alert('Permiso de ubicación denegado');

      // Tomar foto
      const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0]; // primer asset
        const loc = await Location.getCurrentPositionAsync({});
        const newPhoto: Photo = {
          uri: asset.uri, // ahora sí existe
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          timestamp: Date.now(),
        };

        const updatedPhotos = [newPhoto, ...photos];
        setPhotos(updatedPhotos);
        await saveData('photos', updatedPhotos);
      }
    } catch (e) {
      console.error(e);
      alert('Error tomando foto');
    }
  };

  return { photos, takePhoto };
};
