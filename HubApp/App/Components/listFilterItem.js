import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import { Text } from '../Styles/text';

export const ListFilterItem = ({ filter, color, isChecked, onToggle }) => {
  const style = isChecked
    ? { backgroundColor: color }
    : { borderColor: color, borderWidth: 2 };
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.container}
        onPress={onToggle}>
        <View style={[styles.checkbox, style]} />
        <Text style={styles.title}>
          {filter}
        </Text>
      </TouchableOpacity>
    );
};

ListFilterItem.propTypes = { // eslint-disable-line immutable/no-mutation
  filter: React.PropTypes.string,
  color: React.PropTypes.string,
  isChecked: React.PropTypes.boolean,
  onToggle: React.PropTypes.func
};

const SIZE = 24;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkbox: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    marginRight: 10,
  },
  title: {
    color: 'black',
    flex: 1,
  },
});
