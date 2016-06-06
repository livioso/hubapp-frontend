// @flow weak
import { fork } from 'redux-saga/effects';
import { startup } from './startup';
import { watchRequestMemberList } from './fetchMemberList';
import { watchRequestTagList } from './fetchTagList';
import { watchAddTag, watchRemoveTag } from './updateSkills';

// The entry point for all the
// sagas used in this application.
export default function* rootSaga() {
  yield [
    fork(watchAddTag),
    fork(watchRemoveTag),
    fork(watchRequestMemberList),
    fork(watchRequestTagList),
    fork(startup)
  ];
}
