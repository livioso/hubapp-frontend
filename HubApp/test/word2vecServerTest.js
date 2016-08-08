import 'babel-polyfill';

import expect from 'expect';
import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { fetchSmartSearch } from '../App/Sagas/fetchSearch';
import { receiveSmartSearch } from '../App/Actions/memberListActions';
import { request, similarURL } from '../App/Services/api';

describe('Similarity Search Saga', () => {
  const searchText = 'java';
  const generator = fetchSmartSearch({ searchText });
  const response = { error: null, data: ['c++', 'c'] };

  it('should wait for some time', () => {
    const expected = call(delay, 200);
    const result = generator.next().value;
    expect(result).toEqual(expected);
  });

  it('should request to fetch similar skills to java', () => {
    const requestURL = `${similarURL}?q=${searchText}`;
    const expected = call(request, requestURL);
    const result = generator.next(response).value;
    expect(result).toEqual(expected);
  });

  it('should receive similar skills to java', () => {
    const expected = put(receiveSmartSearch(response.data));
    const result = generator.next(response).value;
    expect(result).toEqual(expected);
  });
});

describe('Similarity Search Saga when failed', () => {
  const searchText = 'java';
  const generator = fetchSmartSearch({ searchText });
  const response = { error: 'Hello' };

  it('should wait for some time', () => {
    const expected = call(delay, 200);
    const result = generator.next().value;
    expect(result).toEqual(expected);
  });

  it('should request to fetch similar skills to java', () => {
    const requestURL = `${similarURL}?q=${searchText}`;
    const expected = call(request, requestURL);
    const result = generator.next(response).value;
    expect(result).toEqual(expected);
  });

  it('should log an error', () => {
    const expected = call(console.log, response.error); // eslint-disable-line
    const result = generator.next(response).value;
    expect(result).toEqual(expected);
  });
});
