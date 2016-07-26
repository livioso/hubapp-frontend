import React, { PropTypes, Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';

import { HeaderText } from '../Styles/text';
import { ProfileTag, Tag } from '../Styles/tag';
import { color } from '../Styles/color';
import { font } from '../Styles/font';
import TagCloud from '../Containers/tagcloudContainer';

export class ModifyTags extends Component {
  constructor() {
    super();
    this.state = { // eslint-disable-line immutable/no-mutation
      textInputTextFocused: false
    };
  }

  onFocus() {
    this.setState({
      textInputTextFocused: true
    });
  }

  onEndEditing() {
    this.setState({
      textInputTextFocused: false
    });
  }

  render() {
    const { tags, tagInputText, suggestions, ...props } = this.props;
    const { addTag, removeTag, changeTagInputText } = props;
    const cloud = (suggestions.length === 0 && !this.state.textInputTextFocused) ?
      (
        <View style={ [styles.card, { backgroundColor: color.green, shadowColor: color.green }] }>
          <HeaderText style={{ paddingLeft: 10, color: color.light }}>Popular Skills</HeaderText>
          <TagCloud addSkill={addTag} />
        </View>
      ) : null;

      return (
        <ScrollView style={{ flex: 1 }}>
            <AddTagBar addTag={addTag}
            onChangeText={changeTagInputText} value={tagInputText}
            onFocus={() => this.onFocus()} onEndEditing={() => this.onEndEditing()} />
            { renderSuggestions(suggestions, addTag) }
          <View style={ [styles.container, {alignItems: 'stretch'}]}>
            <View style={styles.card}>
              <HeaderText style={styles.cardText}>Your Skills</HeaderText>
              { renderActiveTags(tags, removeTag) }
            </View>
              {
                cloud
              }
          </View>
        </ScrollView>
      );
  }
}

class AddTagBar extends Component { // eslint-disable-line react/no-multi-comp
  static propTypes = {
    addTag: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onEndEditing: PropTypes.func.isRequired
  };

  onSubmitEditing = (event) => {
    const newTag = event.nativeEvent.text;
    this.refs.tagInput.setNativeProps({ text: '' });
    this.props.addTag(newTag);
    this.props.onChangeText('');
  }

  render() {
    return (
      <View style={styles.tagInputWrapper}>
        <TextInput ref="tagInput" style={[font.text, styles.tagInputText]}
          value={this.props.value}
          placeholder="Add new tag to your profile"
          onChangeText={this.props.onChangeText}
          onSubmitEditing={this.onSubmitEditing}
          clearButtonMode="always"
          onFocus={this.props.onFocus}
          onEndEditing={this.props.onEndEditing}
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

const renderSuggestions = (suggestions, addTag) => (
  <View style={styles.skills}>
    {
      suggestions.map(skill => (
        <Tag key={skill} style={styles.tag} onPress={() => addTag(skill)}>
          {`${skill}`}
        </Tag>)
      )
    }
  </View>
);
ModifyTags.propTypes = { // eslint-disable-line immutable/no-mutation
  tags: PropTypes.array.isRequired,
  removeTag: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  tagInputText: PropTypes.string.isRequired,
  changeTagInputText: PropTypes.func.isRequired,
  suggestions: PropTypes.array.isRequired
};

const containerWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    margin: 10,
    marginBottom: 5,
    shadowRadius: 5,
    shadowColor: color.blue,
    shadowOffset: {
      width: 2,
      height: 6
    },
    shadowOpacity: 0.5,
    backgroundColor: color.blue,
    padding: 5
  },
  cardText: {
    color: color.light,
  },
  activeTags: {
    backgroundColor: color.blue,
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
  },
  skills: {
    margin: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: color.blue,
    color: color.light
  }
});
