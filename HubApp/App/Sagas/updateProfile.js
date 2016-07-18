import { takeLatest } from 'redux-saga';
import { call, fork, select } from 'redux-saga/effects';
import { request, profileURL, profileSkillsURL } from '../Services/api';
import { ADD_TAG, REMOVE_TAG, TOGGLE_COLLABORATION } from '../Actions/profileActions';
import { fetchMemberList } from './fetchMemberList';
import { fetchTagList } from './fetchTagList';

function* updateProfileSkills() {
  try {
  const { profile } = yield select();
  yield call(request, profileSkillsURL, {
    method: 'PUT',
    body: JSON.stringify(profile.skills.map(tag => tag.name)),
    headers: {
      'Content-Type': 'application/json'
    },
  });

  // re-fetch all the things
  yield call(fetchMemberList);
  yield call(fetchTagList);

  } catch (e) {
    alert(e);
  }
}

function* updateProfile() {
  const { profile } = yield select();
  yield call(request, profileURL, {
    method: 'PUT',
    body: JSON.stringify(profile),
    headers: {
      'Content-Type': 'application/json'
    },
  });

  // re-fetch all the things
  yield call(fetchMemberList);
  yield call(fetchTagList);
}

function* watchRemoveTag() {
  yield* takeLatest(REMOVE_TAG, updateProfileSkills);
}

function* watchAddTag() {
  yield* takeLatest(ADD_TAG, updateProfileSkills);
}

function* watchToggleCollaboration() {
  yield* takeLatest(TOGGLE_COLLABORATION, updateProfile);
}

export function* watchUpdateProfile() {
  yield [
    fork(watchToggleCollaboration),
    fork(watchRemoveTag),
    fork(watchAddTag),
  ];
}
