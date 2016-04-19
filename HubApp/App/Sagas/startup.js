import { put } from 'redux-saga/effects';
import { requestMemberList } from '../Actions/memberListActions';

// the start up function
// responsible for initially
// fetching the data
export function* startup() {
  yield put(requestMemberList());
}
