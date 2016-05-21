import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { receiveTagList } from '../Actions/tagListActions';
import { apiFetchTagList } from '../Services/api';

export function* fetchTagList() {
  try {
    const tagList = yield call(apiFetchTagList);
    yield put(receiveTagList(tagList));
  } catch (error) {
    alert(error); // eslint-disable-line
  }
}

export function* watchRequestTagList() {
  yield* takeLatest('REQUEST_TAGLIST', fetchTagList);
}
