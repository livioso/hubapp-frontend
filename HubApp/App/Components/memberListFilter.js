import React from 'react';
import {
  Animated,
  StyleSheet,
  View
} from 'react-native';

import { color } from '../Styles/color';
import { CoolButton } from '../Styles/button';
import ListFilterItem from './listFilterItem';

export const MemberListFilter = ({ onApplyFilter, filter, ...props }) => {
  return (
    <Animated.View style={styles.container}>
      <View style={{ flex: 1 }}>
        <ListFilterItem
          key={'JavaScript'}
          topic={'JavaScript'}
          color={color.red}
          isChecked={filter.includes('JavaScript')}
          onToggle={() => {onApplyFilter(['JavaScript']);}} />
        <ListFilterItem
          key={'CSS'}
          topic={'CSS'}
          color={color.red}
          isChecked={filter.includes('CSS')}
          onToggle={() => {onApplyFilter(['CSS']);}} />
      </View>
      <CoolButton caption={'Apply Filters'}
        onPress={() => props.onNavigate({ type: 'BackAction' })} />
    </Animated.View>
  );
};

MemberListFilter.propTypes = { // eslint-disable-line immutable/no-mutation
  onApplyFilter: React.PropTypes.func.isRequired,
  filter: React.PropTypes.array.isRequired,
  onNavigate: React.PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
});
