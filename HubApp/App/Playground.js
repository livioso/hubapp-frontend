/* @flow weak */
/* eslint-disable no-alert, no-console, max-len */
import React from 'react';
import {
  View,
} from 'react-native';

// the point of this file is to be able to quickly try out something,
// bootstrap a simple view component and test it with some simple
// mocked props before introducing in into the project. :)
// simply change index.ios.js to to load
// Playground.js instead of HubApp.js
export const Playground = () => (
  <View style={{ flex: 1, backgroundColor: 'tomato' }} />
);
