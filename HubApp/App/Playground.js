/* @flow weak */
/* eslint-disable no-alert, no-console, max-len */
import React from 'react';
import ReactNative from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {
  View,
  ScrollView,
  StyleSheet
} = ReactNative;

export const Playground = () => {
  const member = {
    firstname: 'Livio',
    lastname: 'Bieri',
    email: 'livio@livio.li',
    position: 'Leader at Evil Corp',
    shortDescription: 'I build stuff for the web. Mainly React.',
    skills: ['React', 'ReactNative', 'JavaScript', 'Lean UX'],
    picture: 'https://avatars0.githubusercontent.com/u/1672198?v=3&s=460',
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Icon name="home" size={30} color="#900" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    paddingBottom: 100,
    alignItems: 'center',
    backgroundColor: 'white'
  },
});
