import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { receiveMemberList } from '../Actions/memberListActions';
import { apiFetchMemberList } from '../Services/api';

export function* fetchMemberList() {
  try {
    const memberList = yield call(apiFetchMemberList);
    yield put(receiveMemberList(memberList));
  } catch (error) {
    alert(error); // 💩
  }
}

export function* watchRequestMemberList() {
  yield* takeLatest('REQUEST_MEMBERLIST', fetchMemberList);
}
