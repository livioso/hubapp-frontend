import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ModifyTags } from '../Components/modifyTags';
import * as profileActions from '../Actions/profileActions';

export default connect(
  // which part of the Redux global state does
  // our component want to receive as props?
  (state) => {
    const { skills, suggestions, tagInputText } = state.profile;
    return {
      tags: skills,
      tagInputText,
      suggestions,
    };
  },

  // which action creators does
  // it want to receive by props?
  (dispatch) => {
    const {
      changeTagInputText,
      removeTag,
      addTag,
    } = bindActionCreators(profileActions, dispatch);
    return {
      changeTagInputText,
      removeTag,
      addTag,
    };
  }
)(ModifyTags);
