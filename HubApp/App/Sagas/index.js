import { fork } from 'redux-saga/effects';
import { startup } from './startup';
import { watchRequestMemberList } from './fetchMemberList';

// The entry point for all the
// sagas used in this application.
export default function* rootSaga() {
  yield [
    fork(watchRequestMemberList),
    fork(startup)
  ];
}
