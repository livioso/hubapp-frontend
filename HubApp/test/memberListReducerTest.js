import expect from 'expect';
import { memberList } from '../App/Reducers/memberListReducer';
import {
  requestMemberList,
  receiveMemberList,
  toggleFilter,
  clearFilters
} from '../App/Actions/memberListActions';

describe('Memberlist Reducer', () => {
  it('should return the initial state', () => {
    expect(
      memberList(undefined, {})
    ).toEqual({
      members: [],
      loading: true,
      filters: []
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

  it('should handle toggle when item needs to be removed', () => {
    expect(
      memberList({
        filters: ['JavaScript', 'Java']
      }, toggleFilter('JavaScript'))
    ).toEqual({
      filters: ['Java']
    });
  });

  it('should handle toggle when item needs to be added', () => {
    expect(
      memberList({
        filters: ['JavaScript']
      }, toggleFilter('Java'))
    ).toEqual({
      filters: ['JavaScript', 'Java']
    });
  });

  it('should handle clearFilters', () => {
    expect(
      memberList({
        filters: ['SomeFilter']
      }, clearFilters())
    ).toEqual({
      filters: []
    });
  });
});
