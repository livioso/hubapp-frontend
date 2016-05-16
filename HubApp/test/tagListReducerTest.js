import expect from 'expect';
import { tagList } from '../App/Reducers/tagListReducer';
import {
  requestTagList,
  receiveTagList,
} from '../App/Actions/tagListActions';

describe('Tags Reducer', () => {
  it('should return the initial state', () => {
    expect(
      tagList(undefined, {})
    ).toEqual({
      tags: [],
      loading: true,
    });
  });

  it('should handle requestTagList', () => {
    expect(
      tagList({
        loading: false,
        tags: [],
      }, requestTagList())
    ).toEqual({
      tags: [],
      loading: true,
    });
  });

  const expectedTagList = [
    { tag: 'Consulting' },
    { tag: 'Coaching' }
  ];

  it('should handle receiveTagList', () => {
    expect(
      tagList({
        loading: true,
        tags: [],
      }, receiveTagList(expectedTagList))
    ).toEqual({
      tags: expectedTagList,
      loading: false,
    });
  });
});
