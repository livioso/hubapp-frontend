import React, { PropTypes } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
} from 'react-native';

import { color } from '../Styles/color';
import { font } from '../Styles/font';

export const Searchbar = ({ search, searchText }) => (
  <View style={styles.searchBar}>
    <TextInput onChangeText={search}
      value={searchText}
      clearButtonMode="always"
      style={[font.text, styles.searchBarTextInput]}
      returnKeyType="done"
      placeholder="Search for members or skills..." />
  </View>
);

Searchbar.propTypes = { // eslint-disable-line immutable/no-mutation
  search: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired
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
