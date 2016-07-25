import { takeLatest, delay } from 'redux-saga';
import { call, fork, select, put } from 'redux-saga/effects';
import { request, similarURL, profileURL, profileSkillsURL } from '../Services/api';
import { fetchMemberList } from './fetchMemberList';
import { fetchTagList } from './fetchTagList';
import {
  ADD_TAG,
  REMOVE_TAG,
  TOGGLE_COLLABORATION,
  CHANGE_TAG_INPUT_TEXT,
  tagSuggestions,
} from '../Actions/profileActions';

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
    console.log(response.error); // eslint-disable-line no-console
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

function* fetchSuggestions(action) {
  const tagInput = action.tagInputText;
  const { tags: availableSkills } = yield select(state => state.tagList);
  // const activeSkills = yield select(state => state.profile);

  yield call(delay, 20);
  const immediateSuggestions = availableSkills
    .map(skill => skill.name)
    .filter(skill => skill.startsWith(tagInput));

  yield put(tagSuggestions(immediateSuggestions));

  // throttling: give the watcher some time
  // to cancel fetching in case we just
  // receive another search string
  yield call(delay, 200);

  const searchquery = tagInput
    .toLowerCase()
    .split(' ')
    .map(word => encodeURIComponent(word))
    .join(',');

  const requestURL = `${similarURL}?q=${searchquery}`;
  const response = yield call(request, requestURL);
  const isResponseOK = response.error === undefined || response.error === null;

  if (isResponseOK) {
    const suggestions = response.data;
    yield put(tagSuggestions(immediateSuggestions.concat(suggestions)));
  } else {
    console.log(response.error); // eslint-disable-line no-console
  }
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

function* watchTagInputChange() {
  yield* takeLatest(CHANGE_TAG_INPUT_TEXT, fetchSuggestions);
}

export function* watchUpdateProfile() {
  yield [
    fork(watchToggleCollaboration),
    fork(watchRemoveTag),
    fork(watchAddTag),
    fork(watchTagInputChange)
  ];
}
