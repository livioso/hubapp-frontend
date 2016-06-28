import React, { PropTypes, Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
} from 'react-native';

import { color } from '../Styles/color';
import { font } from '../Styles/font';

// due to the fact that we need to clear the
// input after submitting we can't implement
// this as a stateless / pure function as it
// has a side effect on the input (using refs).
export class Searchbar extends Component {
  static propTypes = {
    search: PropTypes.func.isRequired
  };

  onSubmitEditing = (event) => {
    const search = event.nativeEvent.text;
    this.refs.searchInput.setNativeProps({ text: '' });
    this.props.search(search);
  }

  render() {
    return (
      <View style={styles.searchBar}>
        <TextInput ref="searchInput"
          onSubmitEditing={this.onSubmitEditing}
          style={[font.text, styles.searchBarTextInput]}
          returnKeyType="done" clearButtonMode="while-editing"
          placeholder="Search for members or skills..." />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBar: {
    height: 35,
    paddingLeft: 4,
    paddingRight: 4,
    borderBottomColor: color.blue,
    backgroundColor: color.blue,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  searchBarTextInput: {
    paddingLeft: 4,
    paddingRight: 4,
    backgroundColor: 'white',
    height: 30,
    flex: 1
  }
});
