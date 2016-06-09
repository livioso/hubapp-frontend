import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MemberList } from '../Components/memberList';
import { viewMembersByFilter } from '../Reducers/memberListReducer';
import * as memberListActions from '../Actions/memberListActions';

export default connect(
  // which part of the Redux global state does
  // our component want to receive as props?
  (state) => {
    const { globalNav: navigation, memberList } = state;
    const { members, filters } = memberList;
    return {
      members: viewMembersByFilter(members, filters),
      navigation,
      filters
    };
  },

  // which action creators does
  // it want to receive by props?
  (dispatch) => {
    const { clearFilters } = bindActionCreators(memberListActions, dispatch);
    return {
      onClearFilters: clearFilters,
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

