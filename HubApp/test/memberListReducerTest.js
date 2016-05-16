import expect from 'expect';
import { memberList } from '../App/Reducers/memberListReducer';
import {
  requestMemberList,
  receiveMemberList,
  applyFilter,
  clearFilter
} from '../App/Actions/memberListActions';

describe('Memberlist Reducer', () => {
  it('should return the initial state', () => {
    expect(
      memberList(undefined, {})
    ).toEqual({
      members: [],
      loading: true,
      filter: []
    });
  });

  it('should handle requestMemberList', () => {
    expect(
      memberList({
        loading: false,
        members: [],
      }, requestMemberList())
    ).toEqual({
      members: [],
      loading: true,
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
        members: [],
      }, receiveMemberList(expectedMemberList))
    ).toEqual({
      members: expectedMemberList,
      loading: false,
    });
  });

  const expectedFilter = ['ReactNative', 'React'];
  it('should handle applyFilter', () => {
    expect(
      memberList({
        filter: ['SomeFilter']
      }, applyFilter(expectedFilter))
    ).toEqual({
      filter: expectedFilter
    });
  });

  it('should handle clearFilter', () => {
    expect(
      memberList({
        filter: ['SomeFilter']
      }, clearFilter())
    ).toEqual({
      filter: []
    });
  });
});
