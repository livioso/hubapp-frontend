export const requestMemberList = () => {
  return {
    type: 'REQUEST_MEMBERLIST'
  };
};

export const receiveMemberList = (memberList) => {
  return {
    type: 'RECEIVE_MEMBERLIST',
    memberList
  };
};
