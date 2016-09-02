import expect from 'expect';
import {
  requestMemberList,
  receiveMemberList,
  toggleFilter,
  clearFilters,
  REQUEST_MEMBERLIST,
  RECEIVE_MEMBERLIST,
  APPLY_FILTERS,
  TOGGLE_FILTER
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
      members: expectedMemberList
    });
  });

  const expectedToggleFilter = 'ReactNative';
  it('should create an action to toggle a filter to the memberlist', () => {
    expect(
      toggleFilter(expectedToggleFilter)
    ).toEqual({
      type: TOGGLE_FILTER,
      filter: expectedToggleFilter
    });
  });

  it('should create an action to clear the filter for the memberlist', () => {
    expect(
      clearFilters()
    ).toEqual({
      type: APPLY_FILTERS,
      filters: []
    });
  });
});
