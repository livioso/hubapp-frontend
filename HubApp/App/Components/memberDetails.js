import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import { Text } from '../Styles/text';
import { color } from '../Styles/color';

export const MemberDetails = ({ member }) => {
  return (
    <View style={ [styles.container, { backgroundColor: color.blue }] }>
      <Text>{member.prename}</Text>
      <Text>{member.lastname}</Text>
      <Text>{member.shortDescription}</Text>
    </View>
  );
};

MemberDetails.propTypes = { // eslint-disable-line immutable/no-mutation
  members: React.PropTypes.array.isRequired,
  onPressDetail: React.PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
