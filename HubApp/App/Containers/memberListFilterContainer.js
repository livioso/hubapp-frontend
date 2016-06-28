import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MemberListFilter } from '../Components/memberListFilter';
import * as memberListActions from '../Actions/memberListActions';

export default connect(
  // which part of the Redux global state does
  // our component want to receive as props?
  (state) => {
    return {
      activeFilters: state.members.filter.active,
      allFilters: state.tagList.tags
    };
  },

  // which action creators does
  // it want to receive by props?
  (dispatch) => {
    const { toggleFilter } = bindActionCreators(memberListActions, dispatch);
    return {
      onToggleFilter: toggleFilter
    };
  }
)(MemberListFilter);
