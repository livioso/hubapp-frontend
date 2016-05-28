import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import { Text } from '../Styles/text';
import { color } from '../Styles/color';

export const Tag = ({ style, ...props }) => {
  return (
    <View style={ [styles.tagContainer, style] }>
      <Text style={ styles.tagCaption } {...props} />
    </View>
  );
};

Tag.propTypes = { // eslint-disable-line immutable/no-mutation
  style: React.PropTypes.object
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  memberDescription: {
    flex: 1,
    paddingLeft: 10,
  },
  memberRowContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: color.light,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  profilePicture: {
    borderRadius: 30,
    width: 60,
    height: 60
  },
  activeFilter: {
    backgroundColor: color.green,
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 25,
  },
  tagContainer: {
    backgroundColor: color.blue,
    marginRight: 3,
    marginBottom: 3,
    borderRadius: 55,
    height: 20,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tagCaption: {
    fontSize: 12,
    color: color.light
  }
});
