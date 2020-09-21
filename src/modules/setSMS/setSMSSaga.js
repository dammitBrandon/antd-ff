import {all, takeLatest} from 'redux-saga/effects';
import {SET_SMS_REQUEST, onHandleSetSMSRequest} from './setSMSRedux';

function* watchSetSMS() {
  console.log('#watchSetSMS');
  yield takeLatest(SET_SMS_REQUEST, onHandleSetSMSRequest);
}

export default function* sagas() {
  yield all([watchSetSMS()]);
}
