import React from 'react';
import {
  ListView,
  TouchableOpacity,
  StyleSheet,
  Image,
  View
} from 'react-native';

import { Text } from '../Styles/text';

export const MemberList = ({ members, onPressDetail }) => {
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  const dataSource = ds.cloneWithRows(members);
  return (
    <View style={styles.list}>
      <ListView
        renderRow={(member) => renderMemberRow(member, onPressDetail)}
        dataSource={dataSource} />
    </View>
  );
};

const renderMemberRow = (member, onPressDetail) => {
  return (
    <TouchableOpacity onPress={() => onPressDetail(member)}>
      <View style={styles.memberRowContainer}>
        <Image source={{ uri: member.picture }}
          style={styles.profilePicture} />
        <Text>{`${member.prename} ${member.lastname}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

MemberList.propTypes = { // eslint-disable-line immutable/no-mutation
  members: React.PropTypes.array.isRequired,
  onPressDetail: React.PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  memberRowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30
  }
});
