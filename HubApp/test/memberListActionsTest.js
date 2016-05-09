import expect from 'expect';
import { memberList } from '../App/Reducers/memberListReducer';
import { requestMemberList, receiveMemberList } from '../App/Actions/memberListActions';

describe('Memberlist Actions', () => {

  it('should create an action to request the memberlist', () => {
    expect(
      requestMemberList()
    ).toEqual({
      type: 'REQUEST'
    });
  });

});
