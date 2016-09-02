// TABS
import { NavigationExperimental } from 'react-native';
const { Reducer: NavigationReducer } = NavigationExperimental;

const allTabs = [
  { key: 'members', icon: 'list', title: 'Members' },
	{ key: 'profile', icon: 'account-box', title: 'Profile' },
];

export const tabs = NavigationReducer.TabsReducer({
  key: 'ApplicationTabs',
  initialIndex: 0,
  tabReducers: allTabs.map(t => (lastRoute) => lastRoute || t)
});

// GLOBAL
const globalNavigation = NavigationReducer.StackReducer({
  getPushedReducerForAction: (action) => {
    if (action.type === 'push') {
      return (state) => (state || action.route);
    }
    return null;
  },
  initialState: {
    key: 'global',
    index: 0,
    children: [
      {
        key: 'applicationTabs',
        title: 'HubApp',
        index: 0
      },
    ],
  },
});

export const globalNav = (state, action) => {
  if (action.scope && action.scope !== 'global') {
    return state;
  } else {
    return globalNavigation(state, action);
  }
};
