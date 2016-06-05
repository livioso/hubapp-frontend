import {
  RECEIVE_MEMBERLIST,
} from '../Actions/memberListActions';

import {
  ADD_TAG,
  REMOVE_TAG
} from '../Actions/profileActions';

const initialState = {
  firstname: '',
  lastname: '',
  skills: [],
  position: '',
  shortDescription: '',
};

export const profile = (state = initialState, action) => { // eslint-disable-line complexity
  switch (action.type) {
    case RECEIVE_MEMBERLIST: {
      const {
        firstname,
        lastname,
        skills,
        picture,
        position,
        shortDescription,
      } = action.members[167];

      return {
        ...state,
        firstname,
        lastname,
        skills,
        picture,
        position,
        shortDescription
      };
    }

    case ADD_TAG:
      return {
        ...state
      };

    case REMOVE_TAG:
      return {
        ...state
      };

    default:
      return state;
  }
};
