import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Switch,
  Dimensions,
  Image,
  View
} from 'react-native';

import { Text, HeaderText } from '../Styles/text';
import { color } from '../Styles/color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Skills } from './skills';
import { ProfileChart } from './chart';

export const Profile = ({ me, toggleDisturb }) => {
  if (me === undefined) {
    return null;
  }
  return (
  <ScrollView>
    <View style={[styles.container, { alignItems: 'stretch' }]}>
      <View style={styles.card}>
        { renderCollobrationFlag(me.disturbEnabled) }
        <Image style={styles.image} source={{ uri: me.picture }}
          defaultSource={require('../Styles/Assets/ic_account_circle.png')} />
          <View style={styles.businesscard}>
            <HeaderText style={ styles.cardText}>
              {`${me.firstname} ${me.lastname}`}
            </HeaderText>
            <Text style={styles.cardText }>{me.position}</Text>
            <View style={{ marginTop: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="phone" size={16} style={styles.cardText} />
                <Text style={{ color: color.light, paddingLeft: 5 }}>{me.phone}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="mail" size={16} style={styles.cardText} />
                <Text style={{ color: color.light, paddingLeft: 5 }}>{me.email}</Text>
              </View>
            </View>
          </View>
          <Skills skills={me.skills} style={{ paddingTop: 20 }} />
          <Text style={styles.bio}>{me.shortDescription}</Text>
          <View style={styles.seperator} />
          <HeaderText style={styles.cardText}>Settings</HeaderText>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
            <Text style={{ color: color.light, paddingLeft: 5 }}>Open for Collaboration</Text>
            <Switch onValueChange={() => toggleDisturb()} value={me.disturbEnabled} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
            <Text style={{ color: color.light, paddingLeft: 5 }}>Show my Phonenumber</Text>
            <Switch onValueChange={() => alert('This feature will be implemented soon!')} value={true} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
            <Text style={{ color: color.light, paddingLeft: 5 }}>Show my Location</Text>
            <Switch onValueChange={() => alert('This feature will be implemented soon!')} value={true} />
          </View>
          <View style={styles.seperator} />
          <View style={{marginTop: 20, alignItems: 'center'}}>
            <ProfileChart percentage={me.completionPercentage} />
          </View>
      </View>
    </View>
  </ScrollView>
  );
};

const renderCollobrationFlag = (isCollobarationEnabled) => {
  if (isCollobarationEnabled) {
    return (
      <Icon name="people" size={30} style={{ color: color.light, position: 'absolute', top: 5, right: 10 }} />
    );
  } else {
    return null;
  }
};

Profile.propTypes = { // eslint-disable-line immutable/no-mutation
  me: React.PropTypes.object.isRequired,
  toggleDisturb: React.PropTypes.func.isRequired
};

const imageSize = Dimensions.get('window').width / 3;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    alignSelf: 'center',
    borderRadius: imageSize / 2,
    height: imageSize,
    width: imageSize,
  },
  seperator: {
    marginTop: 10,
    borderTopColor: 'rgba(255,255,255,0.5)',
    borderTopWidth: 1
  },
  card: {
    margin: 10,
    marginBottom: 20,
    shadowRadius: 5,
    shadowColor: color.blue,
    shadowOffset: {
      width: 2,
      height: 6
    },
    shadowOpacity: 0.5,
    backgroundColor: color.blue,
    padding: 40
  },
  businesscard: {
    marginLeft: 0,
    paddingTop: 10,
    alignItems: 'flex-start'
  },
  cardText: {
    color: color.light,
  },
  bio: {
    color: color.light,
    paddingTop: 20,
    paddingBottom: 10
  }
});
