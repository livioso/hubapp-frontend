export const REQUEST_TAGLIST = 'REQUEST_TAGLIST';
export const RECEIVE_TAGLIST = 'RECEIVE_TAGLIST';
export const CHANGE_INPUT_TEXT = 'CHANGE_INPUT_TEXT';

export const requestTagList = () => {
  return {
    type: REQUEST_TAGLIST
  };
};

export const receiveTagList = (tags) => {
  return {
    type: RECEIVE_TAGLIST,
    tags
  };
};

export const changeInputText = (inputText) => {
  return {
    type: CHANGE_INPUT_TEXT,
    inputText
  };
};
