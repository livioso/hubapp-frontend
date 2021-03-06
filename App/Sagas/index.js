// @flow weak
import { fork } from 'redux-saga/effects';
import { startup } from './startup';
import { watchRequestMemberList } from './fetchMemberList';
import { watchRequestTagList } from './fetchTagList';
import { watchUpdateProfile } from './updateProfile';
import { watchSearch } from './fetchSearch';

// The entry point for all the
// sagas used in this application.
export default function* rootSaga() {
  yield [
    fork(watchUpdateProfile),
    fork(watchRequestMemberList),
    fork(watchRequestTagList),
    fork(watchSearch),
    fork(startup)
  ];
}
