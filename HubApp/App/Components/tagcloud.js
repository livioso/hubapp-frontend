import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { color } from '../Styles/color';

export const TagCloud = ({ skillList, min, max, addSkill, style }) => (
  <View style={styles.skills}>
    {
      skillList.map(skill => (
        <TouchableOpacity key={skill.skill.id} style={ [styles.tagButton, style] } onPress={() => addSkill(skill)}>
          {
            renderTag(skill, max, min, 12, 20)
          }
        </TouchableOpacity>
      ))
    }
  </View>
);

const renderTag = (skill, max, min, base, range) => {
  const fontSize = Math.round((Math.log(skill.count) - min) * (range / (max - min)) + base);
  const height = fontSize + fontSize / 5;
  const borderRadius = height / 2;
  const padding = height / 2;
  return (
    <Text style={ [styles.tag, { fontSize, height, borderRadius, paddingLeft: padding, paddingRight: padding }] }>
      {skill.skill.name}
    </Text>
  );
};

TagCloud.propTypes = { // eslint-disable-line immutable/no-mutation
  style: React.PropTypes.object,
  addSkill: React.PropTypes.func,
  skillList: React.PropTypes.object.isRequired,
  min: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  tagButton: {
    margin: 3,
    justifyContent: 'center'
  },
  tag: {
    backgroundColor: color.green,
    color: color.light
  }
});
