import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ModifyTags } from '../Components/modifyTags';
import * as profileActions from '../Actions/profileActions';

export default connect(
  // which part of the Redux global state does
  // our component want to receive as props?
  (state) => {
    return {
      tags: state.profile.skills
    };
  },

  // which action creators does
  // it want to receive by props?
  (dispatch) => {
    const { addTag, removeTag } = bindActionCreators(profileActions, dispatch);
    return {
      addTag,
      removeTag
    };
  }
)(ModifyTags);
