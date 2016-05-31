export const REQUEST_MEMBERLIST = 'REQUEST_MEMBERLIST';
export const RECEIVE_MEMBERLIST = 'RECEIVE_MEMBERLIST';
export const APPLY_FILTERS = 'APPLY_FILTERS';
export const TOGGLE_FILTER = 'TOGGLE_FILTER';

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
