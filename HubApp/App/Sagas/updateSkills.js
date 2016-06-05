import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { request, membersURL } from '../Services/api';
import { ADD_TAG, REMOVE_TAG } from '../Actions/profileActions';

function* addTag() {
  // const response = yield call(request, membersURL);
  alert('yolo');
}

function* removeTag() {
  // const response = yield call(request, membersURL);
  alert('yolo');
}

export function* watchAddTag() {
  yield* takeLatest(ADD_TAG, addTag);
}

export function* watchRemoveTag() {
  yield* takeLatest(REMOVE_TAG, removeTag);
}
