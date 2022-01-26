/**
 * @format
 */

import SetupAccountScreen from './src/screens/SetupAccountScreen';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import ModalLoader from './src/components/app-modal-loader';

AppRegistry.registerComponent(appName, () => App);
