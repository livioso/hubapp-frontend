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
      allFilters: state.tagList.tags,
      membersCount: {
        colab: 699,
        viadukt: 1,
        garage: 0,
        newOnes: 5,
        collaboration: 70,
        all: 700
      }
    };
  },

  // which action creators does
  // it want to receive by props?
  (dispatch) => {
    const { toggleFilter, clearFilters } = bindActionCreators(memberListActions, dispatch);
    return {
      onToggleFilter: toggleFilter,
      resetAll: clearFilters
    };
  }
)(MemberListFilter);
