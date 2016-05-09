import expect from 'expect';
import { memberList } from '../App/Reducers/memberListReducer';
import { requestMemberList, receiveMemberList } from '../App/Actions/memberListActions';

describe('Memberlist Reducer', () => {

  it('should return the initial state', () => {
    expect(
      memberList(undefined, {})
    ).toEqual({
      memberList: [],
      loading: true
    });
  });

  it('should handle requestMemberList', () => {
    expect(
      memberList({
        loading: false,
        memberList: []
      }, requestMemberList())
    ).toEqual({
      memberList: [],
      loading: true
    });
  });

  const expectedMemberList = [
    { lastName: 'Brunner', firstName: 'Raphi' },
    { lastName: 'Blatter', firstName: 'Sepp' },
    { lastName: 'Bieri', firstName: 'Livio' }
  ];

  it('should handle receiveMemberList', () => {
    expect(
      memberList({
        loading: true,
        memberList: []
      }, receiveMemberList(expectedMemberList))
    ).toEqual({
      memberList: expectedMemberList,
      loading: false
    });
  });

});
