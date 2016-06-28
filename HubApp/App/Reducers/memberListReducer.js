import { combineReducers } from 'redux';

import {
  REQUEST_MEMBERLIST,
  RECEIVE_MEMBERLIST,
  TOGGLE_FILTER,
  APPLY_FILTERS,
  SEARCH
} from '../Actions/memberListActions';

const initialStateList = {
  list: [],
  loading: true,
};

const data = (state = initialStateList, action) => { // eslint-disable-line complexity
  switch (action.type) {
    case REQUEST_MEMBERLIST:
      return {
        ...state,
        loading: true
      };
    case RECEIVE_MEMBERLIST:
      return {
        ...state,
        list: calculateSimilarMembers(action.members),
        loading: false
      };
    default:
      return state;
  }
};

const initialStateFilter = {
  active: []
};

const filter = (state = initialStateFilter, action) => {
  switch (action.type) {
    case TOGGLE_FILTER: {
      const { active } = state;
      const { filter: toggleFilter } = action;
      return {
        ...state,
        active: active.includes(toggleFilter) ?
          active.filter(each => each !== toggleFilter) :
          active.concat([toggleFilter])
      };
    }
    case APPLY_FILTERS:
      return {
        ...state,
        active: action.filters
      };
    default:
      return state;
  }
};

const initialStateSearch = {
  text: '',
  suggestions: []
};

const search = (state = initialStateSearch, action) => {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        text: action.searchText
      };
    default:
      return state;
  }
};

// combine the separate parts
// into one members reducer
export const members = combineReducers({
  data,
  filter,
  search
});


// ******************************************************************
// Filters for Members
// ******************************************************************
export const filterMembersByLiveSearch = (memberlist, searchtext) => {
  if (search === '') {
    return memberlist; // nothing to search
  }

  return memberlist
    .filter((member) => {
      const {
        shortDescription: description,
        firstname, lastname, skills
      } = member;
      // merge all the fields into one big string for searching
      const memberSkills = skills.map(skill => skill.name).join(' ');
      const memberAsText = `${firstname} ${lastname} ${memberSkills} ${description}`;
      // search for each word in search text
      // example: "Raphael Swift" => Raphael and Swift
      const searchWords = searchtext.split(' ');
      // every word must be mentioned in the member text
      return searchWords.every(word => memberAsText.includes(word));
    });
};

export const filterMembers = (memberlist, filters) => {
  return memberlist
    .filter((member) => {
      const { skills } = member;
      const memberSkills = skills.map(skill => skill.name);
      return filters.every(skill => memberSkills.includes(skill));
    });
};

export const filterMembersByJaccard = (memberlist, filters, threshold = 1 / 3) => {
  if (filters.length === 0) {
    return memberlist
      .sort((lhs, rhs) => lhs.lastname.localeCompare(rhs.lastname));
  }

  // map the users to their similarity for the specified filters
  const membersWithJaccardSimilarity = memberlist.map(member => {
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
