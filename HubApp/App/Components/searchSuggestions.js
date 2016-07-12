import React, { PropTypes } from 'react';
import {
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';

import { color } from '../Styles/color';
import { Text } from '../Styles/text';

export const SearchSuggestions = ({ suggestions, search }) => {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <ScrollView automaticallyAdjustContentInsets={false} horizontal
      style={{ paddingLeft: 7, height: 30, backgroundColor: color.blue }}>
      <View style={{ flexDirection: 'row' }}>
        {
          suggestions.map(suggestion => (
            <TouchableOpacity key={ suggestion.text }
              onPress={() => search(suggestion.adjustedSearch)}>
              <Text style={{ color: color.light, borderColor: color.blue }}>
                { `${suggestion.text}  ` }
              </Text>
            </TouchableOpacity>
          ))
        }
      </View>
    </ScrollView>
  );
};

SearchSuggestions.propTypes = { // eslint-disable-line immutable/no-mutation
  suggestions: PropTypes.array.isRequired,
  search: PropTypes.func.isRequired
};
