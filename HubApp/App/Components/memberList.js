import React from 'react';
import {
  ListView,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  ScrollView,
} from 'react-native';

import { Text } from '../Styles/text';
import { color } from '../Styles/color';
import { Searchbar } from './searchbar';
import Immutable from 'immutable';

export const MemberList = ({ members, filters, onClearFilters, onSearch, ...props }) => {
  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2
  });

  const membersWithSections = Immutable.Set(members)
    .sortBy(member => member.lastname)
    .sortBy(member => member.category)
    .groupBy(member => member.category)
    .toJS();

  const dataSource = ds.cloneWithRowsAndSections(membersWithSections);

  return (
    <View style={styles.list}>
      <Searchbar search={onSearch} />
      { renderActiveFilters(filters, onClearFilters) }
      <ListView
        enableEmptySections
        renderSectionHeader={renderSectionHeader}
        renderRow={(member) => renderMemberRow(member, () => {
          props.onNavigate({
            member,
            type: 'push',
            route: {
              key: `details_${member.id}`,
              title: `Details for ${member.firstname}`,
              showBackButton: true,
              member
            }
          });
        })}
        dataSource={dataSource} />
    </View>
  );
};

const renderActiveFilters = (filters, onClearFilters) => {
  if (filters.length === 0) {
    return null;
  }

  return (
    <View style={ styles.activeFilter }>
      <ScrollView horizontal>
        <Text style={{ color: color.light, marginLeft: 5 }}>{filters.join(', ')}</Text>
      </ScrollView>
      <TouchableOpacity onPress={onClearFilters}>
        <Text style={{ color: color.light, marginRight: 5 }}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const renderSectionHeader = (sectionData, sectionName) => (
  <View style={{ backgroundColor: 'rgba(180, 180, 180, 0.7)' }}>
    <Text style={{ color: color.light, paddingLeft: 5 }}>{sectionName}</Text>
  </View>
);

const renderMemberRow = (member, onPressDetail) => {
  return (
    <TouchableOpacity onPress={() => onPressDetail()}>
      <View style={styles.memberRowContainer}>
        <Image source={{ uri: member.picture }}
          defaultSource={require('../Styles/Assets/ic_account_circle.png')}
          style={styles.profilePicture} />
        <View style={styles.memberDescription}>
          <Text>{`${member.firstname} ${member.lastname}`}</Text>
          <Text style={{ color: color.gray }}>{member.position}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

MemberList.propTypes = { // eslint-disable-line immutable/no-mutation
  members: React.PropTypes.array.isRequired,
  filters: React.PropTypes.array.isRequired,
  onClearFilters: React.PropTypes.func.isRequired,
  onNavigate: React.PropTypes.func.isRequired,
  onSearch: React.PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  memberDescription: {
    flex: 1,
    paddingLeft: 10,
  },
  memberRowContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: color.light,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  profilePicture: {
    borderRadius: 30,
    width: 60,
    height: 60
  },
  activeFilter: {
    backgroundColor: color.green,
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 25,
  },
  tagContainer: {
    backgroundColor: color.blue,
    marginRight: 3,
    marginBottom: 3,
    borderRadius: 55,
    height: 20,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tagCaption: {
    fontSize: 12,
    color: color.light
  }
});
