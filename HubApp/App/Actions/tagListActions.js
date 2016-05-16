export const REQUEST_TAGLIST = 'REQUEST_TAGLIST';
export const RECEIVE_TAGLIST = 'RECEIVE_TAGLIST';

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
