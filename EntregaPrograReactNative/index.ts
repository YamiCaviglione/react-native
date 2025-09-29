// Importaciones necesarias para Expo
import { registerRootComponent } from 'expo';
import App from './App';

/**
 * Registro del componente principal de la aplicación
 * 
 * Esta función hace lo siguiente:
 * - Llama a AppRegistry.registerComponent('main', () => App) internamente
 * - Asegura que el entorno esté configurado correctamente tanto para:
 *   * Expo Go (modo desarrollo)
 *   * Build nativo (modo producción)
 * 
 * Es el punto de entrada que Expo utiliza para inicializar la aplicación.
 */
registerRootComponent(App);
