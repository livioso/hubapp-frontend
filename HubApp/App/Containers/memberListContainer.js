import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MemberList } from '../Components/memberList';
import * as memberListActions from '../Actions/memberListActions';

import {
  filterMembersByJaccard,
  filterMembersByLiveSearch
} from '../Reducers/memberListReducer';

export default connect(
  // which part of the Redux global state does
  // our component want to receive as props?
  (state) => {
    const { globalNav: navigation, members } = state;

    // destruct the slightly
    // complicated state
    const {
      data: { list: allMember },
      filter: { active: activeFilter },
      search: { text: searchText }
    } = members;

    // apply filter & search
    const searchedMembers = filterMembersByLiveSearch(allMember, searchText);
    const membersFiltered = filterMembersByJaccard(searchedMembers, activeFilter);

    return {
      members: membersFiltered,
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
