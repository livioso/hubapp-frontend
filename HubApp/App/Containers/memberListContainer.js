import React from 'react';
import { Component } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MemberList } from '../Components/memberList';

export default class MemberListContainer extends Component {

  static propTypes = {
    state: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <MemberList members={this.props.state.memberList} />
    );
  }
}

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
      actions: bindActionCreators({}, dispatch)
    };
  }

)(MemberListContainer);

