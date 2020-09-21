import {all, takeLatest} from 'redux-saga/effects';
import {ONBOARDING_REQUEST, onHandleOnBoardingRequest} from './onBoardingRedux';

function* watchOnBoarding() {
  console.log('#watchOnBoarding');
  yield takeLatest(ONBOARDING_REQUEST, onHandleOnBoardingRequest);
}

export default function* sagas() {
  yield all([watchOnBoarding()]);
}
