import React from 'react';
import { connect } from 'react-redux';
import ApplicationTabs from './Containers/navigationTabContainer';
import MemberListFilterContainer from './Containers/memberListFilterContainer';
import ModifyTagsContainer from './Containers/modifyTagsContainer';
import { MemberDetails } from './Components/memberDetails';
import { color } from './Styles/color';
import { Text } from './Styles/text';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  View,
  NavigationExperimental,
  TouchableOpacity,
  StatusBar,
  Platform,
  StyleSheet,
  Image
} from 'react-native';

const {
  CardStack: NavigationCardStack,
  Header: NavigationHeader,
} = NavigationExperimental;

const HubAppNavigator = ({ navigation, onNavigate, tabs }) => {
  StatusBar.setBarStyle('light-content', true);
  return (
    <NavigationCardStack
      navigationState={navigation}
      onNavigate={onNavigate}
      renderScene={_renderScene}
      renderOverlay={(props) => renderHeader({ ...props, tabs: tabs })} />
  );
};

const _renderScene = (props) => {
  const { key } = props.scene.navigationState;

  if (key === 'applicationTabs') {
    return (
      <View style={styles.sceneContainer}>
        <ApplicationTabs />
      </View>
    );
  }

  if (key.startsWith('details')) {
    const { member } = props.scene.navigationState;
    return (
      <View style={styles.sceneContainer}>
        <MemberDetails member={member} {...props} />
      </View>
    );
  }

  if (key === 'filter') {
    return (
      <View style={styles.sceneContainer}>
        <MemberListFilterContainer {...props} />
      </View>
    );
  }

  if (key === 'modifyTags') {
    const { member } = props.scene.navigationState;
    return (
      <View style={styles.sceneContainer}>
        <ModifyTagsContainer {...props} />
      </View>
    );
  }

  return (
    <View />
  );
};

const renderHeader = (props) => (
  <NavigationHeader
    {...props}
    style={{ backgroundColor: color.blue }}
    renderTitleComponent={renderTitleComponent}
    renderLeftComponent={renderBackButton}
    renderRightComponent={() => renderRightComponent(props)} />
);

const renderBackButton = (props) => {
  if (props.scene.index === 0) {
    return null;
  }
  return (
    <TouchableOpacity style={styles.titleButtonContainer}
      onPress={() => props.onNavigate({ type: 'BackAction' })}>
      <Image style={styles.titleButton} source={require('./Styles/Assets/back-icon.png')} />
    </TouchableOpacity>
  );
};

const renderTitleComponent = (props) => (
  <NavigationHeader.Title>
    <Text style={{ color: color.light }}>
      { props.scene.navigationState.title }
    </Text>
  </NavigationHeader.Title>
);

const renderFilterButton = (props) => (
  <TouchableOpacity
    style={styles.titleButtonContainer}
    onPress={() => {
      props.onNavigate({
        type: 'push',
        route: {
          key: 'filter',
          title: 'Filters',
        }
      });
    }} >
    <Text style={{ color: color.light, marginRight: 5 }}>
      Filter
    </Text>
  </TouchableOpacity>
);

const renderMoreButton = (props) => (
  <TouchableOpacity
    style={styles.titleButtonContainer}
    onPress={() => {
      props.onNavigate({
        type: 'push',
        route: {
          key: 'modifyTags',
          title: 'Modify Tags',
        }
      });
    }} >
    <Text style={{ color: color.light, marginRight: 5 }}>
      <Icon name="more-horiz" size={24} />
    </Text>
  </TouchableOpacity>
);

const renderRightComponent = (props) => {
  const { key } = props.scene.navigationState;

  if (props.tabs.index === 0 && key === 'applicationTabs') {
    return (
      renderFilterButton(props)
    );
  }

  if (props.tabs.index === 1 && key === 'applicationTabs') {
    return (
      renderMoreButton(props)
    );
  }

  return null;
};

export default connect(
  // which part of the Redux global state does
  // our component want to receive as props?
  (state) => {
    return {
      navigation: state.globalNav,
      tabs: state.tabs
    };
  },

  // which action creators does
  // it want to receive by props?
  (dispatch) => {
    return {
      dispatch
    };
  },

  (stateProps, dispatchProps, ownProps) => {
    return {
      ...ownProps,
      ...stateProps,
      ...dispatchProps,
      onNavigate: (action) => {
        dispatchProps.dispatch({
          ...action,
          scope: stateProps.navigation.key
        });
      }
    };
  }
)(HubAppNavigator);

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
