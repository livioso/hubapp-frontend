import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { SEARCH, receiveSmartSearch } from '../Actions/memberListActions';
import { request, similarURL } from '../Services/api';

export function* fetchSmartSearch({ searchText }) {
  const searchquery = searchText.join(',');
  const requestURL = `${similarURL}/q=${searchquery}`;
  const response = yield call(request, requestURL);
  const isResponseOK = response.error === undefined || response.error === null;

  if (isResponseOK) {
    const suggestions = response;
    yield put(receiveSmartSearch(suggestions));
  } else {
    console.log(response.error); // eslint-disable-line no-console
  }
}

export function* watchRequestMemberList() {
  yield* takeLatest(SEARCH, fetchSmartSearch);
}
