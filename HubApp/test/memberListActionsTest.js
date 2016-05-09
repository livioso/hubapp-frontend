import expect from 'expect';
import {
  requestMemberList,
  receiveMemberList,
  REQUEST_MEMBERLIST,
  RECEIVE_MEMBERLIST
} from '../App/Actions/memberListActions';

describe('Memberlist Actions', () => {

  it('should create an action to request the memberlist', () => {
    expect(
      requestMemberList()
    ).toEqual({
      type: REQUEST_MEMBERLIST
    });
  });

  const expectedMemberList = [
    { lastName: 'Brunner', firstName: 'Raphi' },
    { lastName: 'Blatter', firstName: 'Sepp' },
    { lastName: 'Bieri', firstName: 'Livio' }
  ];

  it('should create an action to receive the memberlist', () => {
    expect(
      receiveMemberList(expectedMemberList)
    ).toEqual({
      type: RECEIVE_MEMBERLIST,
      memberList: expectedMemberList
    });
  });
});
