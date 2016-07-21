import React from 'react';
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

export const MemberListFilter = ({ onToggleFilter, activeFilters, memberCount, resetAll }) => {
  return (
    <ScrollView>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
        <TouchableOpacity style={ [styles.tile, {width: width}] } activeOpacity={0.7} onPress={() => onToggleFilter('colab')}>
          <Image resizeMode='cover' style={ [styles.tile, {width: width}] } source={require('../Styles/Assets/IHZ_150916_master_locations_3.jpg')} />
          <View style={ [styles.wrap, { width: width }] }>
            <View style={ [styles.overlay, { backgroundColor: activeFilters.includes('colab')? 'rgba(25,140,170,0.7)' : 'rgba(0,0,0,0.3)'}]}>
              <Icon name='location-on' size={40} color='white' />
              <HeaderText style={{ color: color.light }}>Colab</HeaderText>
              <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                <Text style={{ paddingRight: 5, color: color.light }}>{memberCount.colab}</Text>
                <Icon name='person' color='white' size={20}/>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tile} activeOpacity={0.7} onPress={() => onToggleFilter('viadukt')}>
          <Image resizeMode='cover' style={styles.tile} source={require('../Styles/Assets/IHZ_150916_master_locations_1.jpg')} />
          <View style={styles.wrap}>
            <View style={ [styles.overlay, { backgroundColor: activeFilters.includes('viadukt')? 'rgba(25,140,170,0.7)' : 'rgba(0,0,0,0.3)'}]}>
              <Icon name='location-on' size={40} color='white' />
              <HeaderText style={{ color: color.light }}>Viadukt</HeaderText>
              <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                <Text style={{ paddingRight: 5, color: color.light }}>{memberCount.viadukt}</Text>
                <Icon name='person' color='white' size={20}/>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tile} activeOpacity={0.7} onPress={() => onToggleFilter('garage')}>
          <Image resizeMode='cover' style={styles.tile} source={require('../Styles/Assets/IHZ_150916_master_locations_L2.jpg')} />
          <View style={styles.wrap}>
            <View style={ [styles.overlay, { backgroundColor: activeFilters.includes('garage')? 'rgba(25,140,170,0.7)' : 'rgba(0,0,0,0.3)'}]}>
              <Icon name='location-on' size={40} color={ color.light } />
              <HeaderText style={{ color: color.light }}>Garage</HeaderText>
              <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                <Text style={{ paddingRight: 5, color: color.light }}>{memberCount.garage}</Text>
                <Icon name='person' color='white' size={20}/>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tile} activeOpacity={0.7} onPress={() => onToggleFilter('new')}>
          <Image resizeMode='cover' style={styles.tile} source={require('../Styles/Assets/new.jpg')} />
          <View style={styles.wrap}>
            <View style={ [styles.overlay, { backgroundColor: activeFilters.includes('new')? 'rgba(25,140,170,0.7)' : 'rgba(0,0,0,0.3)'}]}>
              <Icon name='today' size={40} color={ color.light } />
              <HeaderText style={{ color: color.light }}>New Members</HeaderText>
              <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                <Text style={{ paddingRight: 5, color: color.light }}>{memberCount.newest}</Text>
                <Icon name='person' color='white' size={20}/>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tile} activeOpacity={0.7} onPress={() => onToggleFilter('collaboration')}>
          <Image resizeMode='cover' style={styles.tile} source={require('../Styles/Assets/collab.jpg')} />
          <View style={styles.wrap}>
            <View style={ [styles.overlay, { backgroundColor: activeFilters.includes('collaboration')? 'rgba(25,140,170,0.7)' : 'rgba(0,0,0,0.3)'}]}>
              <Icon name='people' size={40} color={ color.light } />
              <HeaderText style={{ color: color.light }}>Open For Collaboration</HeaderText>
              <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                <Text style={{ paddingRight: 5, color: color.light }}>{memberCount.collaboration}</Text>
                <Icon name='person' color='white' size={20}/>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tile, { backgroundColor: color.red, width: width }]} onPress={() => resetAll()}>
          <Icon name="public" size={40} color="white" />
          <HeaderText style={{ color: 'white', paddingTop: 3 }}>All Members</HeaderText>
          <View style={{ flexDirection: 'row', paddingTop: 5 }}>
            <Text style={{ paddingRight: 5, color: color.light }}>{memberCount.all}</Text>
            <Icon name='person' color='white' size={20}/>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

MemberListFilter.propTypes = { // eslint-disable-line immutable/no-mutation
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height - NavigationExperimental.Header.HEIGHT;
const styles = StyleSheet.create({
  tile: {
    height: height/4,
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
