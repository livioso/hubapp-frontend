export const REQUEST_MEMBERLIST = 'REQUEST_MEMBERLIST';
export const RECEIVE_MEMBERLIST = 'RECEIVE_MEMBERLIST';
export const APPLY_FILTER = 'APPLY_FILTER';

export const requestMemberList = () => {
  return {
    type: REQUEST_MEMBERLIST
  };
};

export const receiveMemberList = (members) => {
  return {
    type: RECEIVE_MEMBERLIST,
    members
  };
};

export const applyFilter = (filter) => {
  return {
    type: APPLY_FILTER,
    filter
  };
};

export const clearFilter = () => {
  return {
    type: APPLY_FILTER,
    filter: []
  };
};
