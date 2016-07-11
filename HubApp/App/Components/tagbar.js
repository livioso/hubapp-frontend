import React, { PropTypes } from 'react';
import {
  View,
} from 'react-native';

import { Tag } from '../Styles/tag';
import { color } from '../Styles/color';

export const Tagbar = ({ suggestions, search }) => (
  <View style={{ flexDirection: 'row' }}>
    {
      suggestions.map(suggestion => (
        <Tag key={ suggestion.text }
          onPress={() => search(suggestion.adjustedSearch)}
          style={{ backgroundColor: 'white', color: color.blue, borderColor: color.blue }}>
            { `${suggestion.text}` }
        </Tag>
      ))
    }
  </View>
);

Tagbar.propTypes = { // eslint-disable-line immutable/no-mutation
  suggestions: PropTypes.array.isRequired,
  search: PropTypes.func.isRequired
};
