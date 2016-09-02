// import { Playground as HubApp } from './App/Playground';
// import { Styleguide as HubApp } from './App/Styleguide';
import { HubApp } from './App/HubApp';

import {
  AppRegistry,
} from 'react-native';

// disable warnings => ONLY do this temporary for demos
console.disableYellowBox = true; // eslint-disable-line

AppRegistry.registerComponent('HubApp', () => HubApp);
