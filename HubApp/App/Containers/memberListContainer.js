import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MemberList } from '../Components/memberList';
import * as memberListActions from '../Actions/memberListActions';
import Immutable from 'immutable';

import {
  filterMembersByJaccard,
  filterMembersByLiveSearch,
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
      filter: { active: activeFilter },
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
      Immutable.Set(filterMembersByLiveSearch(allMember, searchText));

    const smartSearch =
      Immutable.Set(filterMembersBySmartSearch(allMember, searchText, suggestions));

    // annotated the search results with
    // categories. Make sure to not do this
    // before comparing (e.g. has()).
    const smartSearchAnnotated = smartSearch
      .filter(member => !fulltextSearch.has(member))
      .map(member => {
        return { ...member, category: 'So Smart' };
      });

    const fulltextSearchAnnotated = fulltextSearch
      .map(member => {
        return { ...member, category: 'So Context' };
      });

    const mergedSearch = fulltextSearchAnnotated
      .concat(smartSearchAnnotated);

    return {
      members: searchText === ''
        ? filterMembersByJaccard(allMember, activeFilter, 1)
        : filterMembersByJaccard(mergedSearch.toJS(), activeFilter, 1),
      filters: activeFilter,
      navigation
    };
  },

  // which action creators does
  // it want to receive by props?
  (dispatch) => {
    const {
      clearFilters,
      search
    } = bindActionCreators(memberListActions, dispatch);
    return {
      onClearFilters: clearFilters,
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
