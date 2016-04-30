import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Image,
  View
} from 'react-native';

import { Text } from '../Styles/text';
import { color } from '../Styles/color';

export const MemberDetails = ({ member }) => {
  return (
    <View style={ [styles.container, { backgroundColor: color.blue }] }>
      <Image style={ styles.image } source={{ uri: member.picture }} />
      <Text>{`${member.firstname} ${member.lastname}`}</Text>
      <Text>{member.shortDescription}</Text>
      <View style={{ borderRadius: 20, backgroundColor: color.red }}>
        <Text style={{ color: 'white' }}>Programming</Text>
      </View>
    </View>
  );
};

MemberDetails.propTypes = { // eslint-disable-line immutable/no-mutation
  member: React.PropTypes.object.isRequired,
};

const imageSize = Dimensions.get('window').width / 2;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1
  },
  image: {
    alignSelf: 'center',
    borderRadius: imageSize / 2,
    height: imageSize,
    width: imageSize,
  }
});
