import { combineReducers } from 'redux';

import {
  REQUEST_MEMBERLIST,
  RECEIVE_MEMBERLIST,
  TOGGLE_FILTER,
  APPLY_FILTERS,
  SEARCH,
  RECEIVE_SMART_SEARCH
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
    case RECEIVE_SMART_SEARCH:
      return {
        ...state,
        suggestions: action.suggestions
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

// Returns all members in member list when a search word matches fully.
// This means: partial matches will not be returned. For example if we
// search Java this function is expected to return all members matching
// Java but not JavaScript
export const filterMembersByLiveSearch = (memberlist, searchtext) => {
  const wordIsFullMatch = (word, memberAsText) => {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    return regex.test(memberAsText);
  };

  return filterMemberlistBySearchWordMatch(
    memberlist, searchtext, wordIsFullMatch
  );
};

// Returns all members in member list when a search word matches partially.
// This means: partial matches will be returned. For example if we
// search Java this function is expected to return all members matching
// Java and JavaScript.
export const filterMembersByLiveSearchSoft = (memberlist, searchtext) => {
  const wordIsPartialMatch = (word, memberAsText) => memberAsText.includes(word);
  return filterMemberlistBySearchWordMatch(
    memberlist, searchtext, wordIsPartialMatch
  );
};

export const filterMembersBySmartSearch = (memberlist, searchtext, suggestions) => {
  if (searchtext === '') {
    return memberlist; // nothing to search
  }

  if (searchtext !== '' && suggestions.length === 0) {
    return []; // either no suggestions or not YET
  }

  return memberlist
    .filter((member) => {
      const { skills } = member;
      const memberSkills = skills.map(skill => skill.name.toLowerCase());
      return suggestions
        .map(suggestion => suggestion.toLowerCase())
        .some(suggestion => memberSkills.includes(suggestion));
    });
};

const filterMembersByJaccard = (memberlist, filters, threshold = 1 / 3) => {
  if (filters.length === 0) {
    return memberlist;
  }

  // map the users to their similarity for the specified filters
  const membersWithJaccardSimilarity = memberlist.map(member => {
    const { skills } = member;
    const memberSkills = skills.map(skill => skill.name);

    // TODO (livioso 07.06.2016) This is misleading! Why are we
    // calculating the similarity here and append it here? We should
    // really just filter here as the name of the function suggests.
    // And not return an enhanced collection with similarity data.
    const similarity = calculateJaccardSimilarity(memberSkills, filters);
    return { ...member, similarity };
  });

  return membersWithJaccardSimilarity
    .filter(member => member.similarity >= threshold);
};

const calculateSimilarMembers = (memberlist) => {
  return memberlist.map(member => {
    // no skills => no similar members
    if (member.skills.length === 0) {
      return { ...member, similar: [] };
    }

    const skills = member.skills.map(skill => skill.name);
    const similar = filterMembersByJaccard(memberlist, skills)
      .filter(each => each.id !== member.id);

    return { ...member, similar };
  });
};

const calculateJaccardSimilarity = (lhs, rhs) => {
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

const filterMemberlistBySearchWordMatch = (memberlist, searchtext, wordIsMatch) => {
  if (search === '') {
    return memberlist; // nothing to search
  }

  return memberlist
    .filter((member) => {
      const {
        shortDescription: description,
        firstname, lastname, skills, firm
      } = member;

      // merge all the fields into one big string for searching
      const memberSkills = skills.map(skill => skill.name).join(' ');
      const memberAsText = `
        ${firstname} ${lastname} ${memberSkills}
        ${description} ${firm}
      `.toLowerCase();

      // search for each word in search text
      // example: "Raphael Swift" => Raphael and Swift
      const searchWords = searchtext
        .toLowerCase()
        .split(' ');

      // apply check function on every word in the search words
      return searchWords.every(word => wordIsMatch(word, memberAsText));
    });
};
