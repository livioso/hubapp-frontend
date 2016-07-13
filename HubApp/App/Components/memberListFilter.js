import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

import { color } from '../Styles/color';
import { Text } from '../Styles/text';
import { CoolButton } from '../Styles/button';
import { ListFilterItem } from './listFilterItem';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const MemberListFilter = ({ allFilters, activeFilters, onToggleFilter, ...props }) => {
  return (
    <ScrollView>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
        <View style={[styles.tile, { backgroundColor: color.red }]}>
          <Icon name="map" size={30} color="white" />
          <Text style={{ color: 'white', paddingTop: 3 }}>Currently Here</Text>
        </View>
        <View style={[styles.tile, { backgroundColor: color.green }]}>
          <Icon name="today" size={30} color="white" />
          <Text style={{ color: 'white', paddingTop: 3 }}>New Members</Text>
        </View>
        <View style={[styles.tile, { backgroundColor: color.orange }]}>
          <Icon name="home" size={30} color="white" />
          <Text style={{ color: 'white', paddingTop: 3 }}>Staff</Text>
        </View>
        <View style={[styles.tile, { backgroundColor: color.blue }]}>
          <Icon name="public" size={30} color="white" />
          <Text style={{ color: 'white', paddingTop: 3 }}>All Members</Text>
        </View>
      </View>
    </ScrollView>
  );
};

MemberListFilter.propTypes = { // eslint-disable-line immutable/no-mutation
  onNavigate: React.PropTypes.func.isRequired,
  onToggleFilter: React.PropTypes.func.isRequired,
  activeFilters: React.PropTypes.array.isRequired,
  allFilters: React.PropTypes.array.isRequired,
};

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  tile: {
    height: width / 2,
    width: width / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    height: width / 4,
    width,
  },
});
