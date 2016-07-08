import expect from 'expect';

import {
  members,
  filterMembers,
  filterMembersByJaccard
} from '../App/Reducers/memberListReducer';

import {
  requestMemberList,
  receiveMemberList,
  toggleFilter,
  clearFilters
} from '../App/Actions/memberListActions';

describe('Memberlist Reducer', () => {
  it('should return the initial state', () => {
    expect(
      members(undefined, {})
    ).toEqual({
      data: {
        list: [],
        loading: true
      },
      search: {
        text: '',
        suggestions: []
      },
      filter: {
        active: []
      }
    });
  });

  it('should handle requestMemberList', () => {
    expect(
      members({
        data: {
          list: [],
          loading: true
        },
      }, requestMemberList())
    ).toEqual({
      data: {
        list: [],
        loading: true
      },
      search: {
        text: '',
        suggestions: []
      },
      filter: {
        active: []
      }
    });
  });

  const expectedMemberList = [
    { lastName: 'Brunner', firstName: 'Raphi', skills: [] },
    { lastName: 'Blatter', firstName: 'Sepp', skills: [] },
    { lastName: 'Bieri', firstName: 'Livio', skills: [] }
  ];

  it('should handle receiveMemberList', () => {
    expect(
      members({
        data: {
          list: [],
          loading: true
        }
      }, receiveMemberList(expectedMemberList))
    ).toEqual({
      data: {
        list: expectedMemberList.map(member => {
          return {
            ...member,
            similar: []
          };
        }),
        loading: true
      }
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

  it('should handle filter function on members', () => {
    const filters = ['Java'];
    const members = [
      { lastName: 'Brunner', firstName: 'Raphi', skills: [{ name: 'Java' }] },
      { lastName: 'Blatter', firstName: 'Sepp', skills: [{ name: 'C' }, { name: 'C++' }] },
      { lastName: 'Bieri', firstName: 'Livio', skills: [{ name: 'C' }, { name: 'C++' }] }
    ];
    expect(
      filterMembers(members, filters)
    ).toEqual(
      [{ lastName: 'Brunner', firstName: 'Raphi', skills: [{ name: 'Java' }] }]
    );
  });

  it('should handle empty filter (Jaccard) => no changes', () => {
    expect(
      filterMembersByJaccard([{
        lastName: 'Blatter',
        skills: [
          { name: 'Java' }
        ]
      }], [])
    ).toEqual(
      [{
        lastName: 'Blatter',
        skills: [
          { name: 'Java' }
        ]
      }]
    );
  });

  it('should handle filtering (Jaccard)', () => {
    const filters = ['Java', 'C', 'C++'];
    const members = [
      {
        lastName: 'Brunner',
        skills: [
          { name: 'Java' }
        ]
      },
      {
        lastName: 'Bieri',
        skills: [
          { name: 'C' }
        ]
      },
      {
        lastName: 'Blatter',
        skills: [
          { name: 'C++' },
          { name: 'Java' },
          { name: 'Haskell' }
        ]
      },
    ];
    expect(
      filterMembersByJaccard(members, filters, 2 / 3)
    ).toEqual(
      [{
        similarity: 0.6666666666666666,
        lastName: 'Blatter',
        skills: [
          { name: 'C++' },
          { name: 'Java' },
          { name: 'Haskell' }]
      }]
    );
  });
});
