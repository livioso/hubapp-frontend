import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MemberList } from '../Components/memberList';
import * as memberListActions from '../Actions/memberListActions';
import Immutable from 'immutable';

import {
  filterMembersByFullWordMatch,
  filterMembersByPartialWordMatch,
  filterMembersBySmartSearch
} from '../Reducers/memberListReducer';

export default connect(
  // which part of the Redux global state does
  // our component want to receive as props?
  (state) => {
    const { globalNav: navigation, members } = state;

    // destruct the slightly
    // complicated state :)
    const {
      data: { list },
      search: { text: searchText, suggestions }
    } = members;

    const allMember = list.map((member) => {
      return {
        ...member,
        category: member.lastname.charAt(0).toUpperCase(),
      };
    });

    // get results for searches
    const fulltextSearch =
      Immutable.Set(filterMembersByFullWordMatch(allMember, searchText));

    const fullTextSearchPartial =
      Immutable.Set(filterMembersByPartialWordMatch(allMember, searchText));

    const smartSearch =
      Immutable.Set(filterMembersBySmartSearch(allMember, searchText, suggestions));

    // annotated the search results with
    // categories. Make sure to not do this
    // before comparing (e.g. has()).
    const smartSearchAnnotated = smartSearch
      .filter(member => !fulltextSearch.has(member))
      .filter(member => !fullTextSearchPartial.has(member))
      .map(member => {
        return { ...member, category: 'Good Matches' };
      });

    const fulltextSearchPartialMatch = fullTextSearchPartial
      .filter(member => !fulltextSearch.has(member))
      .map(member => {
        return { ...member, category: 'Good Matches' };
      });

    const fulltextSearchAnnotated = fulltextSearch
      .map(member => {
        return { ...member, category: 'Best Matches' };
      });

    // merge it all together :)
    const mergedGoodMatches = fulltextSearchPartialMatch.concat(smartSearchAnnotated);
    const mergedSearch = fulltextSearchAnnotated.concat(mergedGoodMatches);

    const membersWithSections = searchText !== ''
      ? mergedSearch.toJS()
      : allMember;

    const membersWithSectionsGrouped = Immutable.Set(membersWithSections)
      .sortBy(member => member.lastname)
      .sortBy(member => member.category)
      .groupBy(member => member.category)
      .toJS();

    return {
      members: membersWithSectionsGrouped,
      searchText,
      navigation
    };
  },

  // which action creators does
  // it want to receive by props?
  (dispatch) => {
    const {
      search
    } = bindActionCreators(memberListActions, dispatch);
    return {
      onSearch: search,
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
)(MemberList);
