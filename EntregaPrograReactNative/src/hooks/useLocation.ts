import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { saveData, getData } from '../utils/storage';

export interface LocationData {
  latitude: number;
  longitude: number;
  timestamp: number;
}

export const useLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [history, setHistory] = useState<LocationData[]>([]);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permiso de ubicación denegado');
          return;
        }

        // Leer historial guardado
        const storedHistory = (await getData<LocationData[]>('locations')) || [];
        setHistory(storedHistory);

        // Obtener ubicación actual
        const currentLocation = await Location.getCurrentPositionAsync({});
        const newLocation: LocationData = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          timestamp: Date.now(),
        };
        setLocation(newLocation);

        // Guardar en historial
        const updatedHistory = [newLocation, ...storedHistory];
        setHistory(updatedHistory);
        await saveData('locations', updatedHistory);
      } catch (error) {
        setErrorMsg('Error obteniendo ubicación');
        console.error(error);
      }
    };

    getLocation();
  }, []);

  return { location, history, errorMsg };
};
