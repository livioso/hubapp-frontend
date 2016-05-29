import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Text } from '../Styles/text';
import { color } from '../Styles/color';

export const Tag = ({ onPress, onDelete = undefined, style, ...props }) => {
  const deleteButton = onDelete !== undefined ? (
    <TouchableOpacity onPress={onDelete} />
  ) : null;
  return (
    <TouchableOpacity onPress={onPress} style={ [styles.tagContainer, style] }>
      <Text style={ styles.tagCaption } {...props} />
    </TouchableOpacity>
  );
};

Tag.propTypes = { // eslint-disable-line immutable/no-mutation
  style: React.PropTypes.object,
  onPress: React.PropTypes.func
};

const styles = StyleSheet.create({
  tagContainer: {
    backgroundColor: color.blue,
    marginRight: 3,
    marginBottom: 3,
    borderRadius: 55,
    height: 20,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  tagCaption: {
    fontSize: 12,
    color: color.light
  }
});
