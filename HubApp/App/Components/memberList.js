import React from 'react';
import {
  ListView,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
} from 'react-native';

import { Text } from '../Styles/text';
import { color } from '../Styles/color';
import { Searchbar } from './searchbar';
import Searchsuggestions from '../Containers/searchSuggestionsContainer';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const MemberList = ({ members, searchText, onNavigate, onSearch }) => (
  <View style={{ flex: 1 }}>
    <Searchbar searchText={searchText} search={onSearch} />
    <Searchsuggestions />
    { renderMemberList(members, onNavigate) }
  </View>
);

const renderMemberList = (members, onNavigate) => {
  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2
  });

  const dataSource = ds.cloneWithRowsAndSections(members);

  const onNavigateToMember = member => {
    onNavigate({
      member,
      type: 'push',
      route: {
        title: `Details for ${member.firstname}`,
        key: `details_${member.id}`,
        showBackButton: true,
        member
      }
    });
  };

  return (
    <ListView
      style={{ flex: 1 }}
      enableEmptySections
      renderSectionHeader={renderSectionHeader}
      dataSource={dataSource}
      renderRow={member => renderMemberRow(member, () => onNavigateToMember(member))} />
  );
};

const renderSectionHeader = (sectionData, sectionName) => (
  <View style={{ backgroundColor: 'rgba(146, 146, 146, 0.5)' }}>
    <Text style={{ color: color.light, paddingLeft: 7, margin: 4 }}>{sectionName}</Text>
  </View>
);

const renderMemberRow = (member, onPressDetail) => (
  <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => onPressDetail()}>
    <View style={styles.memberRowContainer}>
      <Image source={{ uri: member.picture }}
        defaultSource={require('../Styles/Assets/ic_account_circle.png')}
        style={styles.profilePicture} />
      <View style={styles.memberDescription}>
        <Text>{`${member.firstname} ${member.lastname}`}</Text>
        <Text style={{ color: color.gray }}>{member.position}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="location-on" size={14} style={{ color: color.gray }} />
          <Text style={{ color: color.gray, paddingLeft: 5 }}>{member.location}</Text>
        </View>
      </View>
      { renderCollobrationFlag(member.collaboration) }
    </View>
  </TouchableOpacity>
);

const renderCollobrationFlag = (isCollobarationEnabled) => {
  if (isCollobarationEnabled) {
    return (
      <View style={{ justifyContent: 'space-between' }}>
        <Icon name="people" size={20} style={styles.collaborationIcon} />
      </View>
    );
  } else {
    return null;
  }
};

MemberList.propTypes = { // eslint-disable-line immutable/no-mutation
  members: React.PropTypes.array.isRequired,
  searchText: React.PropTypes.string.isRequired,
  searchSuggetions: React.PropTypes.array.isRequired,
  onNavigate: React.PropTypes.func.isRequired,
  onSearch: React.PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  memberDescription: {
    flex: 1,
    paddingLeft: 10,
  },
  memberRowContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: color.light,
    margin: 3,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  profilePicture: {
    borderRadius: 30,
    width: 60,
    height: 60
  },
  collaborationIcon: {
    color: color.gray,
    marginRight: 5
  }
});
