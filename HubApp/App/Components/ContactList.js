import React, {
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

export const ContactList = () => {
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  const dataSource = ds.cloneWithRows(['row 1', 'row 2']);
  return (
    <View style={styles.list}>
      <ListView
        dataSource={dataSource}
        renderRow={(rowData) => <Text>{rowData}</Text>} />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingTop: 50
  }
});
