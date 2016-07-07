import React, { PropTypes } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  View
} from 'react-native';

import Immutable from 'immutable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text, HeaderText } from '../Styles/text';
import { color } from '../Styles/color';
import { Skills } from './skills';

export const MemberDetails = ({ member, ...props }) => (
  <ScrollView>
    <View style={[styles.container, {alignItems: 'stretch'}]}>
      <View style={ styles.card }>
          <Image style={ styles.image } source={{ uri: member.picture }} defaultSource={require('../Styles/Assets/ic_account_circle.png')} />
          <View style={ styles.businesscard }>
            <HeaderText style={ styles.cardText }>{`${member.firstname} ${member.lastname}`}</HeaderText>
            <Text style={ styles.cardText }>{ member.position }</Text>
            <View style={{marginTop:10}}>
              <View style={{flexDirection: 'row'}}>
                <Icon name="phone" size={16} style={ styles.cardText }/><Text style={{color: color.light, paddingLeft: 5}}>{ member.phone }</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Icon name="mail" size={16} style={ styles.cardText }/><Text style={{color: color.light, paddingLeft: 5}}>{ member.email }</Text>
              </View>
            </View>
          </View>
          <Skills skills={ member.skills } style={{paddingTop: 20}}/>
          <Text style={ styles.bio }>{ member.shortDescription }</Text>
          {renderSimilar({...member, ...props})}
      </View>
    </View>
  </ScrollView>
);

const onNavigateToSimilarMember = (member, props) => {
  props.onNavigate({
    member,
    type: 'push',
    route: {
      key: `details_${member.id}`,
      title: 'Similar Member',
      showBackButton: true,
      member
    }
  });
};

const renderSimilar = ({ similar, firstname, ...props }) => {
  if (similar === undefined || similar.length === 0) {
    return null;
  }

  return (
    <View style={styles.similar}>
      <View style={{alignItems: 'center'}}>
        <ScrollView horizontal>
          {
            Immutable.Set(similar).sortBy(m => m.similarity).take(4).map(member => (
              <TouchableOpacity key={member.id} onPress={() => onNavigateToSimilarMember(member, props)}>
                <Image source={{ uri: member.picture }} style={ styles.similarImages } />
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </View>
    </View>
  );
};

MemberDetails.propTypes = { // eslint-disable-line immutable/no-mutation
  member: PropTypes.object.isRequired,
};

renderSimilar.propTypes = { // eslint-disable-line immutable/no-mutation
  firstname: PropTypes.string.isRequired,
  similar: PropTypes.array.isRequired
};

const imageSize = Dimensions.get('window').width / 3;

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    alignSelf: 'center',
    borderRadius: imageSize / 2,
    height: imageSize,
    width: imageSize,
  },
  similar: {
    paddingTop: 10,
    borderTopColor: 'rgba(255,255,255,0.5)',
    borderTopWidth: 1
  },
  card: {
    margin:10,
    marginBottom: 20,
    shadowRadius:5,
    shadowColor: color.blue,
    shadowOffset: {
      width:2,
      height:6
    },
    shadowOpacity:0.5,
    backgroundColor: color.blue,
    padding:40
  },
  businesscard: {
    marginLeft:0,
    paddingTop:10,
    alignItems:'flex-start'
  },
  cardText: {
    color: color.light
  },
  bio: {
    color: color.light,
    paddingTop: 20,
    paddingBottom: 10
  },
  similarImages: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 3,
    marginLeft: 3,
    marginTop:5
  }
});
