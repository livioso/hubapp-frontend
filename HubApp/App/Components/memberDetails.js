import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Image,
  View
} from 'react-native';

import { Text, HeaderText } from '../Styles/text';
import { Tag } from '../Styles/tag';
import { color } from '../Styles/color';

export const MemberDetails = ({ member }) => {
  return (
    <View style={ [styles.container, { backgroundColor: color.light }] }>
      <Image style={ styles.image } source={{ uri: member.picture }}
        defaultSource={require('../Styles/Assets/ic_account_circle.png')} />
      <HeaderText>{`${member.firstname} ${member.lastname}`}</HeaderText>

			<View style={{ padding: 10, alignItems: 'center' }} >
				<Text>{member.position}</Text>
				<Text>{member.shortDescription}</Text>
      </View>
      { renderSkills(member.skills) }
    </View>
  );
};

const renderSkills = (skills) => {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1, margin: 20 }}>
      {
        skills.map(skill => {
          return (
            <Tag key={skill.id}>{`${skill.name}`}</Tag>
          );
        })
      }
    </View>
  );
};

MemberDetails.propTypes = {
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
