import React from 'react';
import MemberListContainer from './Containers/memberListContainer';
import {
  NavigationExperimental,
  StyleSheet,
  View,
  Text,
} from 'react-native';

const {
  AnimatedView: NavigationAnimatedView,
  Card: NavigationCard,
  Header: NavigationHeader,
  Reducer: NavigationReducer,
  RootContainer: NavigationRootContainer,
} = NavigationExperimental;

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
    if (action.key === 'Detail') {
      return (state) => state || { key: action.key, id: action.id };
    }
    if (action.key === 'settings') {
      return (state) => state || { key: action.key };
    }
    return null;
  },
  getReducerForState: (initialState) => (state) => state || initialState,
  initialState: {
    index: 0,
    key: 'main',
    children: [{ key: 'HubApp' }]
  },
});

const renderHeader = (props) => {
  return (
    <NavigationHeader
      navigationProps={props}
      renderTitleComponent={renderTitleComponent} />
  );
};

const renderTitleComponent = (props) => {
  return (
    <NavigationHeader.Title>
      { props.scene.navigationState.key }
    </NavigationHeader.Title>
  );
};

const renderCard = (props) => {
  return (
    <NavigationCard
      key={`key_${props.scene.navigationState.key}`}
      renderScene={renderScene}
      {...props} />
  );
};

const renderScene = (props) => {
  const { navigationState } = props.scene;

  // segue to detail page from list view
  if (navigationState.key === 'Detail') {
    return (
      <View style={styles.sceneContainer}>
        <Text style={{ textAlign: 'center' }}>
          {props.scene.navigationState.id}
        </Text>
      </View>
    );
  }

  if (navigationState.key === 'Settings') {
    return (
      <View style={styles.sceneContainer} />
    );
  }

  // initial view => list of members ;)
  return (
    <View style={styles.sceneContainer}>
      <MemberListContainer onPressDetail={(memberId) => {
        props.onNavigate({
          key: 'Detail',
          id: memberId
        });
      }} />
    </View>
  );
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
    flex: 1,
  },
  animatedView: {
    flex: 1,
  },
  scrollView: {
    marginTop: NavigationHeader.HEIGHT,
  },
});
