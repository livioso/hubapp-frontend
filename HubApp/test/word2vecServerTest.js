import 'babel-polyfill';

import expect from 'expect';
import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { fetchSmartSearch } from '../App/Sagas/fetchSearch';
import { receiveSmartSearch } from '../App/Actions/memberListActions';
import { request, similarURL } from '../App/Services/api';
import fetch from 'isomorphic-fetch';

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

describe('Similarity Search Integrationstest 🙋', () => {
  const fetchSimilar = (toWhat) => fetch(`${similarURL}?q=${toWhat}&debug=true`);

  it('server should return http status 200 on /similar', (done) => {
    return fetchSimilar('java')
      .then(response => {
        expect(response.status).toBe(200);
        done();
      });
  });

  it('server should fetch similar skills to java', (done) => {
    return fetchSimilar('java')
      .then(response => response.json())
      .then(similar => {
        expect(similar).toInclude('c++');
        expect(similar).toInclude('c#');
        expect(similar).toInclude('c');
        expect(similar).toInclude('swift');
        expect(similar).toInclude('python');
        expect(similar).toInclude('php');
        expect(similar).toInclude('javascript');
        done();
      });
  });

  it('server should fetch similar skills to web,developer', (done) => {
    return fetchSimilar('web,developer')
      .then(response => response.json())
      .then(similar => {
        expect(similar).toInclude('webdesigner');
        expect(similar).toInclude('webdeveloper');
        expect(similar).toInclude('frontend');
        expect(similar).toInclude('backend');
        done();
      });
  });

  it('server should similar skill javascript to html,css', (done) => {
    return fetchSimilar('html, css')
      .then(response => response.json())
      .then(similar => {
        expect(similar).toInclude('javascript');
        done();
      });
  });

  it('server should find synonys javascript for js', (done) => {
    return fetchSimilar('js')
      .then(response => response.json())
      .then(similar => {
        expect(similar).toInclude('javascript');
        done();
      });
  });

  it('server should find synonys javascript for javascipt', (done) => {
    return fetchSimilar('javascipt')
      .then(response => response.json())
      .then(similar => {
        expect(similar).toInclude('javascript');
        done();
      });
  });
});
