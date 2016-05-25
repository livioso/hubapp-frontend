import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Image,
  View
} from 'react-native';

import { Text, HeaderText } from '../Styles/text';
import { color } from '../Styles/color';

export const MemberDetails = ({ member }) => {
  return (
    <View style={ [styles.container, { backgroundColor: color.light }] }>
      <Image style={ styles.image } source={{ uri: member.picture }}
        defaultSource={require('../Styles/Assets/ic_account_circle.png')} />
      <HeaderText>{`${member.firstname} ${member.lastname}`}</HeaderText>
      <Text>{member.position}</Text>
      <Text>{member.shortDescription}</Text>
      { renderSkills(member.skills) }
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

MemberDetails.propTypes = { // eslint-disable-line immutable/no-mutation
  member: React.PropTypes.object.isRequired,
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
