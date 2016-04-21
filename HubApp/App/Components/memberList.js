import React, {
  ListView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';

export const MemberList = ({ members }) => {
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  const dataSource = ds.cloneWithRows(members);
  return (
    <View style={styles.list}>
      <ListView
        renderRow={(member) => renderMemberRow(member)}
        dataSource={dataSource} />
    </View>
  );
};

const renderMemberRow = (member) => {
  return (
    <TouchableOpacity onPress={onPressMemberRow}>
      <View style={styles.memberRowContainer}>
        <Image source={{ uri: member.picture }} style={{ width: 60, height: 60, borderRadius: 30 }} />
        <Text>{`${member.prename} ${member.lastname}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const onPressMemberRow = () => {
  alert('To be Implemented');
}

MemberList.propTypes = { // eslint-disable-line immutable/no-mutation
  members: React.PropTypes.array.isRequired,
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
  }
});
