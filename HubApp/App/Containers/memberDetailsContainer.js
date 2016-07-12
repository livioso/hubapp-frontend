import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MemberDetails } from '../Components/memberDetails';
import * as memberListActions from '../Actions/memberListActions';

export default connect(
  // which part of the Redux global state does
  // our component want to receive as props?
  (state) => {
    return {
      state
    };
  },

  // which action creators does
  // it want to receive by props?
  (dispatch) => {
    const {
      search,
    } = bindActionCreators(memberListActions, dispatch);
    return {
      searchForTag: search
    };
  }
)(MemberDetails);
