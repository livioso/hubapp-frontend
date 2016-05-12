import React from 'react'
import {
  Animated,
  ListView,
  TouchableOpacity,
  StyleSheet,
  Image,
  View
} from 'react-native';

import { Text } from '../Styles/text';
import { color } from '../Styles/color';
import { CoolButton } from '../Styles/button';
import ListFilterItem from './listFilterItem';

export const MemberListFilter = ({ onApplyFilter, ...props }) => {
  return (
    <Animated.View style={styles.container}>
      <View style={{ flex: 1}}>
        <ListFilterItem
          key={'JavaScript'}
          topic={'JavaScript'}
          color={color.red}
          isChecked={false}
          onToggle={() => {onApplyFilter(['Beat'])}} />
      </View>
      <CoolButton caption={'Apply Filters'} onPress={() => props.onNavigate({type: 'BackAction'})}/>
    </Animated.View>
  );
};

MemberListFilter.propTypes = { // eslint-disable-line immutable/no-mutation
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
});
