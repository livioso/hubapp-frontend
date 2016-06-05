import React, { PropTypes, Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text, HeaderText } from '../Styles/text';
import { ProfileTag } from '../Styles/tag';
import { color } from '../Styles/color';
import { font } from '../Styles/font';

export const ModifyTags = ({ tags = [
  'C',
  'Java',
  'JavaScript',
  'Programming',
  'Webdevelopment'
], deleteTag = (tag) => alert(tag), addTag = (tag) => alert(tag) }) => (
  <ScrollView style={ styles.container }>
    <AddTagBar addTag={addTag} />
    { activeTags(tags, deleteTag) }
  </ScrollView>
);

// due to the fact that we need to clear the
// input after submitting we can't implement
// this as a stateless / pure function as it
// has a side effect on the input (using refs).
class AddTagBar extends Component {
  static propTypes = {
    addTag: PropTypes.func.isRequired
  };

  onSubmitEditing = (event) => {
    const newTag = event.nativeEvent.text;
    this.refs.tagInput.setNativeProps({ text: '' });
    this.props.addTag(newTag);
  }

  render() {
    return (
      <View style={{ marginLeft: 5, marginRight: 5, borderBottomWidth: 2, marginBottom: 10, borderBottomColor: color.blue, justifyContent: 'space-between', flexDirection: 'row'}}>
        <TextInput ref="tagInput" style={[font.text, { height: 30, borderWidth: 0, flex: 1 }]} placeholder="Add new tag to your profile" returnKeyType="done" clearButtonMode="while-editing" onSubmitEditing={this.onSubmitEditing} />
      </View>
    );
  }
}

const activeTags = (tags, deleteTag) => (
  <View style={{ backgroundColor: color.light, flexDirection: 'row', flexWrap: 'wrap', padding: 4 }}>
  {
    tags.map(tag => {
      return (
        <View style={{ paddingLeft: 2, paddingBottom: 2 }}>
          <ProfileTag onDelete={deleteTag}>{tag}</ProfileTag>
        </View>
      );
    })
  }
  </View>
);

ModifyTags.propTypes = { // eslint-disable-line immutable/no-mutation
  tags: React.PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1
  },
  tagCircle: {
    borderColor: color.light,
    borderWidth: 2,
    backgroundColor: color.blue,
    height: 30,
    width: 30,
    borderRadius: 15,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end'
  }
});
