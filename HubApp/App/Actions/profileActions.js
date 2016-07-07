export const ADD_TAG = 'ADD_TAG';
export const REMOVE_TAG = 'REMOVE_TAG';
export const TOGGLE_DISTURB = 'TOGGLE_DISTURB';

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

export const toggleDisturb = () => {
  return {
    type: TOGGLE_DISTURB
  };
};
