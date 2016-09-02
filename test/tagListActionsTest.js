import expect from 'expect';
import {
  requestTagList,
  receiveTagList,
  REQUEST_TAGLIST,
  RECEIVE_TAGLIST,
} from '../App/Actions/tagListActions';

describe('Tag list Actions', () => {
  it('should create an action to request the tags', () => {
    expect(
      requestTagList()
    ).toEqual({
      type: REQUEST_TAGLIST
    });
  });

  const expectedTagList = [
    { tag: 'Consulting' },
    { tag: 'Entrepreneurship' }
  ];

  it('should create an action to receive the tags', () => {
    expect(
      receiveTagList(expectedTagList)
    ).toEqual({
      type: RECEIVE_TAGLIST,
      tags: expectedTagList
    });
  });
});
