import React from 'react';
import {
  View,
  PixelRatio
} from 'react-native';

export const Playground = () => {
  return (
    <NavigationAnimatedExample />
  );
};

const ReactNative = require('react-native');

const {
  Animated,
  NavigationExperimental,
  StyleSheet,
  ScrollView,
} = ReactNative;


const {
  AnimatedView: NavigationAnimatedView,
  Card: NavigationCard,
  Header: NavigationHeader,
  Reducer: NavigationReducer,
  RootContainer: NavigationRootContainer,
} = NavigationExperimental;

const NavigationBasicReducer = NavigationReducer.StackReducer({ // eslint-disable-line new-cap
  getPushedReducerForAction: (action) => {
    switch (action.type) {
      case 'detail':
        return (state) => state || { key: action.key, id: action.id };
      case 'settings':
        return (state) => state || { key: action.key };
      default:
        return null;
    }
  },
  getReducerForState: (initialState) => (state) => state || initialState,
  initialState: {
    key: 'main',
    index: 0,
    children: [
      { key: 'HubApp' },
    ],
  },
});

const NavigationAnimatedExample = () => {
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
      renderScene={renderCard}
      applyAnimation={(pos, navState) => {
        Animated.timing(pos, { toValue: navState.index, duration: 200 }).start();
      }}
    />
  );
};

const renderHeader = (props) => {
  return (
    <NavigationHeader
      navigationProps={props}
      renderTitleComponent={renderTitleComponent}
    />
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
      {...props}
    />
  );
};

const renderScene = (props) => {
  switch (props.scene.navigationState.key) {
    case 'detail':
      return (
        <View style={{flex: 1, backgroundColor: 'red', marginTop: NavigationHeader.HEIGHT}}>
          <Text style={{textAlign: 'center'}}>
            {props.scene.navigationState.id}
          </Text>
        </View>);
    case 'settings':
      return (
        <View style={{flex: 1, backgroundColor: 'blue'}}/>)
    default:
    return (
      <ScrollView style={styles.scrollView}>
        <NavigationExampleRow
          text={props.scene.navigationState.key}
        />
        <NavigationExampleRow
          text="Detail 1"
          onPress={() => {
            props.onNavigate({
              type: 'detail',
              key: 'detail',
              id: 1
            });
          }}
        />
        <NavigationExampleRow
          text="Detail 2"
          onPress={() => {
            props.onNavigate({
              type: 'detail',
              key: 'detail',
              id: 2
            });
          }}
        />
        <NavigationExampleRow
          text="Detail 3"
          onPress={() => {
            props.onNavigate({
              type: 'detail',
              key: 'detail',
              id: 3
            });
          }}
        />
        <NavigationExampleRow
          text="Settings"
          onPress={() => {
            props.onNavigate({
              type: 'settings',
              key: 'settings',
            });
          }}
        />
      </ScrollView>
  );
  }
};

var {
  Text,
  TouchableHighlight,
} = ReactNative;

var NavigationExampleRow = React.createClass({
  render: function() {
    if (this.props.onPress) {
      return (
        <TouchableHighlight
          style={styles.row}
          underlayColor="#D0D0D0"
          onPress={this.props.onPress}>
          <Text style={styles.buttonText}>
            {this.props.text}
          </Text>
        </TouchableHighlight>
      );
    }
    return (
      <View style={styles.row}>
        <Text style={styles.rowText}>
          {this.props.text}
        </Text>
      </View>
    );
  },
});

const styles = StyleSheet.create({
  row: {
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
  },
  rowText: {
    fontSize: 17,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  animatedView: {
    flex: 1,
  },
  scrollView: {
    marginTop: NavigationHeader.HEIGHT,
  },
});

