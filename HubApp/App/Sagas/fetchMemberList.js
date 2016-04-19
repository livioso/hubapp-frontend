import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { receiveMemberList } from '../Actions/memberListActions';

export function* fetchMemberList() {
  try {
    const memberList = [];
    yield put(receiveMemberList(memberList));
  } catch (error) {
    // 🍠
  }
}

export function* watchRequestMemberList() {
  yield* takeLatest('REQUEST_MEMBERLIST', fetchMemberList);
}
