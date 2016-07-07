import React, { PropTypes } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  View
} from 'react-native';

import { Text, HeaderText } from '../Styles/text';
import { Tag } from '../Styles/tag';

export const MemberDetails = ({ member, ...props }) => (
  <ScrollView>
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: member.picture }}
        defaultSource={require('../Styles/Assets/ic_account_circle.png')} />
      <HeaderText>{`${member.firstname} ${member.lastname}`}</HeaderText>
      <View style={{ padding: 10, alignItems: 'center' }} >
        <Text>{member.position}</Text>
        <Text>{member.shortDescription}</Text>
        { renderSkills(member) }
        { renderSimilar({ ...member, ...props }) }
      </View>
    </View>
  </ScrollView>
);

const renderSkills = ({ skills }) => (
  <View style={styles.skills}>
    { skills.map(skill => (<Tag key={skill.id}>{`${skill.name}`}</Tag>)) }
  </View>
);

const onNavigateToSimilarMember = (member, props) => {
  props.onNavigate({
    member,
    type: 'push',
    route: {
      key: `details_${member.id}`,
      title: 'Similar Member',
      showBackButton: true,
      member
    }
  });
};

const renderSimilar = ({ similar, firstname, ...props }) => {
  if (similar === undefined || similar.length === 0) {
    return null;
  }

  return (
    <View style={styles.similar}>
      <Text>{`Similar members to ${firstname}`}</Text>
      <ScrollView horizontal style={{ height: 60 }}>
        {
          similar.map(member => (
            <TouchableOpacity key={member.id} onPress={() => onNavigateToSimilarMember(member, props)}>
              <Image source={{ uri: member.picture }} style={{ height: 60, width: 60 }} />
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </View>
  );
};

MemberDetails.propTypes = { // eslint-disable-line immutable/no-mutation
  member: PropTypes.object.isRequired,
};

renderSkills.propTypes = { // eslint-disable-line immutable/no-mutation
  skills: PropTypes.array.isRequired
};

renderSimilar.propTypes = { // eslint-disable-line immutable/no-mutation
  firstname: PropTypes.string.isRequired,
  similar: PropTypes.array.isRequired
};

// FIXME (livioso 06.12.2016) Why do we need to do this?
// Could be caused by some bug with nesting of components.
const containerWidth = Dimensions.get('window').width;
const imageSize = Dimensions.get('window').width / 3;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    flex: 1
  },
  image: {
    alignSelf: 'center',
    borderRadius: imageSize / 2,
    height: imageSize,
    width: imageSize,
  },
  skills: {
    paddingTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: containerWidth - 40
  },
  similar: {
    paddingTop: 40,
    width: containerWidth
  }
});
