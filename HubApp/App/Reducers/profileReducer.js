import {
  RECEIVE_MEMBERLIST,
} from '../Actions/memberListActions';

import {
  ADD_TAG,
  REMOVE_TAG,
  TOGGLE_COLLABORATION,
} from '../Actions/profileActions';

const changeMeInProduction = 12;

const initialState = {
  firstname: '',
  lastname: '',
  skills: [],
  position: '',
  shortDescription: '',
  disturbEnabled: false,
  percentage: 0,
};

export const profile = (state = initialState, action) => { // eslint-disable-line complexity
  switch (action.type) {
    case RECEIVE_MEMBERLIST: {
      const me = action.members.filter(member => member.id === changeMeInProduction)[0];
      return {
        ...state,
        ...me,
        percentage: calculateProfileCompletionPercentage(me)
      };
    }

    case ADD_TAG: {
      const newState = {
        ...state,
        skills: state.skills.concat({
          name: action.tag,
          id: action.tag,
        }),
      };
      return {
        ...newState,
        percentage: calculateProfileCompletionPercentage(state)
      };
    }

    case REMOVE_TAG: {
      const newState = {
        ...state,
        skills: state.skills.filter(skill => skill.name !== action.tag),
      };
      return {
        ...newState,
        percentage: calculateProfileCompletionPercentage(state)
      };
    }

    case TOGGLE_COLLABORATION :
      return {
        ...state,
        collaboration: !state.collaboration
      };

    default:
      return state;
  }
};

const calculateProfileCompletionPercentage = (me) => { // eslint-disable-line complexity
  const isNotEmptyString = field => field !== undefined && field !== '';

  const fields = [];
  fields.push(isNotEmptyString(me.firstname) ? 1 : 0);
  fields.push(isNotEmptyString(me.lastname) ? 1 : 0);
  fields.push(isNotEmptyString(me.position) ? 1 : 0);
  fields.push(isNotEmptyString(me.shortDescription) ? 1 : 0);
  fields.push(isNotEmptyString(me.email) ? 1 : 0);
  fields.push(isNotEmptyString(me.phone) ? 1 : 0);
  fields.push(isNotEmptyString(me.picture) ? 1 : 0);
  fields.push(me.skills.length > 0 ? 1 : 0);

  const totalFields = fields.length;
  const usedFields = fields.reduce((lhs, rhs) => lhs + rhs);
  return 100 / totalFields * usedFields;
};
