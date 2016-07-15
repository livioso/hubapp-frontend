import {
  RECEIVE_MEMBERLIST,
} from '../Actions/memberListActions';

import {
  ADD_TAG,
  REMOVE_TAG,
  TOGGLE_DISTURB,
} from '../Actions/profileActions';

const initialState = {
  firstname: '',
  lastname: '',
  skills: [],
  position: '',
  shortDescription: '',
  disturbEnabled: false,
  completionPercentage: 90,
};

export const profile = (state = initialState, action) => { // eslint-disable-line complexity
  switch (action.type) {
    case RECEIVE_MEMBERLIST: {
      const me = action.members.filter(member => member.id === 12)[0];
      return { ...me };
    }

    case ADD_TAG:
      return {
        ...state,
        skills: state.skills.concat({
          name: action.tag,
          id: action.tag
        })
      };

    case REMOVE_TAG:
      return {
        ...state,
        skills: state.skills.filter(skill => skill !== action.tag)
      };

    case TOGGLE_DISTURB:
      return {
        ...state,
        disturbEnabled: !state.disturbEnabled
      };

    default:
      return state;
  }
};
