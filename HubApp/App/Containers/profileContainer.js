import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { Profile } from '../Components/profile';

export default connect(
  // which part of the Redux global state does
  // our component want to receive as props?
  (state) => {
    const { members } = state.memberList;
    return {
      // TBD: Filter out by ID.
      me: members[0]
    };
  },

  // which action creators does
  // it want to receive by props?
  (dispatch) => {
    return { // TBD Add actions.
    };
  }
)(Profile);
