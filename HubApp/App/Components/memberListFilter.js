import React from 'react'
import {
  Animated,
  ListView,
  TouchableOpacity,
  StyleSheet,
  Image,
  View
} from 'react-native';

import { Text } from '../Styles/text';

export const MemberListFilter = ({}) => {
  return (
    <Animated.View style={styles.container}>
      <Text>Yolo?</Text>
    </Animated.View>
  );
};

MemberListFilter.propTypes = { // eslint-disable-line immutable/no-mutation
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  },
});
