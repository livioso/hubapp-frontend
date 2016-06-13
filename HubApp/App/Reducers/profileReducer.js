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
      } = action.members.filter(member => member.id === 84)[0];

      return {
        ...state,
        firstname,
        lastname,
        picture,
        position,
        shortDescription,
        skills: skills.map(skill => skill.name),
      };
    }

    case ADD_TAG:
      return {
        ...state,
        skills: state.skills.concat(action.tag)
      };

    case REMOVE_TAG:
      return {
        ...state,
        skills: state.skills.filter(skill => skill !== action.tag)
      };

    default:
      return state;
  }
};
