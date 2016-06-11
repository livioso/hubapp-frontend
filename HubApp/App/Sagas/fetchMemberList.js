import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { receiveMemberList } from '../Actions/memberListActions';
import { request, membersURL } from '../Services/api';

export function* fetchMemberList() {
  const response = yield call(request, membersURL);
  const isResponseOK = response.error === undefined || response.error === null;

  if (isResponseOK) {
    const members = mapResponseToMembers(response);
    yield put(receiveMemberList(members));
  } else {
    console.log(response.error); // eslint-disable-line no-console
  }
}

export function* watchRequestMemberList() {
  yield* takeLatest('REQUEST_MEMBERLIST', fetchMemberList);
}

/**
 * Helper function to map the returned API response
 * to our internal structure (as needed by components)
 * @param response the returned response from the API
 */
const mapResponseToMembers = (response) => {
  return response.data.map((member) => {
    return {
      id: member.id,
      entryDate: member.entryDate,
      firstname: member.firstname,
      lastname: member.lastname,
      picture: member.picture,
      position: member.function,
      shortDescription: member.shortDescription,
      skills: member.skills
    };
  });
};
