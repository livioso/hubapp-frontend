import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import { Text, HeaderText } from '../Styles/text';
import { ProfileTag } from '../Styles/tag';
import { color } from '../Styles/color';

export const ModifyTags = ({ tags, deleteTag, addTag }) => {
  return (
    <View style={ [styles.container, { backgroundColor: color.light }] } />
  );
};

ModifyTags.propTypes = { // eslint-disable-line immutable/no-mutation
  tags: React.PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
    flex: 1
  },
});
