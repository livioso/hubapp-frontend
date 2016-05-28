import React from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

import { color } from '../Styles/color';
import { CoolButton } from '../Styles/button';
import { ListFilterItem } from './listFilterItem';

export const MemberListFilter = ({ allFilters, activeFilters, onToggleFilter, ...props }) => {
  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          {
            allFilters.map((filter) => (

              <ListFilterItem
                key={filter.id}
                filter={filter.name}
                color={color.blue}
                isChecked={activeFilters.includes(filter.name)}
                onToggle={() => {onToggleFilter(filter.name);}} />

            ))
          }
        </ScrollView>
      </Animated.View>
      <CoolButton onPress={() => props.onNavigate({ type: 'BackAction' })}
        caption={'Apply Filters'} />
    </View>
  );
};

MemberListFilter.propTypes = { // eslint-disable-line immutable/no-mutation
  onNavigate: React.PropTypes.func.isRequired,
  onToggleFilter: React.PropTypes.func.isRequired,
  activeFilters: React.PropTypes.array.isRequired,
  allFilters: React.PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: 'white'
  },
});
