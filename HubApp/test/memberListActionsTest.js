import expect from 'expect';
import {
  requestMemberList,
  receiveMemberList,
  applyFilter,
  clearFilter,
  REQUEST_MEMBERLIST,
  RECEIVE_MEMBERLIST,
  APPLY_FILTER
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

  const expectedFilter =['ReactNative, React'];
  it('should create an action to apply a filter to the memberlist', () => {
    expect(
      applyFilter(expectedFilter)
    ).toEqual({
      type: APPLY_FILTER,
      filter: expectedFilter
    });
  });

  it('should create an action to clear the filter for the memberlist', () => {
    expect(
      clearFilter()
    ).toEqual({
      type: APPLY_FILTER,
      filter: []
    });
  });
});
