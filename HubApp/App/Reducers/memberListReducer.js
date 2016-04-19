const initialState = {
  memberList: [],
  loading: true
};

export const memberList = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_MEMBERLIST':
      return {
        ...state,
        loading: true
      };
    case 'RECEIVE_MEMBERLIST':
      return {
        ...state,
        memberList: action.memberList,
        loading: false
      };
    default:
      return state;
  }
};
