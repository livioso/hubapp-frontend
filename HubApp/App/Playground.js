/* @flow weak */
/* eslint-disable no-alert, no-console, max-len */
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native';

import {color} from './Styles/color';

export const Playground = () => {

  return (
    <ScrollView>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', flex: 1}}>
        <View style={[styles.tile, {backgroundColor: color.blue}]}>
          <Icon name="public" size={30} color="white" />
          <Text style={{ color: 'white', paddingTop: 3 }}>All Members</Text>
        </View>
        <View style={[styles.tile, {backgroundColor: color.red}]}>
          <Icon name="map" size={30} color="white" />
          <Text style={{ color: 'white', paddingTop: 3 }}>Currently Here</Text>
        </View>
        <View style={[styles.tile, {backgroundColor: color.green}]}>
          <Icon name="today" size={30} color="white" />
          <Text style={{ color: 'white', paddingTop: 3 }}>New Members</Text>
        </View>
        <View style={[styles.tile, {backgroundColor: color.orange}]}>
          <Icon name="home" size={30} color="white" />
          <Text style={{ color: 'white', paddingTop: 3 }}>Staff</Text>
        </View>
        <View style={[styles.row, {backgroundColor: color.blue}]}>
          <Icon name="email" size={30} color="white" />
          <Text style={{ color: 'white', paddingTop: 3 }}>Email Your Host</Text>
        </View>
        <View style={[styles.row, {backgroundColor: color.green}]}>
          <Icon name="event" size={30} color="white" />
          <Text style={{ color: 'white', paddingTop: 3 }}>Events</Text>
        </View>
      </View>
    </ScrollView>
  );

};

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  tile: {
    height: width / 2,
    width: width / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    height: width / 4,
    width: width,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
