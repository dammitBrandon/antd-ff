import { call, put, all } from 'redux-saga/effects';
import {push} from 'connected-react-router';
import { FORM_ERROR } from 'final-form';

import { formatErrors } from '../../lib/formatErrors';
import request from '../../lib/request';

export const ONBOARDING_REQUEST = 'sign-up/on-boarding/ONBOARDING_REQUEST';
export const ONBOARDING_FAILURE = 'sign-up/on-boarding/ONBOARDING_FAILURE';
export const ONBOARDING_SUCCESS = 'sign-up/on-boarding/ONBOARDING_SUCCESS';

export const handleOnBoardingRequest = payload => ({
  type: ONBOARDING_REQUEST,
  payload,
  isLoading: true,
});

export const handleOnBoardingSuccess = payload => ({
  type: ONBOARDING_SUCCESS,
  payload,
  isLoading: false,
});

export const handleOnBoardingFailed = payload => ({
  type: ONBOARDING_FAILURE,
  payload,
  isLoading: false,
});

export function* onHandleOnBoardingRequest({payload: { test } }) {
  console.log('#onHandleOnBoardingRequest, test: ', test);
  
  try {
    console.log('#onHandleOnBoardingRequest, try block');
    
    const response = yield call(request.post, '/on-boarding', {test});
    
    console.log('#onHandleOnBoardingRequest, response: ', response);
    yield put(handleOnBoardingSuccess());
    window.alert('ON BOARDING SUCCESS!');
  } catch (err) {
    console.error('#onHandleOnBoardingRequest, err: ', err);
  
    if (err.response.status === 422) {
      return yield put({
        type: ONBOARDING_SUCCESS,
        payload: {[FORM_ERROR]: 'Please check form errors', ...formatErrors(err.response.data.error)},
      });
    }
  }
}

const INITIAL_STATE = {
  isLoading: false,
  error: null
};

export default function onBoarding(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ONBOARDING_REQUEST:
      return {...state, isLoading: true};
    case ONBOARDING_SUCCESS:
      return {...state, isLoading: false};
    case ONBOARDING_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
