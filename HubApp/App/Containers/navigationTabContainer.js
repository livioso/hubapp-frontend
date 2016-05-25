import React from 'react';
import { connect } from 'react-redux';
import ProfileContainer from './profileContainer';
import MemberListContainer from './memberListContainer';

import {
  View,
  TabBarIOS,
  NavigationExperimental
} from 'react-native';


const { Reducer: NavigationReducer } = NavigationExperimental;
const { JumpToAction } = NavigationReducer.TabsReducer;

const renderTabContent = (tab) => {
  if (tab.key === 'profile') {
    return (
      <ProfileContainer />
    );
  }

  if (tab.key === 'members') {
    return (
      <MemberListContainer />
    );
  }

  return null;
};

const ApplicationTabs = ({ navigation, onNavigate }) => {
  const children = navigation.children.map((tab, i) => {
    return (
      <TabBarIOS.Item key={tab.key}
        icon={tab.icon}
        selectedIcon={tab.selectedIcon}
        title={tab.title}
        onPress={() => onNavigate(JumpToAction(i))}
        selected={navigation.index === i}>
      { renderTabContent(tab) }
      </TabBarIOS.Item>
    );
  });

  return (
    <TabBarIOS tintColor="black">
      {children}
    </TabBarIOS>
  );
};

ApplicationTabs.propTypes = { // eslint-disable-line immutable/no-mutation
  onNavigate: React.PropTypes.func.isRequired,
  navigation: React.PropTypes.object.isRequired,
};

export default connect(
  // which part of the Redux global state does
  // our component want to receive as props?
  (state) => {
    return {
      navigation: state.tabs
    };
  },

  // which action creators does
  // it want to receive by props?
  (dispatch) => {
    return {
      dispatch
    };
  },

  // inject the scope to on navigate
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
)(ApplicationTabs);
