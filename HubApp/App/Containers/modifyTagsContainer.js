import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ModifyTags } from '../Components/modifyTags';
import * as profileActions from '../Actions/profileActions';

export default connect(
  // which part of the Redux global state does
  // our component want to receive as props?
  (state) => {
    const { profile, tagList } = state;
    const { suggestions, tagInputText } = tagList;
    return {
      tags: profile.skills,
      suggestions,
      tagInputText
    };
  },

  // which action creators does
  // it want to receive by props?
  (dispatch) => {
    const {
      changeInputText,
      removeTag,
      addTag,
    } = bindActionCreators(profileActions, dispatch);
    return {
      changeInputText,
      removeTag,
      addTag,
    };
  }
)(ModifyTags);
