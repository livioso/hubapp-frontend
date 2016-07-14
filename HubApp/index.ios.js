import { Playground as HubApp } from './App/Playground';
// import { Styleguide as HubApp } from './App/Styleguide';
// import { HubApp } from './App/HubApp';

import {
  AppRegistry,
} from 'react-native';

// disable warnings :)
console.disableYellowBox = true; // eslint-disable-line immutable/no-mutation

AppRegistry.registerComponent('HubApp', () => HubApp);
