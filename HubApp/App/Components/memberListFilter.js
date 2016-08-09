import React, { PropTypes } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  NavigationExperimental,
} from 'react-native';

import { color } from '../Styles/color';
import { Text, HeaderText } from '../Styles/text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { availableFilters } from '../Reducers/memberListReducer';
const { colab, viadukt, garage, collaboration } = availableFilters;

/**
 * MemberListFilter renders the filter view with the possible filter (new, location, collaboration)
 * @param onToggleFilter function that will be called when the filter gets toggled
 * @param activeFilters array of currently active filters (as string array)
 * @param memberCount amount of members
 * @param resetAll function that reset all filters (e.g. causing activeFilters => [])
 */
export const MemberListFilter = ({ onToggleFilter, activeFilters, memberCount, resetAll }) => (
  <ScrollView>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>

      { /* Filter for Colab // IHZ */ }
      <TouchableOpacity
        style={ [styles.tile, { width }] } activeOpacity={0.7}
        onPress={() => onToggleFilter(colab.identifier)}>
        <Image
          resizeMode="cover" style={ [styles.tile, { width }] }
          source={require('../Styles/Assets/IHZ_150916_master_locations_3.jpg')} />
        <View style={ [styles.wrap, { width }] }>
          <View style={ [styles.overlay, tileBackgroundColor(colab.identifier, activeFilters)]}>
            <Icon name="location-on" size={40} color="white" />
            <HeaderText style={{ color: color.light }}>Colab</HeaderText>
            <View style={{ flexDirection: 'row', paddingTop: 5 }}>
              <Text style={{ paddingRight: 5, color: color.light }}>{memberCount.colab}</Text>
              <Icon name="person" color="white" size={20} />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      { /* Filter for Viadukt */ }
      <TouchableOpacity style={styles.tile} activeOpacity={0.7}
        onPress={() => onToggleFilter(viadukt.identifier)}>
        <Image resizeMode="cover" style={styles.tile}
          source={require('../Styles/Assets/IHZ_150916_master_locations_1.jpg')} />
        <View style={styles.wrap}>
          <View style={ [styles.overlay, tileBackgroundColor(viadukt.identifier, activeFilters)]}>
            <Icon name="location-on" size={40} color="white" />
            <HeaderText style={{ color: color.light }}>Viadukt</HeaderText>
            <View style={{ flexDirection: 'row', paddingTop: 5 }}>
              <Text style={{ paddingRight: 5, color: color.light }}>{memberCount.viadukt}</Text>
              <Icon name="person" color="white" size={20} />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      { /* Filter for Garage */ }
      <TouchableOpacity style={styles.tile} activeOpacity={0.7}
        onPress={() => onToggleFilter(garage.identifier)}>
        <Image resizeMode="cover" style={styles.tile}
          source={require('../Styles/Assets/IHZ_150916_master_locations_L2.jpg')} />
        <View style={styles.wrap}>
          <View style={ [styles.overlay, tileBackgroundColor(garage.identifier, activeFilters)]}>
            <Icon name="location-on" size={40} color={ color.light } />
            <HeaderText style={{ color: color.light }}>Garage</HeaderText>
            <View style={{ flexDirection: 'row', paddingTop: 5 }}>
              <Text style={{ paddingRight: 5, color: color.light }}>{memberCount.garage}</Text>
              <Icon name="person" color="white" size={20} />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      { /* Filter for new members */ }
      <TouchableOpacity style={styles.tile} activeOpacity={0.7}
        onPress={() => onToggleFilter('new')}>
        <Image resizeMode="cover" style={styles.tile}
          source={require('../Styles/Assets/new.jpg')} />
        <View style={styles.wrap}>
          <View style={ [styles.overlay, tileBackgroundColor('new', activeFilters)]}>
            <Icon name="today" size={40} color={ color.light } />
            <HeaderText style={{ color: color.light }}>New Members</HeaderText>
            <View style={{ flexDirection: 'row', paddingTop: 5 }}>
              <Text style={{ paddingRight: 5, color: color.light }}>{memberCount.newest}</Text>
              <Icon name="person" color="white" size={20} />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      { /* Filter for collaboration */ }
      <TouchableOpacity style={styles.tile} activeOpacity={0.7}
        onPress={() => onToggleFilter(collaboration.identifier)}>
        <Image resizeMode="cover" style={styles.tile}
          source={require('../Styles/Assets/collab.jpg')} />
        <View style={styles.wrap}>
          <View style={ [styles.overlay,
            tileBackgroundColor(collaboration.identifier, activeFilters)]}>
            <Icon name="people" size={40} color={ color.light } />
            <HeaderText style={{ color: color.light }}>Open For Collaboration</HeaderText>
            <View style={{ flexDirection: 'row', paddingTop: 5 }}>
              <Text style={{ paddingRight: 5, color: color.light }}>
                {memberCount.collaboration}
              </Text>
              <Icon name="person" color="white" size={20} />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      { /* Filter for all / reset */ }
      <TouchableOpacity style={ [styles.tile, { backgroundColor: color.red, width }] }
        onPress={() => resetAll()}>
        <Icon name="public" size={40} color="white" />
        <HeaderText style={{ color: 'white', paddingTop: 3 }}>All Members</HeaderText>
        <View style={{ flexDirection: 'row', paddingTop: 5 }}>
          <Text style={{ paddingRight: 5, color: color.light }}>{memberCount.all}</Text>
          <Icon name="person" color="white" size={20} />
        </View>
      </TouchableOpacity>
    </View>
  </ScrollView>
);

MemberListFilter.propTypes = { // eslint-disable-line immutable/no-mutation
  onToggleFilter: PropTypes.func,
  activeFilters: PropTypes.array,
  memberCount: PropTypes.number.isRequired,
  resetAll: PropTypes.func
};

/**
 * Returns the backgroundColor for a tile given its name and all active filters
 * @param filter name of the filter (as a string)
 * @param activeFilters list of active filters (as strings)
 * @return backgroundColor as object of format { backgroundColor: _ }
 */
const tileBackgroundColor = (filter: String, activeFilters: Array<String>) => {
  const backgroundActive = 'rgba(25,140,170,0.7)';
  const backgroundInactive = 'rgba(0,0,0,0.3)';
  return {
    backgroundColor: activeFilters.includes(filter)
      ? backgroundActive
      : backgroundInactive
  };
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height - NavigationExperimental.Header.HEIGHT;
const styles = StyleSheet.create({
  tile: {
    height: height / 4,
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
  wrap: {
    height: height / 4,
    width: width / 2,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'transparent'
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  onPress: {
    backgroundColor: 'rgba(25,140,170,0.7)'
  }
});
