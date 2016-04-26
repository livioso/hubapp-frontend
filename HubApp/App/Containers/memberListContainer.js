import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MemberList } from '../Components/memberList';
import * as memberListActions from '../Actions/memberListActions';

const MemberListContainer = ({ state, onPressDetail }) => {
  return (
    <MemberList members={state.memberList} onPressDetail={onPressDetail} />
  );
};

MemberListContainer.propTypes = { // eslint-disable-line immutable/no-mutation
  state: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired,
  onPressDetail: React.PropTypes.func.isRequired
};

export default connect(
  // which part of the Redux global state does
  // our component want to receive as props?
  (state) => {
    return {
      state: state.memberList
    };
  },

  // which action creators does
  // it want to receive by props?
  (dispatch) => {
    return {
      actions: bindActionCreators(memberListActions, dispatch)
    };
  }

)(MemberListContainer);
