import {all, takeLatest} from 'redux-saga/effects';
import { VERIFY_REQUEST, onHandleVerifyRequest } from './verificationRedux';

function* watchVerification() {
  console.log('#watchVerification');
  yield takeLatest(VERIFY_REQUEST, onHandleVerifyRequest);
}

export default function* sagas() {
  yield all([watchVerification()]);
}
