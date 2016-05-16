import {
  REQUEST_TAGLIST,
  RECEIVE_TAGLIST
} from '../Actions/tagListActions';

const initialState = {
  tags: [],
  loading: true,
};

export const tagList = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_TAGLIST:
      return {
        ...state,
        loading: true
      };
    case RECEIVE_TAGLIST:
      return {
        ...state,
        tags: action.tags,
        loading: false
      };
    default:
      return state;
  }
};
