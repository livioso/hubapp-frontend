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
      <Text style={ [styles.tagCaption, style] } {...props} />
    </TouchableOpacity>
  );
};

export const ProfileTag = ({ onPress, onDelete, style, ...props }) => {
  return (
    <TouchableOpacity onPress={onPress}
      style={ [styles.tagContainer, styles.tagProfileContainer, style] }>
      <Text style={{ color: color.blue, fontSize: 12 }} {...props} />
      <TouchableOpacity onPress={() => onDelete(props.children)} style={ styles.tagCircle }>
        <Icon name="clear" style={{ color: color.blue }} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

Tag.propTypes = { // eslint-disable-line immutable/no-mutation
  style: React.PropTypes.object,
  onPress: React.PropTypes.func,
  children: React.PropTypes.object,
};

ProfileTag.propTypes = { // eslint-disable-line immutable/no-mutation
  style: React.PropTypes.object,
  onPress: React.PropTypes.func,
  onDelete: React.PropTypes.func.isRequired,
  children: React.PropTypes.object,
};

const styles = StyleSheet.create({
  tagContainer: {
    backgroundColor: color.light,
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
    paddingTop: 0,
    paddingLeft: 5,
    paddingBottom: 0,
    paddingRight: 0,
    borderColor: color.blue,
  },
  tagCaption: {
    fontSize: 12,
    color: color.light
  },
  tagCircle: {
    borderColor: color.blue,
    borderWidth: 2,
    backgroundColor: color.light,
    height: 37,
    width: 37,
    borderRadius: 17,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
