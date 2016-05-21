import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { receiveTagList } from '../Actions/tagListActions';
import { request, skillsURL } from '../Services/api';

export function* fetchTagList() {
  const response = yield call(request, skillsURL);
  const isResponseOK = response.error === undefined || response.error === null;

  if (isResponseOK) {
    const skills = mapResponseToSkills(response);
    yield put(receiveTagList(skills));
  } else {
    console.log(response.error); // eslint-disable-line no-console
  }
}

export function* watchRequestTagList() {
  yield* takeLatest('REQUEST_TAGLIST', fetchTagList);
}

/**
 * Helper function to map the returned API response
 * to our internal structure (as needed by components)
 * @param response the returned response from the API
 */
const mapResponseToSkills = (response) => {
  return response.data.map((skill) => {
    return {
      id: skill.id,
      name: skill.name
    };
  });
};
