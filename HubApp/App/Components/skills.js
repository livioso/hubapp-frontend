import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Dimensions
} from 'react-native';

import { Tag } from '../Styles/tag';
import { color } from '../Styles/color';

export const Skills = ({ skills, style, onPressTag = () => {} }) => (
  <View style={ [styles.skills, style] }>
    {
      skills.map(skill => (
        <Tag key={skill.id} style={styles.tag} onPress={() => onPressTag(skill.name)}>
          {`${skill.name}`}
        </Tag>)
      )
    }
  </View>
);

Skills.propTypes = { // eslint-disable-line immutable/no-mutation
  skills: PropTypes.array.isRequired,
  onPressTag: PropTypes.func,
  style: PropTypes.object
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
    color: color.blue
  }
});
