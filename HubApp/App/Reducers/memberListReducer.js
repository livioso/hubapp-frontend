import {
  REQUEST_MEMBERLIST,
  RECEIVE_MEMBERLIST,
  APPLY_FILTER
} from '../Actions/memberListActions';

const initialState = {
  members: [],
  loading: true,
  filter: [],
};

export const memberList = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_MEMBERLIST:
      return {
        ...state,
        loading: true
      };
    case RECEIVE_MEMBERLIST:
      return {
        ...state,
        members: action.members,
        loading: false
      };
    case APPLY_FILTER:
      return {
        ...state,
        filter: action.filter
      };
    default:
      return state;
  }
};
