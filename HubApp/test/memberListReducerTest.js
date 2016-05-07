import expect from 'expect';
import { memberList } from '../App/Reducers/memberListReducer';

describe('Memberlist Reducer', () => {
  it('should return the initial state', () => {
    expect(
      memberList(undefined, {})
    ).toEqual({
      memberList: [],
      loading: true
    });
  });
});
