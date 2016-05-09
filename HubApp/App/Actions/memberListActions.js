export const REQUEST_MEMBERLIST = 'REQUEST_MEMBERLIST';
export const RECEIVE_MEMBERLIST = 'RECEIVE_MEMBERLIST';

export const requestMemberList = () => {
  return {
    type: REQUEST_MEMBERLIST
  };
};

export const receiveMemberList = (memberList) => {
  return {
    type: RECEIVE_MEMBERLIST,
    memberList
  };
};
