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
    const { globalNav: navigation, memberList } = state;
    const { members: allMember, filters, search } = memberList;
    const searchedMembers = filterMembersByLiveSearch(allMember, search);
    const members = filterMembersByJaccard(searchedMembers, filters);
    return {
      members,
      navigation,
      filters
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
