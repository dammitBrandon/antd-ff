import {call, put} from 'redux-saga/effects';
import {FORM_ERROR} from 'final-form';

import request from '../../lib/request';
import { formatErrors } from '../../lib/formatErrors';

export const VERIFY_REQUEST = 'sign-up/sign-up/VERIFY_REQUEST';
export const VERIFY_SUCCESS = 'sign-up/sign-up/VERIFY_SUCCESS';
export const VERIFY_FAILURE = 'sign-up/sign-up/VERIFY_FAILURE';

const INITIAL_STATE = {
  isLoading: false,
  verified: false,
  error: null
};

export function* onHandleVerifyRequest({payload: {username}}) {
  console.log('#onHandleVerifyRequest, username: ', username);
  
  try {
    console.log('#onHandleVerifyRequest, try block');
  
    const response = yield call(request.post, '/verify', {username});
    
    console.log('#onHandleVerifyRequest, response: ', response);
    debugger;
    window.alert('VERIFY SUCCESS!');
  } catch (err) {
    console.error('#onHandleVerifyRequest, catch block, err: ', err);
    
    if (err.response.status === 422) {
      let test = formatErrors(err.response.data.error);
      console.log('test ', test);
      return yield put({
        type: VERIFY_SUCCESS,
        payload: {[FORM_ERROR]: 'Please check form errors', ...test},
      });
    }
  }
}

export default function verify(state= INITIAL_STATE, action) {
  switch (action.type) {
    case VERIFY_REQUEST:
      console.log('VERIFY_REQUEST, action: ', action);
      return {
        ...state,
        isLoading: true
      };
    case VERIFY_SUCCESS:
      console.log('VERIFY_SUCCESS, action: ', action);
      return {
        ...state,
        isLoading: false,
        verified: true
      };
    case VERIFY_FAILURE:
      console.log('VERIFY_FAILURE, action: ', action);
      return {
        ...state,
        isLoading: false,
        errors: action.payload.errors
      };
    default:
      return state;
  }
  
}
