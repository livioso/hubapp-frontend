import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ApplicationTabs from './Containers/navigationTabContainer';
import MemberListFilter from './Containers/memberListFilterContainer';
import ModifyTags from './Containers/modifyTagsContainer';
import MemberDetails from './Containers/memberDetailsContainer';
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
  Image,
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
      renderScene={renderScene}
      renderOverlay={(props) => renderHeader({ ...props, tabs })} />
  );
};

const renderScene = (props) => {
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
        <MemberListFilter {...props} />
      </View>
    );
  }

  if (key === 'modifyTags') {
    return (
      <View style={styles.sceneContainer}>
        <ModifyTags {...props} />
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
    <Text style={{ color: color.light, fontWeight: 'bold' }}>
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
    <View style={{ color: color.light, marginRight: 5, marginLeft: 15, paddingRight: 10 }}>
      <Icon name="filter-list" size={24} style={{ color: color.light }} />
    </View>
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
    <View style={{ color: color.light, marginRight: 5, marginLeft: 15, paddingRight: 10 }}>
      <Icon name="local-offer" size={24} style={{ color: color.light }} />
    </View>
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

HubAppNavigator.propTypes = { // eslint-disable-line immutable/no-mutation
  navigation: PropTypes.object.isRequired,
  onNavigate: PropTypes.func.isRequired,
  tabs: PropTypes.object.isRequired
};

renderScene.propTypes = { // eslint-disable-line immutable/no-mutation
  scene: PropTypes.object.isRequired,
};

renderBackButton.propTypes = { // eslint-disable-line immutable/no-mutation
  onNavigate: PropTypes.func.isRequired,
  scene: PropTypes.object.isRequired,
};

renderTitleComponent.propTypes = { // eslint-disable-line immutable/no-mutation
  scene: PropTypes.object.isRequired,
};

renderFilterButton.propTypes = { // eslint-disable-line immutable/no-mutation
  onNavigate: PropTypes.func.isRequired,
};

renderMoreButton.propTypes = { // eslint-disable-line immutable/no-mutation
  onNavigate: PropTypes.func.isRequired,
};

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
