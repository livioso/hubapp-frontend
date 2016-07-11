// Members
export const REQUEST_MEMBERLIST = 'REQUEST_MEMBERLIST';
export const RECEIVE_MEMBERLIST = 'RECEIVE_MEMBERLIST';

// Filter
export const APPLY_FILTERS = 'APPLY_FILTERS';
export const TOGGLE_FILTER = 'TOGGLE_FILTER';

// Search
export const RECEIVE_SMART_SEARCH = 'RECEIVE_SMART_SEARCH';
export const SEARCH = 'SEARCH';

export const requestMemberList = () => {
  return {
    type: REQUEST_MEMBERLIST
  };
};

export const receiveMemberList = (members) => {
  return {
    type: RECEIVE_MEMBERLIST,
    members,
  };
};

export const toggleFilter = (filter) => {
  return {
    type: TOGGLE_FILTER,
    filter
  };
};

export const clearFilters = () => {
  return {
    type: APPLY_FILTERS,
    filters: []
  };
};

export const search = (searchText) => {
  return {
    type: SEARCH,
    searchText
  };
};

export const receiveSmartSearch = (suggestions) => {
  return {
    type: RECEIVE_SMART_SEARCH,
    suggestions
  };
};
