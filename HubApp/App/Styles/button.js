// @flow weak
import React from 'react';
import ReactNative from 'react-native';
import { font } from './font';
import { color } from './color';
import { Text } from './text';

const {
  View,
  StyleSheet,
  TouchableOpacity
} = ReactNative;

export const Button = ({ style, onPress, ...props }) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View style={[styles.button, style]}>
        <Text style={[font.text, styles.caption]} {...props} />
      </View>
    </TouchableOpacity>
  );
};

export const SquareButton = ({ style, onPress, ...props }) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View style={[styles.button, { borderRadius: 0 }, style]}>
        <Text style={[font.text, styles.caption]} {...props} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 240,
    height: 50,
    backgroundColor: color.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 5,
  },
  caption: {
    color: color.light,
    textAlign: 'center'
  }
});

const propTypes = {
  style: React.PropTypes.object,
  color: React.PropTypes.object,
  onPress: React.PropTypes.func.isRequired
};

Button.propTypes = propTypes; // eslint-disable-line immutable/no-mutation
SquareButton.propTypes = propTypes; // eslint-disable-line immutable/no-mutation
