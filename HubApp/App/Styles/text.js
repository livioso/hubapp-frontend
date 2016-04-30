import React from 'react-native';
import { font } from './font';

export const Text = ({ style, ...props }) => {
  return (
    <React.Text style={[font.text, style]} {...props} />
  );
};

export const HeaderText = ({ style, ...props }) => {
  return (
    <React.Text style={[font.h1, style]} {...props} />
  );
};

Text.propTypes = { // eslint-disable-line immutable/no-mutation
  style: React.PropTypes.any
};

HeaderText.propTypes = { // eslint-disable-line immutable/no-mutation
  style: React.PropTypes.any
};
