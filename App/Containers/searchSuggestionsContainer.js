import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SearchSuggestions } from '../Components/searchSuggestions';
import * as memberListActions from '../Actions/memberListActions';

export default connect(
  // which part of the Redux global state does
  // our component want to receive as props?
  (state) => {
    const {
      tagList: { tags: allTags },
      members: { search: { text: searchText } }
    } = state;

    // pop the last word as we want to be
    // able to support this: "CSS JavaSc"
    // and it should suggest JavaScript
    const searchWords = searchText.split(' ');
    const lastWord = searchWords.pop();

    // no suggestions when search empty
    // check with begins with on lower
    // case versions of all strings
    const suggestions = allTags
      .map(tag => tag.name)
      .filter(() => lastWord !== '')
      .filter(tag => !searchText.includes(tag))
      .filter(tag => {
        const lowerCaseTag = tag.toLowerCase();
        const lowerCaseLastWord = lastWord.toLowerCase();
        return lowerCaseTag.startsWith(lowerCaseLastWord);
      })
      .map(suggestion => {
        const remainingSearch = searchText
          .substring(0, searchText.lastIndexOf(lastWord));
        return {
          text: suggestion,
          adjustedSearch: `${remainingSearch}${suggestion} `
        };
      });

    return { suggestions };
  },

  // which action creators does
  // it want to receive by props?
  (dispatch) => {
    const {
      search
    } = bindActionCreators(memberListActions, dispatch);
    return {
      search,
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
          scope: action.scope || stateProps.navigation.key
        });
      }
    };
  }
)(SearchSuggestions);
