export const ADD_TAG = 'ADD_TAG';
export const REMOVE_TAG = 'REMOVE_TAG';
export const TOGGLE_COLLABORATION = 'TOGGLE_COLLABORATION';
export const CHANGE_TAG_INPUT_TEXT = 'CHANGE_TAG_INPUT_TEXT';
export const TAG_SUGGESTIONS = 'TAG_SUGGESTIONS';

export const removeTag = (tag) => {
  return {
    type: REMOVE_TAG,
    tag
  };
};

export const addTag = (tag) => {
  return {
    type: ADD_TAG,
    tag
  };
};

export const toggleCollaboration = () => {
  return {
    type: TOGGLE_COLLABORATION
  };
};

export const changeTagInputText = (tagInputText) => {
  return {
    type: CHANGE_TAG_INPUT_TEXT,
    tagInputText
  };
};

export const tagSuggestions = (suggestions) => {
  return {
    type: TAG_SUGGESTIONS,
    suggestions
  };
};
