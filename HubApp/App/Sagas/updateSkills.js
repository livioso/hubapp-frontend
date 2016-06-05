import { takeLatest } from 'redux-saga';
import { call, select } from 'redux-saga/effects';
import { request, currentMeURL } from '../Services/api';
import { ADD_TAG, REMOVE_TAG } from '../Actions/profileActions';

function* updateSkills() {
  const state = yield select();
  yield call(request, currentMeURL, {
    method: 'PUT',
    body: JSON.stringify(state.profile.skills),
    headers: {
      'Content-Type': 'application/json'
    },
  });
}

export function* watchAddTag() {
  yield* takeLatest(ADD_TAG, updateSkills);
}

export function* watchRemoveTag() {
  yield* takeLatest(REMOVE_TAG, updateSkills);
}
