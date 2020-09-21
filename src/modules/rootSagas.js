import {take, all} from 'redux-saga/effects';
import verification from './verification/verifcationSaga';
import onBoarding from './onBoarding/onBoardingSaga';
import setSMS from './setSMS/setSMSSaga';

export function* logActions() {
  while (true) {
    const action = yield take('*');
    console.log(action.type);
  }
}

export default function* rootSaga() {
  yield all([
    verification(),
    onBoarding(),
    setSMS(),
  ]);
}
