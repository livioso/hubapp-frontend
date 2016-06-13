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
        members: calculateSimilarMembers(action.members),
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
  if (filters.length === 0) {
    return members
      .sort((lhs, rhs) => lhs.lastname.localeCompare(rhs.lastname));
  }

  // map the users to their similarity for the specified filters
  const membersWithJaccardSimilarity = members.map(member => {
    const { skills } = member;
    const memberSkills = skills.map(skill => skill.name);
    const similarity = calculateJaccardSimilarity(memberSkills, filters);
    return { ...member, similarity };
  });

  return membersWithJaccardSimilarity
    .filter(member => member.similarity >= threshold)
    .sort((lhs, rhs) => lhs.lastname.localeCompare(rhs.lastname))
    .sort((lhs, rhs) => {
      if (filters.length === 0) return 0;
      if (lhs.similarity < rhs.similarity) return 1;
      if (lhs.similarity > rhs.similarity) return -1;
      return 0;
    });
};

export const calculateSimilarMembers = (members) => {
  return members.map(member => {
    // no skills => no similar members
    if (member.skills.length === 0) {
      return { ...member, similar: [] };
    }

    const skills = member.skills.map(skill => skill.name);
    const similar = filterMembersByJaccard(members, skills)
      .filter(each => each.id !== member.id);

    return { ...member, similar };
  });
};

export const calculateJaccardSimilarity = (lhs, rhs) => {
  // reduce the skills into a single number that tells us
  // how many matching skills the user has with filters
  const initialScore = 0;
  const score = rhs.reduce((previous, current) => {
    return lhs.includes(current)
      ? previous + 1
      : previous;
  }, initialScore);

  // calculate the Jaccard similarity
  return score / rhs.length;
};
