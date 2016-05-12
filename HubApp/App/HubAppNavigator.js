import React from 'react';
import {
  NavigationExperimental,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  View,
  Text
} from 'react-native';

import MemberListFilterContainer from './Containers/memberListFilterContainer';
import MemberListContainer from './Containers/memberListContainer';
import { MemberDetails } from './Components/memberDetails';
import { color } from './Styles/color';

const {
  AnimatedView: NavigationAnimatedView,
  Card: NavigationCard,
  Header: NavigationHeader,
  Reducer: NavigationReducer,
  RootContainer: NavigationRootContainer,
} = NavigationExperimental;

// all the possible navigation
// states // aka screens of the app
const Screens = {
  Detail: 'Detail',
  Filter: 'Filter',
  Main: 'HubApp'
};

// our navigator responsible for
// rendering the currently active scene
export const HubAppNavigator = () => {
  StatusBar.setBarStyle('light-content', true);
  return (
    <NavigationRootContainer
      reducer={NavigationBasicReducer}
      renderNavigation={renderNavigation} />
  );
};

const renderNavigation = (navigationState) => {
  if (!navigationState) {
    return null;
  }

  return (
    <NavigationAnimatedView
      navigationState={navigationState}
      style={styles.animatedView}
      renderOverlay={renderHeader}
      renderScene={renderCard} />
  );
};

const NavigationBasicReducer = NavigationReducer.StackReducer({ // eslint-disable-line new-cap
  getPushedReducerForAction: (action) => {
    if (action.key === Screens.Detail) {
      return (state) => state || { key: action.key, member: action.member };
    }

    if (action.key === Screens.Filter) {
      return (state) => state || { key: action.key };
    }

    return null; // nothing matched :(
  },
  getReducerForState: (initialState) => (state) => state || initialState,
  initialState: {
    index: 0,
    key: 'HubApp',
    children: [{ key: Screens.Main }]
  },
});

const renderHeader = (props) => {
  return (
    <NavigationHeader
      {...props}
      style={{ backgroundColor: color.blue }}
      renderTitleComponent={renderTitleComponent}
      renderLeftComponent={renderBackButton}
      renderRightComponent={() => {
        return props.scene.navigationState.key === Screens.Main ? renderRightComponent(props) : null
      }}/>
  );
};

const renderBackButton = (props) => {
  if (props.scene.index === 0) {
    return null;
  }
  return (
    <TouchableOpacity style={styles.titleButtonContainer} onPress={() => props.onNavigate({type: 'BackAction'})}>
      <Image style={styles.titleButton} source={require('./Styles/Assets/back-icon.png')} />
    </TouchableOpacity>
  );
};

const renderTitleComponent = (props) => {
  return (
    <NavigationHeader.Title>
      <Text style={{ color: color.light }}>
        { props.scene.navigationState.key }
      </Text>
    </NavigationHeader.Title>
  );
};

const renderRightComponent = (props) => {
  return (
    <TouchableOpacity
      style={styles.titleButtonContainer}
      onPress={() => {
        props.onNavigate({
          key: Screens.Filter
      });
    }} >
      <Text style={{ color: color.light, marginRight: 5}}>
        Filter
      </Text>
    </TouchableOpacity>
  );
};

const renderCard = (props) => {
  return (
    <NavigationCard
      key={`_${props.scene.navigationState.key}`}
      renderScene={renderScene}
      {...props} />
  );
};

const renderScene = (props) => {
  const { navigationState } = props.scene;

  // segue to detail screen from list view
  if (navigationState.key === Screens.Detail) {
    return (
      <View style={styles.sceneContainer}>
        <MemberDetails {...props}
          member={navigationState.member} />
      </View>
    );
  }

  // segue to filter screen from list view
  if (navigationState.key === Screens.Filter) {
    return (
      <View style={styles.sceneContainer}>
        <MemberListFilterContainer {...props} />
      </View>
    );
  }

  // we start here => Initial View
  if (navigationState.key === Screens.Main) {
    return (
      <View style={styles.sceneContainer}>
        <MemberListContainer onPressDetail={(member) => {
          props.onNavigate({
            key: Screens.Detail,
            member
          });
        }} />
      </View>
    );
  }

};

const scenePropType = {
  scene: React.PropTypes.object.isRequired
};

// all these render function use props.scene!
renderScene.propTypes = scenePropType; // eslint-disable-line immutable/no-mutation
renderTitleComponent.propTypes = scenePropType; // eslint-disable-line immutable/no-mutation
renderCard.propTypes = scenePropType; // eslint-disable-line immutable/no-mutation

const styles = StyleSheet.create({
  sceneContainer: {
    marginTop: NavigationHeader.HEIGHT,
    backgroundColor: 'white',
    flex: 1,
  },
  animatedView: {
    flex: 1,
  },
  titleButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleButton: {
    height: 24,
    width: 24,
    margin: Platform.OS === 'ios' ? 10 : 16,
    resizeMode: 'contain'
  }
});
