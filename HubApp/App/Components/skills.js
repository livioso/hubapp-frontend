import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Dimensions
} from 'react-native';

import { Tag } from '../Styles/tag';

export const Skills = ({ skills }) => (
  <View style={ styles.skills }>
    { skills.map(skill => (<Tag key={ skill.id }>{ `${skill.name}` }</Tag>)) }
  </View>
);

Skills.propTypes = { // eslint-disable-line immutable/no-mutation
  skills: PropTypes.array.isRequired
};

const containerWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  skills: {
    paddingTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: containerWidth - 40
  }
});
