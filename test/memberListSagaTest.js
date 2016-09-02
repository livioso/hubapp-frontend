// no idea why this does not work with
// just babel-preset-react-native... 😐
import 'babel-polyfill';

import expect from 'expect';
import { call, put } from 'redux-saga/effects';
import { fetchMemberList } from '../App/Sagas/fetchMemberList';
import { receiveMemberList } from '../App/Actions/memberListActions';
import { request, membersURL } from '../App/Services/api';

describe('MemberList Sagas', () => {
  const generator = fetchMemberList();
  const response = { error: null, data: [] };

  it('should fetch the memberlist', () => {
    const expected = call(request, membersURL);
    const result = generator.next().value;
    expect(result).toEqual(expected);
  });

  it('should put the memberlist', () => {
    const expected = put(receiveMemberList(response.data));
    const result = generator.next(response).value;
    expect(result).toEqual(expected);
  });
});
