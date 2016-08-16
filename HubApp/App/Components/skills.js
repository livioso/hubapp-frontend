import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Dimensions
} from 'react-native';

import { Tag } from '../Styles/tag';
import { color } from '../Styles/color';

/**
 * Render skills given by parameter skills as a skill view.
 * @param skills list of skills as array of strings, example ['C', 'C++', 'Java']
 * @param onPress callback that gets called when a tag gets clicked.
 * @param style styling for the container (wrapper) of tags.
 * @param tagStyle styling for tags themselves.
 */
export const Skills = ({ skills, style, tagStyle, onPressTag = () => {} }) => (
  <View style={ [styles.skills, style] }>
    {
      skills.map(skill => (
        <Tag key={skill.id} style={ [styles.tag, tagStyle] } onPress={() => onPressTag(skill.name)}>
          {`${skill.name}`}
        </Tag>)
      )
    }
  </View>
);

Skills.propTypes = { // eslint-disable-line immutable/no-mutation
  skills: PropTypes.array.isRequired,
  onPressTag: PropTypes.func,
  style: PropTypes.object,
  tagStyle: PropTypes.object
};

const containerWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  skills: {
    paddingTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: containerWidth - 80
  },
  tag: {
    backgroundColor: color.light,
    margin: 3,
    color: color.blue
  }
});
