import AsyncStorage from '@react-native-async-storage/async-storage';

// Guardar un valor en AsyncStorage
export const saveData = async (key: string, value: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error guardando en AsyncStorage:', e);
  }
};

// Leer un valor desde AsyncStorage
export const getData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? (JSON.parse(jsonValue) as T) : null;
  } catch (e) {
    console.error('Error leyendo de AsyncStorage:', e);
    return null;
  }
};

/*
-saveData convierte cualquier objeto a JSON y lo guarda bajo una clave.
-getData lee la clave y la convierte de vuelta a objeto.
-Es genérico, se puede usar para ubicaciones, fotos, notas, etc..
*/ 