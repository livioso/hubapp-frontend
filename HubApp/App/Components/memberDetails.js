import React, { PropTypes } from 'react';
import {
  Linking,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  View
} from 'react-native';

import Immutable from 'immutable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text, HeaderText } from '../Styles/text';
import { color } from '../Styles/color';
import { Skills } from './skills';

export const MemberDetails = ({ member, ...props, searchForTag }) => {
  // search and then go back to where we came from
  const onPressSkillTag = (text) => {
    searchForTag(text);
    props.onNavigate({ type: 'BackAction' });
  };

  return (
    <ScrollView>
      <View style={ [styles.container, { alignItems: 'stretch' }] }>
        <View style={styles.card}>
          { renderCollobrationFlag(member.collaboration) }
          { renderLocation(member.location) }
          <Image style={styles.image}
            source={{ uri: member.picture }}
            defaultSource={require('../Styles/Assets/ic_account_circle.png')} />
            <View style={styles.businesscard}>
              <HeaderText style={styles.cardText}>
                {`${member.firstname} ${member.lastname}`}
              </HeaderText>
              <Text style={styles.cardText}>{member.position} ({member.firm})</Text>
              <View style={{ marginTop: 10 }}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => Linking.openURL(`tel:${member.phone}`)}>
                  <Icon name="phone" size={16} style={styles.cardText} />
                  <Text style={{ color: color.light, paddingLeft: 5 }}>{member.phone}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => Linking.openURL(`tel:${member.email}`)}>
                  <Icon name="mail" size={16} style={styles.cardText} />
                  <Text style={{ color: color.light, paddingLeft: 5 }}>{member.email}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Skills onPressTag={onPressSkillTag}
              skills={member.skills} style={{ paddingTop: 20 }} />
            <Text style={styles.bio}>{member.shortDescription}</Text>
            {renderSimilar({ ...member, ...props })}
        </View>
      </View>
    </ScrollView>
  );
};

const renderCollobrationFlag = (isCollobarationEnabled) => {
  if (isCollobarationEnabled) {
    return (
      <Icon name="people" size={30} style={styles.collaborationIcon} />
    );
  } else {
    return null;
  }
};

const renderLocation = (location) => {
  if (location) {
    return (
      <View style={{ position: 'absolute', top: 10, left: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="location-on" size={14} style={{ color: color.light }} />
          <Text style={{ color: color.light, paddingLeft: 5 }}>{location}</Text>
        </View>
      </View>
    );
  } else {
    return null;
  }
};
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
    <View style={styles.seperator}>
    <Text style={styles.cardText}>Similar to {firstname}:</Text>
      <View style={{ alignItems: 'center' }}>
        <ScrollView horizontal>
          {
            Immutable.Set(similar).sortBy(m => m.similarity).take(4).map(member => (
              <TouchableOpacity key={member.id}
                onPress={() => onNavigateToSimilarMember(member, props)}>
                <Image source={{ uri: member.picture }}
                  style={ styles.similarImages } />
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </View>
    </View>
  );
};

MemberDetails.propTypes = { // eslint-disable-line immutable/no-mutation
  member: PropTypes.object.isRequired,
  searchForTag: PropTypes.func.isRequired
};

renderSimilar.propTypes = { // eslint-disable-line immutable/no-mutation
  firstname: PropTypes.string.isRequired,
  similar: PropTypes.array.isRequired
};

const imageSize = Dimensions.get('window').width / 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    alignSelf: 'center',
    borderRadius: imageSize / 2,
    height: imageSize,
    width: imageSize,
  },
  seperator: {
    paddingTop: 10,
    borderTopColor: 'rgba(255,255,255,0.5)',
    borderTopWidth: 1
  },
  card: {
    margin: 10,
    marginBottom: 20,
    shadowRadius: 5,
    shadowColor: color.blue,
    shadowOffset: {
      width: 2,
      height: 6
    },
    shadowOpacity: 0.5,
    backgroundColor: color.blue,
    padding: 40
  },
  businesscard: {
    marginLeft: 0,
    paddingTop: 10,
    alignItems: 'flex-start'
  },
  cardText: {
    color: color.light
  },
  bio: {
    color: color.light,
    paddingTop: 20,
    paddingBottom: 10
  },
  similarImages: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 3,
    marginLeft: 3,
    marginTop: 5
  },
  collaborationIcon: {
    color: color.light,
    position: 'absolute',
    right: 10,
    top: 5,
  }
});
