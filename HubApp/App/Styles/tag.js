import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Text } from '../Styles/text';
import { color } from '../Styles/color';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Tag = ({ onPress, style, ...props }) => {
  return (
    <TouchableOpacity onPress={onPress} style={ [styles.tagContainer, style] }>
      <Text style={ styles.tagCaption } {...props} />
    </TouchableOpacity>
  );
};

export const ProfileTag = ({ onPress, onDelete, style, ...props }) => {
  return (
    <TouchableOpacity onPress={onPress}
      style={ [styles.tagContainer, styles.tagProfileContainer, style] }>
      <Text style={ styles.tagCaption } {...props} />
      <TouchableOpacity onPress={() => onDelete(props.children)} style={ styles.tagCircle }>
        <Icon name="clear" style={{ color: color.light }} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

Tag.propTypes = { // eslint-disable-line immutable/no-mutation
  style: React.PropTypes.object,
  onPress: React.PropTypes.func
};

ProfileTag.propTypes = { // eslint-disable-line immutable/no-mutation
  style: React.PropTypes.object,
  onPress: React.PropTypes.func,
  onDelete: React.PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  tagContainer: {
    backgroundColor: color.blue,
    marginRight: 3,
    marginBottom: 3,
    borderRadius: 55,
    height: 20,
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  tagProfileContainer: {
    height: 35,
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    paddingRight: 3,
    borderColor: color.light,
  },
  tagCaption: {
    fontSize: 12,
    color: color.light
  },
  tagCircle: {
    borderColor: color.light,
    borderWidth: 2,
    backgroundColor: color.blue,
    height: 30,
    width: 30,
    borderRadius: 15,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
