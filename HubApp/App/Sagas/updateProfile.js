import { takeLatest } from 'redux-saga';
import { call, fork, select } from 'redux-saga/effects';
import { request, currentMeURL } from '../Services/api';
import { ADD_TAG, REMOVE_TAG, TOGGLE_COLLABORATION } from '../Actions/profileActions';

function* updateProfile() {
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

export function* watchRemoveTag() {
  yield* takeLatest(REMOVE_TAG, updateProfile);
}

export function* watchAddTag() {
  yield* takeLatest(ADD_TAG, updateProfile);
}

export function* watchCollaborationFlag() {
  yield* takeLatest(TOGGLE_COLLABORATION, updateProfile);
}
