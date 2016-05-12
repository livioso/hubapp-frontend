// @flow weak
import React from 'react';
import ReactNative from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
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

export const CoolButton = (props) => {
  const caption = props.caption.toUpperCase();
  const content = (
    <LinearGradient
      start={[0.5, 1]} end={[1, 1]}
      colors={[color.orange, color.orange]}
      style={[b_styles.button, b_styles.primaryButton]}>
      <Text style={{ color: color.light }}>
        {caption}
      </Text>
    </LinearGradient>
  );

  return (
    <TouchableOpacity
      accessibilityTraits="button"
      onPress={props.onPress}
      activeOpacity={0.8}
      style={[b_styles.container]}>
      {content}
    </TouchableOpacity>
  )
}

const HEIGHT = 50;

var b_styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 25
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  border: {
    borderWidth: 1,
    borderColor: color.light,
    borderRadius: HEIGHT / 2,
  },
  primaryButton: {
    borderRadius: HEIGHT / 2,
    backgroundColor: 'transparent',
  },
  icon: {
    marginRight: 12,
  },
  caption: {
    letterSpacing: 1,
    fontSize: 12,
  },
  primaryCaption: {
    color: 'white',
  },
  secondaryCaption: {
    color: color.light,
  }
});


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
