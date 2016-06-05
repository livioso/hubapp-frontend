export const ADD_TAG = 'ADD_TAG';
export const REMOVE_TAG = 'REMOVE_TAG';

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
