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

export const MemberList = ({ members, filter, onPressDetail, onClearFilter }) => {
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  const dataSource = ds.cloneWithRows(members);
  return (
    <View style={styles.list}>
      { renderActiveFilter(filter, onClearFilter) }
      <ListView
        enableEmptySections
        renderRow={(member) => renderMemberRow(member, onPressDetail)}
        dataSource={dataSource} />
    </View>
  );
};

const renderActiveFilter = (filter, onClearFilter) => {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  if (filter.length === 0) {
    return null;
  }

  return (
    <View style={ styles.activeFilter }>
      <Text style={{ color: color.light, marginLeft: 5 }}>{filter.join()}</Text>
      <TouchableOpacity onPress={onClearFilter}>
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
        <Text>{`${member.firstname} ${member.lastname}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

MemberList.propTypes = { // eslint-disable-line immutable/no-mutation
  members: React.PropTypes.array.isRequired,
  filter: React.PropTypes.array.isRequired,
  onPressDetail: React.PropTypes.func.isRequired,
  onClearFilter: React.PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  memberRowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
