import { takeLatest } from 'redux-saga';
import { call, select } from 'redux-saga/effects';
import { request, currentMeURL } from '../Services/api';
import { ADD_TAG, REMOVE_TAG } from '../Actions/profileActions';
import { fetchMemberList } from './fetchMemberList';
import { fetchTagList } from './fetchTagList';

function* updateSkills() {
  const state = yield select();
  yield call(request, currentMeURL, {
    method: 'PUT',
    body: JSON.stringify(state.profile.skills.map(tag => tag.name)),
    headers: {
      'Content-Type': 'application/json'
    },
  });

  // re-fetch all the things
  yield call(fetchMemberList);
  yield call(fetchTagList);
}

export function* watchAddTag() {
  yield* takeLatest(ADD_TAG, updateSkills);
}

export function* watchRemoveTag() {
  yield* takeLatest(REMOVE_TAG, updateSkills);
}
