import React from 'react';
import {
  NavigationExperimental,
  TouchableOpacity,
  StyleSheet,
  View,
  Text
} from 'react-native';

import MemberListContainer from './Containers/memberListContainer';
import { MemberDetails } from './Components/memberDetails';
import { MemberListFilter } from './Components/memberListFilter';
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
      style={{ backgroundColor: color.red }}
      renderTitleComponent={renderTitleComponent}
      renderRightComponent={() => {
        return props.scene.navigationState.key === 'Detail' ? null : renderRightComponent()
      }}/>
  );
};

const renderTitleComponent = (props) => {
  return (
    <NavigationHeader.Title>
      { props.scene.navigationState.key }
    </NavigationHeader.Title>
  );
};

const renderRightComponent = (props) => {
  return (
    <TouchableOpacity onPress={() => {}}>
      <Text>Filter</Text>
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

  // we start here => Initial View
  if (navigationState.key === Screens.Main) {
    return (
      <View style={styles.sceneContainer}>
        <MemberListContainer onPressDetail={(member) => {
          props.onNavigate({
            key: 'Detail',
            member
          });
        }} />
      </View>
    );
  }

  // segue to detail page from list view
  if (navigationState.key === Screens.Detail) {
    return (
      <View style={styles.sceneContainer}>
        <MemberDetails {...props}
          member={navigationState.member} />
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
  }
});
