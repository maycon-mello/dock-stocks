import {AppRegistry} from 'react-native';
import {
  IEXCLOUD_API_VERSION,
  IEXCLOUD_PUBLIC_KEY,
  IEXCLOUD_SECRET_KEY,
} from '@env';

process.env.IEXCLOUD_API_VERSION = IEXCLOUD_API_VERSION;
process.env.IEXCLOUD_PUBLIC_KEY = IEXCLOUD_PUBLIC_KEY;
process.env.IEXCLOUD_SECRET_KEY = IEXCLOUD_SECRET_KEY;

import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

