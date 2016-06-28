import React, { PropTypes } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
} from 'react-native';

import { color } from '../Styles/color';
import { font } from '../Styles/font';

export const Searchbar = ({ search }) => (
  <View style={styles.searchBar}>
    <TextInput onChangeText={search}
      style={[font.text, styles.searchBarTextInput]}
      returnKeyType="done" clearButtonMode="while-editing"
      placeholder="Search for members or skills..." />
  </View>
);

Searchbar.propTypes = { // eslint-disable-line immutable/no-mutation
  search: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  searchBar: {
    height: 35,
    paddingLeft: 4,
    paddingRight: 4,
    borderBottomColor: color.blue,
    backgroundColor: color.blue,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  searchBarTextInput: {
    paddingLeft: 4,
    paddingRight: 4,
    backgroundColor: 'white',
    height: 30,
    flex: 1
  }
});
