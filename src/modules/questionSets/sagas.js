import { all, takeLatest } from 'redux-saga/effects';

import {
  QUESTION_SET_REQUEST,
  CREATE_QUESTION_SET_REQUEST,
  QUESTION_SET_DASHBOARD_REQUEST,
  EDIT_QUESTION_SET_REQUEST,
  onHandleQuestionSetRequest,
  onHandleCreateQuestionSetRequest,
  onHandleQuestionSetsDashboardRequest,
  onHandleEditQuestionSetRequest
} from './redux';

function * watchQuestionSet () {
  console.log('#watchQuestionSet');
  yield takeLatest(QUESTION_SET_REQUEST, onHandleQuestionSetRequest);
}

function * watchQuestionSetDashboard () {
  console.log('#watchQuestionSetDashboard');
  yield takeLatest(QUESTION_SET_DASHBOARD_REQUEST, onHandleQuestionSetsDashboardRequest)
}

function * watchCreateQuestionSet () {
  console.log('#watchCreateQuestionSet');
  yield takeLatest(CREATE_QUESTION_SET_REQUEST, onHandleCreateQuestionSetRequest);
}

function * watchEditQuestionSet () {
  console.log('#watchEditQuestionSet');
  yield takeLatest(EDIT_QUESTION_SET_REQUEST, onHandleEditQuestionSetRequest);
}

export default function * sagas () {
  yield all([
    watchQuestionSet(),
    watchEditQuestionSet(),
    watchCreateQuestionSet(),
    watchQuestionSetDashboard()
  ]);
}
