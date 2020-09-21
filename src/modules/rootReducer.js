import { combineReducers } from 'redux';
import { connectRouter } from "connected-react-router";

import verify from './verification/verificationRedux';
import onBoarding from './onBoarding/onBoardingRedux';
import setSMS from './setSMS/setSMSRedux';

const rootReducer = (history) => (
  combineReducers({
    verify,
    onBoarding,
    setSMS,
    router: connectRouter(history)
  })
);

export default rootReducer;
