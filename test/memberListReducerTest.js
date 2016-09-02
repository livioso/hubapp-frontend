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
    ).toInclude({
      data: {
        list: [],
        loading: true
      },
      search: {
        text: '',
        suggestions: []
      },
      filter: {
        active: [],
        memberCount: {
          all: 0,
          colab: 0,
          collaboration: 0,
          garage: 0,
          newest: 0,
          viadukt: 0
        }
      }
    });
  });

  it('should handle requestMemberList', () => {
    expect(
      members({
        data: {
          list: [],
          loading: false
        },
      }, requestMemberList())
    ).toInclude({
      data: {
        list: [],
        loading: true
      },
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
          loading: false
        }
      }, receiveMemberList(expectedMemberList))
    ).toInclude({
      data: {
        list: expectedMemberList.map(member => {
          return {
            ...member,
            similar: []
          };
        }),
        loading: false
      }
    });
  });

  it('should handle toggle when item needs to be removed', () => {
    expect(
      members({
        filter: { active: ['JavaScript', 'Java'] }
      }, toggleFilter('JavaScript'))
    ).toInclude({
      filter: { active: ['Java'] }
    });
  });

  it('should handle toggle when item needs to be added', () => {
    expect(
      members({
        filter: { active: ['JavaScript'] }
      }, toggleFilter('Java'))
    ).toInclude({
      filter: { active: ['JavaScript', 'Java']
      }
    });
  });

  it('should handle clearFilters', () => {
    expect(
      members({
        filter: {
          active: ['SomeFilter']
        }
      }, clearFilters())
    ).toInclude({
      filter: { active: [] }
    });
  });

  it.skip('should handle skill filter function on members (deprecated)', () => {
    const filters = ['Java'];
    const testmembers = [
      { lastName: 'Brunner', firstName: 'Raphi', skills: [{ name: 'Java' }] },
      { lastName: 'Blatter', firstName: 'Sepp', skills: [{ name: 'C' }, { name: 'C++' }] },
      { lastName: 'Bieri', firstName: 'Livio', skills: [{ name: 'C' }, { name: 'C++' }] }
    ];
    expect(
      filterMembers(testmembers, filters)
    ).toEqual(
      [{ lastName: 'Brunner', firstName: 'Raphi', skills: [{ name: 'Java' }] }]
    );
  });

  it.skip('should handle empty filter (Jaccard) => no changes (deprecated)', () => {
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

  it.skip('should handle skill filtering (Jaccard) (deprecated)', () => {
    const filters = ['Java', 'C', 'C++'];
    const testmembers = [
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
      filterMembersByJaccard(testmembers, filters, 2 / 3)
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
