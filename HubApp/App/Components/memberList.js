import React from 'react';
import {
  ListView,
  TouchableOpacity,
  LayoutAnimation,
  StyleSheet,
  Image,
  View
} from 'react-native';

import { Text } from '../Styles/text';
import { color } from '../Styles/color';

export const MemberList = ({ members, filters, onPressDetail, onClearFilters }) => {
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  const dataSource = ds.cloneWithRows(members);
  return (
    <View style={styles.list}>
      { renderActiveFilters(filters, onClearFilters) }
      <ListView
        enableEmptySections
        renderRow={(member) => renderMemberRow(member, onPressDetail)}
        dataSource={dataSource} />
    </View>
  );
};

const renderActiveFilters = (filters, onClearFilters) => {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  if (filters.length === 0) {
    return null;
  }

  return (
    <View style={ styles.activeFilter }>
      <Text style={{ color: color.light, marginLeft: 5 }}>{filters.join()}</Text>
      <TouchableOpacity onPress={onClearFilters}>
        <Text style={{ color: color.light, marginRight: 5 }}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const renderMemberRow = (member, onPressDetail) => {
  return (
    <TouchableOpacity onPress={() => onPressDetail(member)}>
      <View style={styles.memberRowContainer}>
        <Image source={{ uri: member.picture }}
          defaultSource={require('../Styles/Assets/ic_account_circle.png')}
          style={styles.profilePicture} />
        <View style={styles.memberDescription}>
          <Text>{`${member.firstname} ${member.lastname}`}</Text>
          <View style={{ flexDirection: 'row' }}>
            {
              member.skills.map(skill => {
                return (
                <View style={{ backgroundColor: 'tomato', marginRight: 5 }}>
                  <Text style={{ fontSize: 12 }}>{`${skill.name}`}</Text>
                </View>);
              })
            }
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

MemberList.propTypes = { // eslint-disable-line immutable/no-mutation
  members: React.PropTypes.array.isRequired,
  filters: React.PropTypes.array.isRequired,
  onPressDetail: React.PropTypes.func.isRequired,
  onClearFilters: React.PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  memberDescription: {
    paddingLeft: 10,
  },
  memberRowContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: color.light,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  profilePicture: {
    borderRadius: 30,
    width: 60,
    height: 60
  },
  activeFilter: {
    backgroundColor: color.red,
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 25,
  }
});
