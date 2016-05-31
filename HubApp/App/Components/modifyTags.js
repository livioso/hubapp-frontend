import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput
} from 'react-native';

import { Text, HeaderText } from '../Styles/text';
import { ProfileTag } from '../Styles/tag';
import { color } from '../Styles/color';

export const ModifyTags = ({ tags = [
  'C',
  'Java',
  'JavaScript',
  'Programming',
  'Webdevelopment'
], deleteTag, addTag }) => {
  return (
    <ScrollView style={ styles.container }>
      { addTagBar() }
      { activeTags(tags) }
    </ScrollView>
  );
};

const addTagBar = () => {
  return (
    <TextInput defaultValue="yolo yolo " style={{height: 40, borderColor: 'gray', borderWidth: 1, keyboardType: 'twitter' }} />
  );
};

const activeTags = (tags) => {
  return (
    <View style={{ backgroundColor: color.light, flexDirection: 'row', flexWrap: 'wrap', padding: 4 }}>
    {
      tags.map(tag => {
        return (
          <View style={{ paddingLeft: 2, paddingBottom: 2 }}>
            <ProfileTag>{tag}</ProfileTag>
          </View>
        );
      })
    }
    </View>
  );
};

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
    justifyContent: 'center'
  }
});
