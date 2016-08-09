/* @flow weak */
/* eslint-disable no-alert, no-console, max-len */
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { color } from './Styles/color';
import Immutable from 'immutable';

export const Playground = () => {
  const skillList = countList(members).sortBy(o => o.count).takeLast(50).sortBy(o => o.skill.name);
  const min = Math.log(skillList.minBy(o => o.count).count);
  const max = Math.log(skillList.maxBy(o => o.count).count);
  return (
    <ScrollView>
      <TagCloud skillList={skillList} min={min} max={max} addSkill={(skill) => alert(skill.count)} />
   </ScrollView>
  );
};

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

TagCloud.propTypes = { // eslint-disable-line immutable/no-mutation
  style: React.PropTypes.object,
  addSkill: React.PropTypes.func,
  skillList: React.PropTypes.object.isRequired,
  min: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired
};

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

const countList = members => {
  const immutableMembers = Immutable.List(members);
  return immutableMembers
  .map(m => Immutable.List(m.skills))
  .flatten()
  .groupBy(s => s.id)
  .map(l => ({ skill: l.first(), count: l.count() }));
};

const styles = StyleSheet.create({
  skills: {
    paddingTop: 50,
    flexDirection: 'row',
    flexWrap: 'wrap',
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

const mem1 = {
  name: 'livio',
  skills: [
    {
      id: 1,
      name: 'javascript'
    },
    {
      id: 2,
      name: 'java'
    },
    {
      id: 3,
      name: 'jassen'
    }
  ]
};

const mem2 = {
  name: 'yves',
  skills: [
    {
      id: 2,
      name: 'java'
    },
    {
      id: 4,
      name: 'css'
    }
  ]
};

const mem3 = {
  name: 'marius',
  skills: [
    {
      id: 1,
      name: 'javascript'
    }, {
      id: 1,
      name: 'javascript'
    }, {
      id: 1,
      name: 'javascript'
    }, {
      id: 1,
      name: 'javascript'
    }, {
      id: 1,
      name: 'javascript'
    }, {
      id: 1,
      name: 'javascript'
    }, {
      id: 1,
      name: 'javascript'
    }, {
      id: 1,
      name: 'javascript'
    }, {
      id: 1,
      name: 'javascript'
    }, {
      id: 1,
      name: 'javascript'
    }, {
      id: 1,
      name: 'javascript'
    }, {
      id: 1,
      name: 'javascript'
    }, {
      id: 1,
      name: 'javascript'
    }, {
      id: 1,
      name: 'javascript'
    },
    {
      id: 5,
      name: 'c#'
    },
    {
      id: 6,
      name: 'react'
    }
  ]
};

const members = [mem1, mem2, mem3];
