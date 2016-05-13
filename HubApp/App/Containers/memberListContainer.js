import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MemberList } from '../Components/memberList';
import * as memberListActions from '../Actions/memberListActions';

export default connect(
  // which part of the Redux global state does
  // our component want to receive as props?
  (state) => {
    const { members, filter } = state.memberList;
    return {
      members: getMembersFiltered(members, filter),
      filter
    }
  },

  // which action creators does
  // it want to receive by props?
  (dispatch) => {
    const { clearFilter } = bindActionCreators(memberListActions, dispatch);
    return {
      onClearFilter: clearFilter
    };
  }

)(MemberList);

const getMembersFiltered = (members, filter) => {
  if (filter.length === 0) {
    return members;
  }

  // we need to filter 😑
  return members.filter((member) => {
    const { skills } = member;
    return filter.every(skill => skills.includes(skill));
  });
}
