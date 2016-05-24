import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Image,
  View
} from 'react-native';

import { Text, HeaderText } from '../Styles/text';
import { color } from '../Styles/color';

export const Profile = ({ me }) => {
  if (me === undefined) {
    return null;
  }

  return (
    <View style={ [styles.container, { backgroundColor: color.light }] }>
      <Image style={ styles.image } source={{ uri: me.picture }} />
      <HeaderText>{`${me.firstname} ${me.lastname}`}</HeaderText>
      <Text>{me.position}</Text>
      <Text>{me.shortDescription}</Text>
      { renderSkills(me.skills) }
    </View>
  );
};

const renderSkills = (skills) => {
  return (
    skills.map((skill) => {
      return <Text style={{ backgroundColor: 'red' }}>{skill.name}</Text>;
    })
  );
};

Profile.propTypes = { // eslint-disable-line immutable/no-mutation
  me: React.PropTypes.object.isRequired,
};

const imageSize = Dimensions.get('window').width / 3;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
    flex: 1
  },
  image: {
    alignSelf: 'center',
    borderRadius: imageSize / 2,
    height: imageSize,
    width: imageSize,
  }
});
