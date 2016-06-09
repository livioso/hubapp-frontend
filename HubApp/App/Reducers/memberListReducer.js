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

export const filterMembers = (members, filters) => {
  return members
    .filter((member) => {
      const { skills } = member;
      const memberSkills = skills.map(skill => skill.name);
      return filters.every(skill => memberSkills.includes(skill));
    });
};

export const filterMembersByJaccard = (members, filters, threshold = 2 / 3) => {
  // map the users to their similarity for the specified filters
  const membersWithJaccardSimilarity = members.map(member => {
    const { skills } = member;
    const memberSkills = skills.map(skill => skill.name);
    const similarity = calculateJaccardSimilarity(memberSkills, filters);
    return { ...member, similarity };
  });

  return membersWithJaccardSimilarity
    .filter(member => member.similarity >= threshold)
    .sort((lhs, rhs) => lhs.similarity >= rhs.similarity);
};

export const calculateJaccardSimilarity = (skills, filters) => {
  // nothing to do 😀
  if (filters.length === 0) {
    return 1;
  }

  // reduce the skills into a single number that tells us
  // how many matching skills the user has with filters
  const initialScore = 0;
  const score = filters.reduce((previous, current) => {
    return skills.includes(current)
      ? previous + 1
      : previous;
  }, initialScore);

  // calculate the Jaccard similarity
  return score / filters.length;
};
