import {call, put} from 'redux-saga/effects';
import {FORM_ERROR} from 'final-form';

import request from '../../lib/request';
import { formatErrors } from '../../lib/formatErrors';

export const SET_SMS_FAILURE = 'sign-up/sign-up/SET_SMS_FAILURE';
export const SET_SMS_REQUEST = 'sign-up/sign-up/SET_SMS_REQUEST';
export const SET_SMS_SUCCESS = 'sign-up/sign-up/VERIFY_FAILURE';

const INITIAL_STATE = {
  isLoading: false,
  phone_set: false,
  error: null
}

export function* onHandleSetSMSRequest({payload: {phonenumber}}) {
  console.log('#onHandleOnBoardingRequest, phonenumber: ', phonenumber);

  try {
    console.log('#onHandleOnBoardingRequest, try block');
    const response = yield call(request.post, '/set-phone', {phonenumber});

    if (response.status === 200 ){
      return yield put({
        type: SET_SMS_SUCCESS
      })
    }
  } catch (err) {
    console.error('#onHandleOnBoardingRequest, err: ', err);

    if (err.response.status === 422) {
      return yield put({
        type: SET_SMS_SUCCESS,
        payload: {[FORM_ERROR]: 'Failed to verify', ...formatErrors(err.response.data.error)},
      });
    }

  }
}

export default function verify(state= INITIAL_STATE, action) {
  switch (action.type) {
    case SET_SMS_REQUEST:
      console.log('SET_SMS_REQUEST, action: ', action);
      return {
        ...state,
        isLoading: true
      };
    case SET_SMS_SUCCESS:
      console.log('SET_SMS_SUCCESS, action: ', action);
      return {
        ...state,
        isLoading: false,
        phone_set: true
      };
    case SET_SMS_FAILURE:
      console.log('SET_SMS_FAILURE, action: ', action);
      return {
        ...state,
        isLoading: false,
        errors: action.payload.errors
      };
    default:
      return state;
  }

}
