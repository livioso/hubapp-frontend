import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Profile } from '../Components/profile';
import * as profileActions from '../Actions/profileActions';

export default connect(
  // which part of the Redux global state does
  // our component want to receive as props?
  (state) => {
    return {
      me: state.profile
    };
  },

  // which action creators does
  // it want to receive by props?
  (dispatch) => {
    const {
      addTag,
      removeTag,
      toggleDisturb
    } = bindActionCreators(profileActions, dispatch);
    return {
      onAddTag: addTag,
      onRemoveTag: removeTag,
      toggleDisturb
    };
  }
)(Profile);
