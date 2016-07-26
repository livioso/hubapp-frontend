import React, { PropTypes, Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';

import { Text, HeaderText } from '../Styles/text';
import { ProfileTag } from '../Styles/tag';
import { color } from '../Styles/color';
import { font } from '../Styles/font';
import TagCloud from '../Containers/tagcloudContainer';

export const ModifyTags = ({ tags, tagInputText, suggestions, ...props }) => {
  const { addTag, removeTag, changeTagInputText } = props;
  return (
    <ScrollView style={ styles.container }>
      <AddTagBar addTag={addTag} onChangeText={changeTagInputText} value={tagInputText} />
      <HeaderText style={{ paddingLeft: 10, color: color.blue }}>Suggestions</HeaderText>
      { renderSuggestions(suggestions) }
      <HeaderText style={{ paddingLeft: 10, color: color.blue }}>Your Skills</HeaderText>
      { renderActiveTags(tags, removeTag) }
      <HeaderText style={{ paddingLeft: 10, color: color.blue }}>Popular Skills</HeaderText>
      <TagCloud />
    </ScrollView>
  );
};

// due to the fact that we need to clear the
// input after submitting we can't implement
// this as a stateless / pure function as it
// has a side effect on the input (using refs).
class AddTagBar extends Component {
  static propTypes = {
    addTag: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired
  };

  onSubmitEditing = (event) => {
    const newTag = event.nativeEvent.text;
    this.refs.tagInput.setNativeProps({ text: '' });
    this.props.addTag(newTag);
  }

  render() {
    return (
      <View style={styles.tagInputWrapper}>
        <TextInput ref="tagInput" style={[font.text, styles.tagInputText]}
          value={this.props.value}
          placeholder="Add new tag to your profile"
          onChangeText={this.props.onChangeText}
          onSubmitEditing={this.onSubmitEditing}
          clearButtonMode="while-editing"
          returnKeyType="done" />
      </View>
    );
  }
}

const renderActiveTags = (tags, removeTag) => (
  <View style={styles.activeTags}>
  {
    tags.map(tag => {
      return (
        <View style={{ paddingLeft: 2, paddingBottom: 2 }} key={tag.id}>
          <ProfileTag onDelete={removeTag}>{tag.name}</ProfileTag>
        </View>
      );
    })
  }
  </View>
);

const renderSuggestions = (suggestions) => (
  <View>
    { suggestions.map(suggestion => (<Text>{suggestion}</Text>)) }
  </View>
);
ModifyTags.propTypes = { // eslint-disable-line immutable/no-mutation
  tags: PropTypes.array.isRequired,
  removeTag: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activeTags: {
    backgroundColor: color.light,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4
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
  },
  tagInputWrapper: {
    marginLeft: 5,
    marginRight: 5,
    borderBottomWidth: 2,
    marginBottom: 10,
    borderBottomColor: color.blue,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  tagInputText: {
    height: 30,
    borderWidth: 0,
    flex: 1
  }
});
