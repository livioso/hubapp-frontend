import { StyleSheet, Dimensions } from 'react-native';

const scale = Dimensions.get('window').width / 375;

// normalize the size depending on
// the device dimensions
const normalize = (size) => {
  return Math.round(scale * size);
};

export const font = StyleSheet.create({
  text: {
    fontSize: normalize(15),
    lineHeight: normalize(23),
    color: 'white',
    fontWeight: 'normal',
    letterSpacing: -1,
    fontFamily: 'OpenSans'
  },
  h1: {
    fontSize: normalize(24),
    lineHeight: normalize(27),
    color: 'black',
    fontWeight: 'bold',
    letterSpacing: -1,
  },
  p: {
    fontSize: normalize(15),
    lineHeight: normalize(23),
    color: 'white',
  },
});

