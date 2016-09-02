import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { receiveMemberList } from '../Actions/memberListActions';
import { request, membersURL } from '../Services/api';
import Immutable from 'immutable';

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

/**
 * Helper function to map the returned API response
 * to our internal structure (as needed by components)
 * @param response the returned response from the API
 */
const mapResponseToMembers = (response) => {
  return response.data.map((member) => {
    // always sort the skills alphabetically
    const skillsSortedByName = Immutable.Set(member.skills)
      .sortBy(skill => skill.name)
      .toJS();

    return {
      id: member.id,
      firstname: member.firstname,
      lastname: member.lastname,
      skills: skillsSortedByName,
      picture: member.picture,
      position: member.position,
      shortDescription: member.shortDescription,
      entryDate: member.entryDate,
      email: member.email,
      phone: member.phone,
      location: member.location,
      firm: member.firm,
      collaboration: member.collaboration,
    };
  });
};

// ------------------------------------------------------------------------------
// ---------- Action Event Listener ---------------------------------------------
// ------------------------------------------------------------------------------

export function* watchRequestMemberList() {
  yield* takeLatest('REQUEST_MEMBERLIST', fetchMemberList);
}
