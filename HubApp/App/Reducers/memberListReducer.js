import {
  REQUEST_MEMBERLIST,
  RECEIVE_MEMBERLIST,
  TOGGLE_FILTER,
  APPLY_FILTERS
} from '../Actions/memberListActions';

const initialState = {
  members: [],
  loading: true,
  filters: [],
};

export const memberList = (state = initialState, action) => { // eslint-disable-line complexity
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
    case TOGGLE_FILTER: {
      const { filters } = state;
      const { filter } = action;
      return {
        ...state,
        filters: filters.includes(filter) ?
          filters.filter(each => each !== filter) :
          filters.concat([filter])
      };
    }
    case APPLY_FILTERS:
      return {
        ...state,
        filters: action.filters
      };
    default:
      return state;
  }
};

export const viewMembersByFilter = (members, filters) => {
  return members
    .filter((member) => {
      const { skills } = member;
      const memberSkills = skills.map(skill => skill.name);
      return filters.every(skill => memberSkills.includes(skill));
    });
};

// given members it should only return the ones which have >= thresholds
// amount of filters / skills.
export const viewMembersByJaccard = (members, filters, threshold = 2/3) => {
  return members
    .filter((member) => {
      const { skills } = member;
      const memberSkills = skills.map(skill => skill.name);
      return filters.reduce(skill => memberSkills.includes(skill));
    });
};
